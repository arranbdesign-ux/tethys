// Image importer: uses Tesseract.js to OCR echo tiles
// Best-effort: extracts 5 echoes with cost, main, subs; attempts icon matching for type/set

(function(){
  const STAT_ALIAS = {
    'crit dmg': 'cd', 'crit. dmg': 'cd', 'crit. dmg bonus': 'cd', 'crit dmg bonus': 'cd',
    'crit rate': 'cr', 'crit. rate': 'cr',
    'atk': 'atk', 'hp': 'hp', 'def': 'def',
    'basic attack dmg bonus': 'basicdmg', 'basic atk dmg bonus': 'basicdmg', 'basic dmg bonus': 'basicdmg', 'basic attack dmg': 'basicdmg', 'basic dmg': 'basicdmg',
    'resonance skill dmg bonus': 'skilldmg', 'skill dmg bonus': 'skilldmg', 'res. skill dmg bonus': 'skilldmg', 'resonance skill dmg': 'skilldmg',
    'resonance liberation dmg bonus': 'libdmg', 'liberation dmg bonus': 'libdmg', 'resonance liberation dmg': 'libdmg',
    'heavy attack dmg bonus': 'heavydmg', 'heavy dmg bonus': 'heavydmg', 'heavy attack dmg': 'heavydmg',
    'energy regen': 'er', 'energy regeneration': 'er',
    'havoc dmg bonus': 'havocdmg', 'glacio dmg bonus': 'glaciodmg', 'aero dmg bonus': 'aerodmg', 'electro dmg bonus': 'electrodmg', 'spectro dmg bonus': 'spectrodmg', 'fusion dmg bonus': 'fusiondmg',
    'healing bonus': 'healing'
  };

  function normText(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9%\.\s]/g,' ').replace(/\s+/g,' ').trim(); }
  function parseNumberLike(s){ if(!s) return null; const m = String(s).match(/(-?\d+(?:\.\d+)?)/); return m? Number(m[1]) : null; }
  function mapLabelToKey(label){
    const n = normText(label);
    // try direct match first
    if (STAT_ALIAS[n]) return STAT_ALIAS[n];
    // try startswith matches
    let best = null; let bestLen = 0;
    Object.keys(STAT_ALIAS).forEach(k=>{ if(n.startsWith(k) && k.length>bestLen){ best=STAT_ALIAS[k]; bestLen=k.length; } });
    return best || null;
  }

  // Tiny fingerprint matcher (downsample + grayscale)
  async function loadImage(url){ return new Promise((res,rej)=>{ const img = new Image(); img.crossOrigin='anonymous'; img.onload=()=>res(img); img.onerror=rej; img.src=url; }); }
  function imageFP(img, sx, sy, sw, sh, size=24){
    const c = document.createElement('canvas'); c.width=size; c.height=size; const ctx=c.getContext('2d');
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
    const data = ctx.getImageData(0,0,size,size).data; const out=new Float32Array(size*size);
    for(let i=0;i<size*size;i++){ const r=data[i*4], g=data[i*4+1], b=data[i*4+2]; out[i]=(r+g+b)/3; }
    // normalize mean/std
    let sum=0; for(let v of out) sum+=v; const mean=sum/out.length; let varr=0; for(let v of out) varr+=(v-mean)*(v-mean); const std=Math.sqrt(varr/out.length)||1;
    for(let i=0;i<out.length;i++) out[i]=(out[i]-mean)/std;
    return out;
  }
  function fpDistance(a,b){ let s=0; for(let i=0;i<a.length && i<b.length;i++){ const d=a[i]-b[i]; s+=d*d; } return Math.sqrt(s/(Math.min(a.length,b.length)||1)); }

  async function buildIconMatchers(){
    const typeEntries = Object.entries(window.ECHO_TYPES||{});
    const setEntries = Object.entries(window.ECHO_SETS||{});
    const typeImgs = await Promise.all(typeEntries.map(([id,t])=>loadImage(t.icon)));
    const setImgs = await Promise.all(setEntries.map(([id,s])=>loadImage(s.icon)));
    return { typeEntries, setEntries, typeImgs, setImgs };
  }

  async function matchTypeAndSet(img, rect, icons){
    const { typeEntries, setEntries, typeImgs, setImgs } = icons;
    const { x,y,w,h } = rect;
    const fp = imageFP(img, x, y, w, h, 24);
    let bestType = { id: '', dist: Infinity };
    for(let i=0;i<typeEntries.length;i++){
      const id = typeEntries[i][0]; const tfp = imageFP(typeImgs[i], 0,0,typeImgs[i].naturalWidth, typeImgs[i].naturalHeight, 24);
      const d = fpDistance(fp, tfp); if (d < bestType.dist) bestType = { id, dist: d };
    }
    // smaller ROI for set (top-right corner of tile)
    // the caller should provide a specific setRect per tile, but if absent, fallback to type rect
    let bestSet = { id: '', dist: Infinity };
    for(let i=0;i<setEntries.length;i++){
      const id = setEntries[i][0]; const sfp = imageFP(setImgs[i], 0,0,setImgs[i].naturalWidth, setImgs[i].naturalHeight, 24);
      const d = fpDistance(fp, sfp); if (d < bestSet.dist) bestSet = { id, dist: d };
    }
    // thresholds (empirical); if too far, drop
    const tConf = Math.max(0, Math.min(1, 1 - (bestType.dist/3.0)));
    const sConf = Math.max(0, Math.min(1, 1 - (bestSet.dist/3.0)));
    if (bestType.dist > 2.6) bestType.id = '';
    if (bestSet.dist > 2.6) bestSet.id = '';
    return { typeId: bestType.id, setId: bestSet.id, typeConf: tConf, setConf: sConf };
  }

  function enhanceForOCR(canvas){
    // Simple grayscale + contrast boost
    const c = document.createElement('canvas'); c.width = canvas.width; c.height = canvas.height; const ctx = c.getContext('2d');
    ctx.drawImage(canvas, 0, 0);
    const img = ctx.getImageData(0,0,c.width,c.height); const d = img.data;
    // grayscale
    for (let i=0;i<d.length;i+=4){ const y = 0.299*d[i]+0.587*d[i+1]+0.114*d[i+2]; d[i]=d[i+1]=d[i+2]=y; }
    // contrast
    const contrast = 1.35; // boost
    const intercept = 128*(1-contrast);
    for (let i=0;i<d.length;i+=4){ const v = Math.max(0, Math.min(255, d[i]*contrast + intercept)); d[i]=d[i+1]=d[i+2]=v; }
    ctx.putImageData(img,0,0);
    return c;
  }

  async function ocrRegion(imgCanvas){
    const enhanced = enhanceForOCR(imgCanvas);
    const dataUrl = enhanced.toDataURL('image/png');
    const { data: { text } } = await Tesseract.recognize(dataUrl, 'eng', {
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.%+\n '  
    });
    return text || '';
  }

  async function ocrDigits(imgCanvas){
    const enhanced = enhanceForOCR(imgCanvas);
    const dataUrl = enhanced.toDataURL('image/png');
    const { data: { text } } = await Tesseract.recognize(dataUrl, 'eng', {
      tessedit_char_whitelist: '0123456789'  
    });
    return (text||'').replace(/\D+/g,'');
  }

  function cropToCanvas(img, x,y,w,h){ const c=document.createElement('canvas'); c.width=Math.max(1,Math.floor(w)); c.height=Math.max(1,Math.floor(h)); const ctx=c.getContext('2d'); ctx.drawImage(img, x,y,w,h, 0,0,c.width,c.height); return c; }

  async function analyzeImageToEchoes(file){
    const img = await new Promise((res,rej)=>{ const i=new Image(); i.onload=()=>res(i); i.onerror=rej; i.src=URL.createObjectURL(file); });
    const W = img.naturalWidth, H = img.naturalHeight;
    // Try multiple candidate stripes and pick best by keyword presence
    const candidates = [0.56, 0.58, 0.60, 0.62];
    let bestTop = Math.floor(H * 0.58), bestScore = -Infinity;
    const tileWidth = Math.floor(W / 5);
    for (const topR of candidates) {
      const top = Math.floor(H * topR), bottom = Math.floor(H * Math.min(topR + 0.40, 0.99));
      const h = bottom - top;
      let score = 0;
      for (let i = 0; i < 5; i++) {
        const x = Math.floor(i * tileWidth), y = top, w = (i===4? W - x : tileWidth), hh = h;
        const tileCanvas = cropToCanvas(img, x, y, w, hh);
        const text = await ocrRegion(tileCanvas);
        const n = normText(text);
        ['crit','rate','dmg','hp','atk','def','bonus','energy'].forEach(k => { if (n.includes(k)) score++; });
      }
      if (score > bestScore) { bestScore = score; bestTop = top; }
    }
    const stripTop = bestTop, stripBottom = Math.floor(H * 0.98), stripHeight = stripBottom - stripTop;
    const icons = await buildIconMatchers();
    const results = [];
    for (let i=0;i<5;i++){
      const x = Math.floor(i * tileWidth), y = stripTop, w = (i===4? W - x : tileWidth), h = stripHeight;
      const tileCanvas = cropToCanvas(img, x, y, w, h);
      const text = await ocrRegion(tileCanvas);
      // Parse cost (small digit near top-right): try a small ROI
      const costCanvas = cropToCanvas(img, x + Math.floor(w*0.78), y + Math.floor(h*0.05), Math.floor(w*0.18), Math.floor(h*0.18));
      const costRaw = await ocrDigits(costCanvas);
      let cost = parseInt(costRaw, 10); if (!Number.isFinite(cost)) cost = 0;

      // Match type from big left art region
      const typeRect = { x: x + Math.floor(w*0.06), y: y + Math.floor(h*0.15), w: Math.floor(w*0.26), h: Math.floor(h*0.55) };
      const matched = await matchTypeAndSet(img, typeRect, icons);

      // Extract main + subs
      const lines = (text||'').split(/\n+/).map(s=>s.trim()).filter(Boolean);
      let main = null; let mainChosenBy = 'pct'; const subs = [];
      for (const ln of lines){
        const n = normText(ln);
        const key = mapLabelToKey(n);
        const val = parseNumberLike(ln);
        if (!key || val==null) continue;
        if (!main && /%/.test(ln)) { main = { key, value: val }; mainChosenBy = 'pct'; continue; }
        subs.push({ key, value: val });
      }
      if (!main && subs.length) { main = subs.shift(); mainChosenBy = 'fallback'; }
      const mainConf = main ? (mainChosenBy === 'pct' ? 0.9 : 0.6) : 0.3;
      const subsEnriched = subs.map(s => ({...s, conf: 0.85}));
      const costConf = cost ? 0.95 : 0.4;
      results.push({ cost, setId: matched.setId || '', typeId: matched.typeId || '', main: main || { key:'', value:0 }, subs,
        conf: { cost: costConf, type: matched.typeConf || 0, set: matched.setConf || 0, main: mainConf, subs: subsEnriched.map(s=>s.conf) }
      });
    }
    return results;
  }

  // Public API
  window.TethysImporter = { analyzeImageToEchoes };
})();

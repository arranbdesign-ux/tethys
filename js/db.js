// Simple cookie-backed mini-DB with chunking
// Exposes window.TethysDB with read/write helpers

(function () {
  const DEFAULT_MAX_AGE_DAYS = 365;
  const CHUNK_SIZE = 3800; // safe per-cookie payload after encoding

  function setCookie(name, value, maxAgeDays = DEFAULT_MAX_AGE_DAYS) {
    const maxAge = Math.floor(maxAgeDays * 24 * 60 * 60);
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  }

  function listCookies() {
    const out = [];
    const raw = document.cookie || "";
    if (!raw) return out;
    raw.split('; ').forEach(part => {
      const [k, v = ""] = part.split('=');
      out.push({ name: k, value: decodeURIComponent(v) });
    });
    return out;
  }

  function setChunked(prefix, str, maxAgeDays = DEFAULT_MAX_AGE_DAYS) {
    // clear existing chunks
    listCookies().forEach(c => { if (c.name.startsWith(prefix + '_')) deleteCookie(c.name); });
    if (!str) { return; }
    // split and write sequentially
    let i = 0;
    for (let p = 0; p < str.length; p += CHUNK_SIZE) {
      const chunk = str.slice(p, p + CHUNK_SIZE);
      setCookie(`${prefix}_${i}`, chunk, maxAgeDays);
      i++;
    }
    // write a small meta to indicate count (best-effort)
    setCookie(`${prefix}_count`, String(i), maxAgeDays);
  }

  function getChunked(prefix) {
    // discover chunk count if meta is present, otherwise try to read sequentially until a gap
    const cookies = listCookies();
    const meta = cookies.find(c => c.name === `${prefix}_count`);
    let count = meta ? parseInt(meta.value, 10) : null;
    const chunks = [];
    if (Number.isFinite(count)) {
      for (let i = 0; i < count; i++) {
        const c = cookies.find(x => x.name === `${prefix}_${i}`);
        if (!c) break;
        chunks.push(c.value);
      }
    } else {
      // fallback: collect any `${prefix}_<n>` and sort numerically
      const parts = cookies
        .filter(c => c.name.startsWith(prefix + '_'))
        .map(c => ({ idx: Number(c.name.slice((prefix + '_').length)) || 0, v: c.value }))
        .sort((a, b) => a.idx - b.idx);
      parts.forEach(p => chunks.push(p.v));
    }
    return chunks.join('');
  }

  // Public DB helpers ---------------------------------------------------------
  const BUILDS_PREFIX = 'tethys_builds';
  const ECHOS_PREFIX = 'tethys_echoes';

  function readBuilds() {
    try {
      const raw = getChunked(BUILDS_PREFIX);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (_) {
      return [];
    }
  }

  function writeBuilds(builds) {
    try {
      const s = JSON.stringify(builds || []);
      setChunked(BUILDS_PREFIX, s);
    } catch (_) {
      // ignore
    }
  }

  function addBuild(build) {
    const arr = readBuilds();
    arr.push(build);
    writeBuilds(arr);
    return build;
  }

  function clearBuilds() { writeBuilds([]); }

  // Echo library --------------------------------------------------------------
  function normalizeEcho(raw) {
    const e = raw || {};
    const main = e.main && e.main.key ? { key: String(e.main.key), value: Number(e.main.value) } : null;
    const subs = Array.isArray(e.subs) ? e.subs
      .filter(s => s && s.key)
      .map(s => ({ key: String(s.key), value: Number(s.value) }))
      .sort((a, b) => a.key === b.key ? (a.value - b.value) : (a.key > b.key ? 1 : -1)) : [];
    return {
      typeId: e.typeId || '',
      setId: e.setId || '',
      // keep cost for display, but not used for dedupe (per request)
      cost: Number(e.cost) || 0,
      main,
      subs,
    };
  }

  function echoKey(e) {
    const n = normalizeEcho(e);
    // Key excludes cost per request; includes typeId, setId, main, subs
    const keyObj = { typeId: n.typeId, setId: n.setId, main: n.main, subs: n.subs };
    return JSON.stringify(keyObj);
  }

  function readEchoes() {
    try {
      const raw = getChunked(ECHOS_PREFIX);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  }

  function writeEchoes(echos) {
    try { setChunked(ECHOS_PREFIX, JSON.stringify(echos || [])); } catch (_) { /* noop */ }
  }

  function addEcho(echo) {
    const arr = readEchoes();
    const key = echoKey(echo);
    const existing = arr.find(x => echoKey(x) === key);
    if (existing) return { added: false, echo: existing };
    const stored = { ...normalizeEcho(echo), id: `e_${Date.now()}_${Math.random().toString(36).slice(2, 7)}` };
    arr.push(stored);
    writeEchoes(arr);
    return { added: true, echo: stored };
  }

  function addEchoes(echoes) {
    let added = 0, skipped = 0; const stored = [];
    (echoes || []).forEach(e => {
      const res = addEcho(e);
      if (res.added) added++; else skipped++;
      stored.push(res.echo);
    });
    return { added, skipped, echoes: stored };
  }

  function clearEchoes() { writeEchoes([]); }

  function removeEcho(idOrPredicate) {
    const arr = readEchoes();
    let next;
    if (typeof idOrPredicate === 'function') {
      next = arr.filter(e => !idOrPredicate(e));
    } else {
      next = arr.filter(e => e.id !== idOrPredicate);
    }
    writeEchoes(next);
    return next.length !== arr.length;
  }

  // Clipboard (echo + slot) ---------------------------------------------------
  const CLIP_PREFIX = 'tethys_clip';
  function writeClipboardEcho(echo, slot) {
    const payload = { echo: normalizeEcho(echo), slot: Number(slot) || 1, ts: Date.now() };
    try { setChunked(CLIP_PREFIX, JSON.stringify(payload)); } catch (_) {}
    return payload;
  }
  function readClipboardEcho() {
    try {
      const raw = getChunked(CLIP_PREFIX);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) { return null; }
  }
  function clearClipboardEcho() { setChunked(CLIP_PREFIX, ''); }
  function consumeClipboardEcho() { const v = readClipboardEcho(); clearClipboardEcho(); return v; }

  // Builder state helpers (mirror of script.js cookie) ------------------------
  const BUILDER_COOKIE = 'tethysState';
  function getCookie(name) {
    const parts = (document.cookie || '').split('; ');
    for (const p of parts) { const [k, v] = p.split('='); if (k === name) return decodeURIComponent(v || ''); }
    return '';
  }
  function setCookie(name, value, maxAgeDays = DEFAULT_MAX_AGE_DAYS) {
    const maxAge = Math.floor(maxAgeDays * 24 * 60 * 60);
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }
  function readBuilderState() {
    try {
      const raw = getCookie(BUILDER_COOKIE);
      const parsed = raw ? JSON.parse(raw) : {};
      return { selectedCharName: null, chars: {}, ...parsed };
    } catch { return { selectedCharName: null, chars: {} }; }
  }
  function writeBuilderState(state) { try { setCookie(BUILDER_COOKIE, JSON.stringify(state)); } catch {} }
  function ensureCharState(state, charName) {
    if (!state.chars[charName]) state.chars[charName] = { weaponIndex: null, echoes: [null, null, null, null, null] };
    return state.chars[charName];
  }

  // Equipment binding ---------------------------------------------------------
  function unequipEchoById(echoId) {
    const arr = readEchoes();
    const idx = arr.findIndex(e => e.id === echoId);
    if (idx < 0) return false;
    const e = arr[idx];
    const prevBy = e.equippedBy || null; const prevSlot = e.equippedSlot || null;
    e.equippedBy = null; e.equippedSlot = null;
    writeEchoes(arr);
    if (prevBy && prevSlot) {
      const st = readBuilderState();
      const cs = ensureCharState(st, prevBy);
      const i = Math.max(1, Math.min(5, Number(prevSlot))) - 1;
      // only clear if the slot currently holds this echo id
      if (cs.echoes[i] && cs.echoes[i].id === echoId) cs.echoes[i] = null;
      writeBuilderState(st);
    }
    return true;
  }

  function equipEchoTo(echoId, charName, slot) {
    const arr = readEchoes();
    const idx = arr.findIndex(e => e.id === echoId);
    if (idx < 0) return null;
    const slotIdx = Math.max(1, Math.min(5, Number(slot))) - 1;
    const e = arr[idx];
    // Clear previous equip for this echo
    if (e.equippedBy && (e.equippedBy !== charName || e.equippedSlot !== (slotIdx + 1))) {
      const stPrev = readBuilderState();
      const csPrev = ensureCharState(stPrev, e.equippedBy);
      const pi = Math.max(0, Math.min(4, Number(e.equippedSlot || 1) - 1));
      if (csPrev.echoes[pi] && csPrev.echoes[pi].id === e.id) csPrev.echoes[pi] = null;
      writeBuilderState(stPrev);
    }
    // If target slot currently holds another saved echo, un-equip it first
    const st = readBuilderState();
    const cs = ensureCharState(st, charName);
    const prevAtTarget = cs.echoes[slotIdx];
    if (prevAtTarget && prevAtTarget.id) {
      // clear that echo's equip meta
      const arr2 = readEchoes();
      const j = arr2.findIndex(x => x.id === prevAtTarget.id);
      if (j >= 0) { arr2[j].equippedBy = null; arr2[j].equippedSlot = null; writeEchoes(arr2); }
    }
    // Set equip on library entry
    e.equippedBy = charName; e.equippedSlot = slotIdx + 1;
    writeEchoes(arr);
    // Write into builder state slot (include id so future clears work)
    cs.echoes[slotIdx] = {
      id: e.id,
      cost: Number(e.cost) || 0,
      setId: e.setId || '',
      typeId: e.typeId || '',
      main: e.main ? { key: String(e.main.key), value: Number(e.main.value) || 0 } : { key: '', value: 0 },
      subs: Array.isArray(e.subs) ? e.subs.map(s => ({ key: String(s.key), value: Number(s.value) || 0 })) : []
    };
    writeBuilderState(st);
    return { echo: arr[idx], charName, slot: slotIdx + 1 };
  }

  window.TethysDB = {
    readBuilds,
    writeBuilds,
    addBuild,
    clearBuilds,
    readEchoes,
    writeEchoes,
    addEcho,
    addEchoes,
    clearEchoes,
    unequipEchoById,
    equipEchoTo,
    removeEcho,
    writeClipboardEcho,
    readClipboardEcho,
    clearClipboardEcho,
    consumeClipboardEcho,
  };
})();

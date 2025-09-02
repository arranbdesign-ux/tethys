document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('savedBuildsList');
  const previewEl = document.getElementById('buildPreview');
  const savedCountEl = document.getElementById('savedCount');

  const STAT_LABELS = {
    atk: 'ATK', atkp: 'ATK%', cr: 'CRIT Rate', cd: 'CRIT DMG', er: 'Energy Regen', hpp: 'HP%', defp: 'DEF%',
    basicdmg: 'Basic DMG', skilldmg: 'Skill DMG', heavydmg: 'Heavy DMG', libdmg: 'Liberation DMG',
    aerodmg: 'Aero DMG', electrodmg: 'Electro DMG', fusiondmg: 'Fusion DMG', glaciodmg: 'Glacio DMG',
    havocdmg: 'Havoc DMG', spectrodmg: 'Spectro DMG', healing: 'Healing Bonus', hp: 'HP', def: 'DEF'
  };
  const PCT_KEYS = ['atkp','hpp','defp','cr','cd','er','basicdmg','skilldmg','heavydmg','libdmg','havocdmg','healing'];

  function labelFor(k) { return STAT_LABELS[k] || k; }
  function fmt(k, v) { return PCT_KEYS.includes(k) ? `${v}%` : `${v}`; }

  function summarizeEcho(e) {
    const main = e?.main?.key ? `${labelFor(e.main.key)} ${fmt(e.main.key, e.main.value)}` : 'No main stat';
    const subs = Array.isArray(e?.subs) ? e.subs.map(s => `${labelFor(s.key)} ${fmt(s.key, s.value)}`).join(', ') : '';
    const typeName = (e?.typeId && window.ECHO_TYPES?.[e.typeId]?.name) ? window.ECHO_TYPES[e.typeId].name : 'Echo';
    const setName = (e?.setId && window.ECHO_SETS?.[e.setId]?.name) ? window.ECHO_SETS[e.setId].name : '';
    const parts = [`${typeName} • Cost ${e?.cost || 0}`];
    if (setName) parts.push(setName);
    return { title: parts.join(' • '), main, subs, icon: window.ECHO_TYPES?.[e?.typeId]?.icon || '' };
  }

  function renderPreview(build) {
    if (!previewEl) return;
    previewEl.innerHTML = '';
    if (!build) return;
    const echoes = Array.isArray(build.echoes) ? build.echoes : [];
    const grid = document.createElement('div');
    grid.className = 'echo-mini';
    echoes.forEach((e, idx) => {
      const item = document.createElement('div'); item.className = 'echo-mini__item';
      const img = document.createElement('img');
      if (e?.typeId && window.ECHO_TYPES?.[e.typeId]?.icon) { img.src = window.ECHO_TYPES[e.typeId].icon; img.alt = window.ECHO_TYPES[e.typeId].name; }
      else { img.alt = 'Echo'; }
      const textWrap = document.createElement('div');
      const s = summarizeEcho(e || {});
      const title = document.createElement('div'); title.className = 'echo-mini__title'; title.textContent = s.title || `Echo ${idx+1}`;
      const main = document.createElement('div'); main.className = 'echo-mini__stats'; main.textContent = s.main;
      const subs = document.createElement('div'); subs.className = 'echo-mini__stats'; subs.textContent = s.subs;
      textWrap.appendChild(title); textWrap.appendChild(main); if (s.subs) textWrap.appendChild(subs);
      item.appendChild(img); item.appendChild(textWrap);
      grid.appendChild(item);
    });
    previewEl.appendChild(grid);
  }

  function renderList(builds) {
    if (savedCountEl) savedCountEl.textContent = String(builds.length);
    if (!listEl) return;
    listEl.innerHTML = '';
    if (!builds.length) {
      const empty = document.createElement('div');
      empty.className = 'saved-item';
      empty.textContent = 'No saved builds yet.';
      listEl.appendChild(empty);
      renderPreview(null);
      return;
    }
    // newest first
    const sorted = [...builds].sort((a,b) => (b.id || '').localeCompare(a.id || ''));
    sorted.forEach((b, i) => {
      const row = document.createElement('div'); row.className = 'saved-item';
      const head = document.createElement('div'); head.className = 'saved-item__header';
      const title = document.createElement('h2'); title.textContent = b.characterName ? `${b.characterName}` : 'Build';
      const meta = document.createElement('div'); meta.className = 'weapon-stats';
      const when = document.createElement('div'); when.className = 'stat-chip'; when.textContent = new Date(b.createdAt || Date.now()).toLocaleString();
      const count = document.createElement('div'); count.className = 'stat-chip'; count.textContent = `${(b.echoes||[]).filter(Boolean).length}/5 Echoes`;
      meta.appendChild(when); meta.appendChild(count);
      head.appendChild(title);
      row.appendChild(head); row.appendChild(meta);
      row.addEventListener('click', () => renderPreview(b));
      if (i === 0) { // default selection
        setTimeout(() => renderPreview(b), 0);
      }
      listEl.appendChild(row);
    });
  }

  const builds = (window.TethysDB && window.TethysDB.readBuilds) ? window.TethysDB.readBuilds() : [];
  renderList(builds);
});


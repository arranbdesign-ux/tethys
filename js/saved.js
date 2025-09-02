document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('savedEchoesList');
  const libraryEl = document.getElementById('echoLibrary');

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

  function renderLibrary(echoes) {
    if (!libraryEl) return;
    libraryEl.innerHTML = '';
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
    libraryEl.appendChild(grid);
  }

  function renderList(echoes) {
    if (!listEl) return;
    listEl.innerHTML = '';
    const countRow = document.createElement('div');
    countRow.className = 'saved-item';
    const head = document.createElement('div'); head.className = 'saved-item__header';
    const title = document.createElement('h2'); title.textContent = `Total Saved: ${echoes.length}`;
    head.appendChild(title); countRow.appendChild(head);
    listEl.appendChild(countRow);
  }

  const echoes = (window.TethysDB && window.TethysDB.readEchoes) ? window.TethysDB.readEchoes() : [];
  // newest-ish first by id if present
  const sorted = [...echoes].sort((a,b) => (String(b.id||'')).localeCompare(String(a.id||'')));
  renderList(sorted);
  renderLibrary(sorted);
});

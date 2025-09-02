document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('savedEchoesList');
  const libraryEl = document.getElementById('echoLibrary');
  const groupSel = document.getElementById('groupMode');
  const sortSel = document.getElementById('sortMode');
  const clearBtn = document.getElementById('clearEchoesBtn');

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
    const mode = (groupSel?.value || 'none');
    const groups = groupEchoes(echoes, mode);

    groups.forEach(g => {
      if (mode !== 'none') {
        const header = document.createElement('h3');
        header.textContent = `${g.label} (${g.items.length})`;
        libraryEl.appendChild(header);
      }
      const grid = document.createElement('div');
      grid.className = 'echo-mini';
      g.items.forEach((e, idx) => {
        const item = document.createElement('div'); item.className = 'echo-mini__item';
        const img = document.createElement('img');
        if (e?.typeId && window.ECHO_TYPES?.[e.typeId]?.icon) { img.src = window.ECHO_TYPES[e.typeId].icon; img.alt = window.ECHO_TYPES[e.typeId].name; }
        else { img.alt = 'Echo'; }
        const textWrap = document.createElement('div');
        const s = summarizeEcho(e || {});
        const title = document.createElement('div'); title.className = 'echo-mini__title'; title.textContent = s.title || `Echo ${idx+1}`;
        const main = document.createElement('div'); main.className = 'echo-mini__stats'; main.textContent = s.main;
        const subs = document.createElement('div'); subs.className = 'echo-mini__stats'; subs.textContent = s.subs;
        // Controls: Delete only (insertion moved to builder modal tray)
        const ctrl = document.createElement('div'); ctrl.style.marginTop = '.35rem';
        const delBtn = document.createElement('button'); delBtn.className = 'btn btn--ghost'; delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', (ev) => { ev.stopPropagation(); deleteEcho(e); });
        ctrl.appendChild(delBtn);

        textWrap.appendChild(title); textWrap.appendChild(main); if (s.subs) textWrap.appendChild(subs); textWrap.appendChild(ctrl);
        item.appendChild(img); item.appendChild(textWrap);
        grid.appendChild(item);
      });
      libraryEl.appendChild(grid);
    });
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

  function valOr(arr, fallback) { return Array.isArray(arr) ? arr : (fallback || []); }

  function sortEchoes(echoes, mode) {
    const c = [...echoes];
    const tname = e => (window.ECHO_TYPES?.[e.typeId]?.name || '').toLowerCase();
    const sname = e => (window.ECHO_SETS?.[e.setId]?.name || '').toLowerCase();
    const mname = e => (e?.main?.key ? (STAT_LABELS[e.main.key] || e.main.key) : '').toLowerCase();
    if (mode === 'type') return c.sort((a,b) => tname(a).localeCompare(tname(b)) || (String(b.id||'')).localeCompare(String(a.id||'')));
    if (mode === 'set')  return c.sort((a,b) => sname(a).localeCompare(sname(b)) || (String(b.id||'')).localeCompare(String(a.id||'')));
    if (mode === 'main') return c.sort((a,b) => mname(a).localeCompare(mname(b)) || (String(b.id||'')).localeCompare(String(a.id||'')));
    // newest
    return c.sort((a,b) => (String(b.id||'')).localeCompare(String(a.id||'')));
  }

  function groupEchoes(echoes, mode) {
    const items = sortEchoes(echoes, sortSel?.value || 'newest');
    if (mode === 'type') {
      const map = new Map();
      items.forEach(e => { const k = e.typeId || ''; const label = window.ECHO_TYPES?.[k]?.name || 'Unknown Type'; (map.get(k) || map.set(k, { key:k, label, items:[]}).get(k)).items.push(e); });
      return Array.from(map.values()).sort((a,b) => a.label.localeCompare(b.label));
    }
    if (mode === 'set') {
      const map = new Map();
      items.forEach(e => { const k = e.setId || ''; const label = window.ECHO_SETS?.[k]?.name || (k ? 'Unknown Set' : 'No Set'); (map.get(k) || map.set(k, { key:k, label, items:[]}).get(k)).items.push(e); });
      return Array.from(map.values()).sort((a,b) => a.label.localeCompare(b.label));
    }
    return [{ key:'', label:'All', items }];
  }

  function refresh() {
    const all = (window.TethysDB && window.TethysDB.readEchoes) ? window.TethysDB.readEchoes() : [];
    renderList(all);
    const gm = groupSel?.value || 'none';
    renderLibrary(sortEchoes(all, sortSel?.value || 'newest')); // renderLibrary handles grouping itself
  }

  function deleteEcho(echo) {
    if (!window.TethysDB || typeof window.TethysDB.removeEcho !== 'function') return;
    if (!confirm('Delete this saved echo?')) return;
    window.TethysDB.removeEcho(echo.id);
    refresh();
  }

  groupSel?.addEventListener('change', refresh);
  sortSel?.addEventListener('change', refresh);
  clearBtn?.addEventListener('click', () => {
    if (!window.TethysDB || typeof window.TethysDB.clearEchoes !== 'function') return;
    if (!confirm('Clear all saved echoes?')) return;
    window.TethysDB.clearEchoes();
    refresh();
  });

  refresh();
});

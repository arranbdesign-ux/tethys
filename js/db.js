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

  window.TethysDB = {
    readBuilds,
    writeBuilds,
    addBuild,
    clearBuilds,
  };
})();


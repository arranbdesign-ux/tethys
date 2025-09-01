
document.addEventListener("DOMContentLoaded", () => {
    // --- Data -----------------------------------------------------------------
    const rarity = [
        { name: "5 Star", image: "images/misc/5-star.png" },
        { name: "4 Star", image: "images/misc/4-star.png" }
    ];
    const tier = [
        { name: "SSS", image: "images/tiers/sss.png" },
        { name: "SS", image: "images/tiers/ss.png" }
    ];
    const weaponsByType = {
        Broadblade: [
            { name: "Verdant Summit", image: "images/weapons/verdant-summit.webp", stats: [{ key: "atk", value: 587 }, { key: "cd", value: 48.6 }] },
            { name: "Lustrous Razor", image: "images/weapons/lustrous-razor.webp", stats: [{ key: "atk", value: 587 }, { key: "atkp", value: 36.4 }] }
        ],
        Pistols: [
            { name: "Static Mist", image: "images/weapons/static-mist.webp", stats: [{ key: "atk", value: 587 }, { key: "cr", value: 24.3 }] },
            { name: "The Last Dance", image: "images/weapons/the-last-dance.webp", stats: [{ key: "atk", value: 500 }, { key: "cd", value: 72 }] }
        ],
        Rectifier: [
            { name: "Cosmic Ripples", image: "images/weapons/cosmic-ripples.webp", stats: [{ key: "atk", value: 500 }, { key: "atkp", value: 54 }] },
            { name: "Lethean Elegy", image: "images/weapons/lethean-elegy.webp", stats: [{ key: "atk", value: 588 }, { key: "cr", value: 24.3 }] }
        ],
        Gauntlets: [
            { name: "Blazing Justice", image: "images/weapons/blazing-justice.webp", stats: [{ key: "atk", value: 587 }, { key: "cd", value: 48.6 }] }
        ],
        Sword: [
            { name: "Emerald of Genesis", image: "images/weapons/emerald-of-genesis.webp", stats: [{ key: "atk", value: 587 }, { key: "cr", value: 24.3 }] }
        ]
    };

    const STAT_LABELS = {
        atk: "ATK", atkp: "ATK%", cr: "CRIT Rate", cd: "CRIT DMG", er: "Energy Regen", hpp: "HP%", defp: "DEF%",
        basicdmg: "Basic DMG", skilldmg: "Skill DMG", heavydmg: "Heavy DMG", libdmg: "Liberation DMG",
        aerodmg: "Aero DMG", electrodmg: "Electro DMG", fusiondmg: "Fusion DMG", glaciodmg: "Glacio DMG",
        havocdmg: "Havoc DMG", spectrodmg: "Spectro DMG", healing: "Healing Bonus"
    };
    const statIds = {
        hp: "stat-hp", atk: "stat-atk", def: "stat-def", er: "stat-er", cr: "stat-cr", cd: "stat-cd",
        basicdmg: "stat-basicdmg", skilldmg: "stat-skilldmg", heavydmg: "stat-heavydmg", libdmg: "stat-libdmg",
        healing: "stat-healing"
    };
    const statIcons = {
        hp: "images/stats/hp.webp", atk: "images/stats/atk.webp", def: "images/stats/def.webp", er: "images/stats/energy.webp",
        cr: "images/stats/crit.webp", cd: "images/stats/critdmg.webp", basicdmg: "images/stats/basic.png", skilldmg: "images/stats/skill.png",
        heavydmg: "images/stats/heavy.png", libdmg: "images/stats/lib.png",
        aerodmg: "images/elements/aero.webp", electrodmg: "images/elements/electro.webp", fusiondmg: "images/elements/fusion.webp",
        glaciodmg: "images/elements/glacio.webp", havocdmg: "images/elements/havoc.webp", spectrodmg: "images/elements/spectro.webp",
        healing: "images/stats/heal.webp",
        atkp: "images/stats/atk.webp", defp: "images/stats/def.webp", hpp: "images/stats/hp.webp"
    };
    const elements = [
        { name: "Aero", image: "images/elements/aero.webp" },
        { name: "Electro", image: "images/elements/electro.webp" },
        { name: "Fusion", image: "images/elements/fusion.webp" },
        { name: "Glacio", image: "images/elements/glacio.webp" },
        { name: "Havoc", image: "images/elements/havoc.webp" },
        { name: "Spectro", image: "images/elements/spectro.webp" }
    ];
    const resonators = [
        {
            name: "Augusta", color1: "#861B01", color2: "#603827",
            profile: "images/resonators/augusta.webp",
            background: "images/backgrounds/augusta-splash.webp",
            element: elements[1], weaponType: "Broadblade", rarity: 0, tier: 0,
            minorFortes: [{ key: "atkp", value: 12 }, { key: "cr", value: 8 }],
            stats: { hp: 10300, atk: 463, def: 1112, er: 100, cr: 5, cd: 150, basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0, aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0 }
        },
        {
            name: "Carlotta", color1: "#AA01A4", color2: "#6D6D6D",
            profile: "images/resonators/carlotta.webp",
            background: "images/backgrounds/carlotta-splash.webp",
            element: elements[3], weaponType: "Pistols", rarity: 0, tier: 0,
            minorFortes: [{ key: "atkp", value: 12 }, { key: "cr", value: 8 }],
            stats: { hp: 12450, atk: 463, def: 1198, er: 100, cr: 5, cd: 150, basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0, aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0 }
        },
        {
            name: "Danjin", color1: "#860124", color2: "#AA01A4",
            profile: "images/resonators/danjin.webp",
            background: "images/backgrounds/danjin-splash.jpg",
            element: elements[4], weaponType: "Sword", rarity: 1, tier: 1,
            minorFortes: [{ key: "atkp", value: 12 }, { key: "havocdmg", value: 12 }],
            stats: { hp: 9438, atk: 263, def: 1149, er: 100, cr: 5, cd: 150, basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0, aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0 }
        },
        {
            name: "Phrolova", color1: "#860124", color2: "#602738",
            profile: "images/resonators/phrolova.webp",
            background: "images/backgrounds/phrolova-splash.webp",
            element: elements[4], weaponType: "Rectifier", rarity: 0, tier: 1,
            minorFortes: [{ key: "atkp", value: 12 }, { key: "cr", value: 8 }],
            stats: { hp: 10775, atk: 438, def: 1137, er: 100, cr: 5, cd: 150, basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0, aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0 }
        },
        {
            name: "Shorekeeper", color1: "#011AAA", color2: "#5A5341",
            profile: "images/resonators/shorekeeper.webp",
            background: "images/backgrounds/shorekeeper-splash.webp",
            element: elements[5], weaponType: "Rectifier", rarity: 0, tier: 0,
            minorFortes: [{ key: "hpp", value: 12 }, { key: "healing", value: 12 }],
            stats: { hp: 16713, atk: 288, def: 1100, er: 100, cr: 5, cd: 150, basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0, aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0 }
        },
        {
            name: "Zani", color1: "#FFE5AD", color2: "#C20003",
            profile: "images/resonators/zani.webp",
            background: "images/backgrounds/zani-splash.webp",
            element: elements[5], weaponType: "Gauntlets", rarity: 0, tier: 0,
            minorFortes: [{ key: "atkp", value: 12 }, { key: "cr", value: 8 }],
            stats: { hp: 10775, atk: 438, def: 1137, er: 100, cr: 5, cd: 150, basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0, aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0 }
        }
    ];

    // External data hooks
    const ECHO_SETS = window.ECHO_SETS || {};
    const ECHO_TYPES = window.ECHO_TYPES || {};
    const RECOMMENDED_SUBSTATS = window.RECOMMENDED_SUBSTATS || {};
    const RECOMMENDED_MAIN_STATS = window.RECOMMENDED_MAIN_STATS || {};
    const RECOMMENDED_WEIGHTS = window.RECOMMENDED_WEIGHTS || {};
    const SCORE_GRADES = window.SCORE_GRADES || [];
    const MAIN_STAT_VALUES = window.MAIN_STAT_VALUES || {};
    const SUBSTAT_VALUES = window.SUBSTAT_VALUES || {};

    // --- Helpers --------------------------------------------------------------
    function labelFor(key) { return STAT_LABELS[key] || key.toUpperCase(); }
    function iconFor(key) { return statIcons[key] || "images/stats/unknown.png"; }
    function hexToRgb(hex) { hex = hex.replace(/^#/, ""); const n = parseInt(hex, 16); return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`; }

    function createChevronSVG() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("class", "chevron");
        svg.setAttribute("aria-hidden", "true");
        svg.innerHTML = `<path d="M6 9l6 6 6-6" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
        return svg;
    }
    function setupChevron(selectedEl) {
        if (!selectedEl) return { label: null, chevron: null };
        let label = selectedEl.querySelector(".dropdown-label");
        let chevron = selectedEl.querySelector(".chevron");
        if (label && chevron) return { label, chevron };
        label = document.createElement("div");
        label.className = "dropdown-label";
        while (selectedEl.firstChild) label.appendChild(selectedEl.firstChild);
        chevron = createChevronSVG();
        selectedEl.appendChild(label); selectedEl.appendChild(chevron);
        return { label, chevron };
    }

    // Persistence (cookies) ----------------------------------------------------
    const COOKIE_NAME = "tethysState";

    function getCookie(name) {
        const parts = document.cookie.split("; ");
        for (const part of parts) {
            const [k, v] = part.split("=");
            if (k === name) return decodeURIComponent(v || "");
        }
        return "";
    }
    function setCookie(name, value, maxAgeDays = 365) {
        const maxAge = Math.floor(maxAgeDays * 24 * 60 * 60);
        document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
    }

    function readState() {
        try {
            const raw = getCookie(COOKIE_NAME);
            if (!raw) return { selectedCharName: null, chars: {} };
            const parsed = JSON.parse(raw);
            return { selectedCharName: null, chars: {}, ...parsed };
        } catch { return { selectedCharName: null, chars: {} }; }
    }
    function writeState(state) {
        try { setCookie(COOKIE_NAME, JSON.stringify(state)); } catch { /* noop */ }
    }
    function charKey(char) { return char?.name || ""; }
    function ensureChar(state, key) {
        if (!state.chars[key]) state.chars[key] = { weaponIndex: null, echoes: [null, null, null, null, null] };
        return state.chars[key];
    }
    function persistSelectedChar(char) {
        const st = readState(); st.selectedCharName = charKey(char); writeState(st);
    }
    function persistWeaponFor(char, weaponIndex) {
        const st = readState(); const ck = charKey(char); const cst = ensureChar(st, ck); cst.weaponIndex = weaponIndex; writeState(st);
    }
    function persistEchoesFor(char, echoesArr) {
        const st = readState(); const ck = charKey(char); const cst = ensureChar(st, ck); cst.echoes = echoesArr; writeState(st);
    }
    function applyWeaponSelectionLabel(character, weaponIndex) {
        const list = weaponsByType[character.weaponType] || [];
        const weapon = list[weaponIndex]; if (!weapon) return;
        if (weaponSelectedUI.label) {
            const img = document.createElement("img"); img.src = weapon.image; img.alt = weapon.name;
            const span = document.createElement("span"); span.textContent = weapon.name;
            weaponSelectedUI.label.innerHTML = ""; weaponSelectedUI.label.appendChild(img); weaponSelectedUI.label.appendChild(span);
        }
    }
    function rehydrateForCharacter(character) {
        const st = readState(); const cst = st.chars[charKey(character)]; if (!cst) return;
        // weapon
        if (typeof cst.weaponIndex === "number") {
            weaponDropdownHidden.value = String(cst.weaponIndex);
            weaponDropdownHidden.dispatchEvent(new Event("change"));
            applyWeaponSelectionLabel(character, cst.weaponIndex);
        }
        // echoes
        if (Array.isArray(cst.echoes) && cst.echoes.length === 5) {
            currentEchoes = cst.echoes;
            renderEchoTiles(); renderEchoCost(); renderEchoSetBonusesPanel();
            if (currentCharacter) renderMainStatsFrom(currentCharacter, currentWeapon, getAllEchoBonuses());
        }
    }
    function restoreOnLoad() {
        const st = readState(); if (!st.selectedCharName) return;
        const idx = (resonators || []).findIndex(c => c.name === st.selectedCharName);
        if (idx < 0) return;
        // Update visible label
        const char = resonators[idx];
        if (characterSelectedUI.label) {
            const img = document.createElement("img"); img.src = char.profile || ""; img.alt = char.name;
            const span = document.createElement("span"); span.textContent = char.name;
            characterSelectedUI.label.innerHTML = ""; characterSelectedUI.label.appendChild(img); characterSelectedUI.label.appendChild(span);
        }
        characterDropdown.value = String(idx);
        characterDropdown.dispatchEvent(new Event("change"));
        // echo/weapon will be applied inside the change handler via rehydrateForCharacter
    }

    // Percent formatting helpers
    const PCT_KEYS = ["atkp", "hpp", "defp", "cr", "cd", "er", "basicdmg", "skilldmg", "heavydmg", "libdmg", "havocdmg", "healing"];
    const WEAPON_PERCENT_KEYS = ["atkp", "hpp", "defp", "cr", "cd", "er"];
    function formatWeaponStatValue(key, value) {
        if (value == null || value === "") return "—";
        if (typeof value !== "number") return String(value);
        return WEAPON_PERCENT_KEYS.includes(key) ? `${value}%` : `${value}`;
    }
    function parseNumber(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }

    // Echo cost radios
    function getSelectedEchoCost() {
        const el = document.querySelector('input[name="echoCost"]:checked');
        return el ? parseInt(el.value, 10) : 4;
    }
    function setSelectedEchoCost(cost) {
        const el = document.querySelector(`input[name="echoCost"][value="${cost}"]`);
        if (el) el.checked = true;
    }
    function onEchoCostChange(handler) {
        document.querySelectorAll('input[name="echoCost"]').forEach(r => r.addEventListener('change', handler));
    }

    // Allowed main stat keys by cost
    const ALLOWED_MAIN_BY_COST = {
        1: ["hpp", "atkp", "defp"],
        3: ["hpp", "atkp", "defp", "er", "aerodmg", "electrodmg", "fusiondmg", "glaciodmg", "havocdmg", "spectrodmg"],
        4: ["hpp", "atkp", "defp", "cr", "cd", "healing"]
    };
    function getAllowedMainKeys(cost) { return ALLOWED_MAIN_BY_COST[cost] || []; }

    // Substat keys (no elementals) + order
    const ALLOWED_SUBSTAT_KEYS = Object.keys(statIcons).filter(k => !["aerodmg", "electrodmg", "fusiondmg", "glaciodmg", "havocdmg", "spectrodmg"].includes(k));
    const SUBSTAT_ORDER = ["cr", "cd", "atkp", "hpp", "defp", "er", "atk", "hp", "def", "basicdmg", "skilldmg", "heavydmg", "libdmg", "healing"];
    const ORDERED_SUBSTAT_KEYS = [
        ...SUBSTAT_ORDER.filter(k => ALLOWED_SUBSTAT_KEYS.includes(k)),
        ...ALLOWED_SUBSTAT_KEYS.filter(k => !SUBSTAT_ORDER.includes(k))
    ];

    // Tier helper for substat roll quality (low/mid/high)
    function substatTierClass(key, value) {
        try {
            const arr = (SUBSTAT_VALUES?.[key] || []).map(Number);
            if (!arr.length) return "sub-tier-mid";
            const idx = arr.indexOf(Number(value));
            const i = idx >= 0 ? idx : (() => {
                // fallback: find nearest
                let bestI = 0, bestD = Infinity;
                arr.forEach((v, j) => { const d = Math.abs(v - Number(value)); if (d < bestD) { bestD = d; bestI = j; } });
                return bestI;
            })();
            const L = arr.length;
            const lowEnd = Math.floor(L / 3);
            const highStart = Math.floor(2 * L / 3);
            if (i < lowEnd) return "sub-tier-low";
            if (i >= highStart) return "sub-tier-high";
            return "sub-tier-mid";
        } catch (_) {
            return "sub-tier-mid";
        }
    }

    // Quartile helper for substat roll quality (q1..q4 low→high)
    function substatQuartileClass(key, value) {
        try {
            const arr = (SUBSTAT_VALUES?.[key] || []).map(Number);
            if (!arr.length) return "sub-tier-q2";
            let i = arr.indexOf(Number(value));
            if (i < 0) {
                let bestI = 0, bestD = Infinity;
                arr.forEach((v, j) => { const d = Math.abs(v - Number(value)); if (d < bestD) { bestD = d; bestI = j; } });
                i = bestI;
            }
            const denom = Math.max(1, arr.length - 1);
            const ratio = i / denom; // 0..1
            if (ratio >= 0.75) return 'sub-tier-q4';      // highest → green
            if (ratio >= 0.50) return 'sub-tier-q3';      // higher middle → yellow
            if (ratio >= 0.25) return 'sub-tier-q2';      // lower middle → orange
            return 'sub-tier-q1';                         // lowest → red
        } catch (_) {
            return 'sub-tier-q2';
        }
    }

    // Map a substat value to a 0..10 score based on its position in SUBSTAT_VALUES
    function substatValueScore(key, value) {
        const arr = (SUBSTAT_VALUES?.[key] || []).map(Number);
        if (!arr.length) return 0;
        // Find closest index if exact not found
        let idx = arr.indexOf(Number(value));
        if (idx < 0) {
            let bestI = 0, bestD = Infinity;
            arr.forEach((v, j) => { const d = Math.abs(v - Number(value)); if (d < bestD) { bestD = d; bestI = j; } });
            idx = bestI;
        }
        const denom = Math.max(1, arr.length - 1);
        return (idx / denom) * 10; // 0..10
    }

    function getRecommendedSubsFor(charName) {
        const conf = RECOMMENDED_SUBSTATS[charName];
        if (Array.isArray(conf)) return conf;
        if (conf && Array.isArray(conf.subs)) return conf.subs;
        return [];
    }

    function getRecommendedMainFor(charName) {
        const arr = RECOMMENDED_MAIN_STATS[charName];
        return Array.isArray(arr) ? arr : [];
    }

    function getWeightsFor(charName) {
        const w = RECOMMENDED_WEIGHTS[charName] || {};
        return (w && typeof w === 'object') ? w : {};
    }

    function scoreEchoPiece(piece, charName) {
        if (!piece) return 0;
        const recSubs = new Set(getRecommendedSubsFor(charName));
        const weights = getWeightsFor(charName);
        let subsScore = 0;
        (piece.subs || []).forEach(s => {
            if (!s?.key) return;
            if (!recSubs.has(s.key)) return; // only recommended substats score
            const base = substatValueScore(s.key, parseNumber(s.value)); // 0..10
            const weight = Number.isFinite(weights[s.key]) ? Math.max(0, Number(weights[s.key])) : 1;
            subsScore += Math.min(10, base * weight);
        });
        // Cap substats at 50 total
        subsScore = Math.min(50, subsScore);
        const recMain = new Set(getRecommendedMainFor(charName));
        const mainScore = piece.main?.key && recMain.has(piece.main.key) ? 10 : 0;
        return subsScore + mainScore; // 0..60
    }

    function gradeForScore(score) {
        if (!Array.isArray(SCORE_GRADES) || !SCORE_GRADES.length) return "";
        // assume sorted top-down; if not, sort by min desc for safety
        const arr = [...SCORE_GRADES].sort((a, b) => (b.min ?? 0) - (a.min ?? 0));
        const s = Number(score) || 0;
        const found = arr.find(g => s >= (g.min ?? 0));
        return (found && found.label) ? String(found.label) : "";
    }

    // Cost-based flats per echo
    const ECHO_COST_BONUS = { 4: [{ key: "atk", value: 150 }], 3: [{ key: "atk", value: 100 }], 1: [{ key: "hp", value: 2280 }] };

    // Dropdown builders ---------------------------------------------------------
    function setupCustomDropdown(wrapperId, hiddenSelectId, optionsId, selectedId, statKeys) {
        const hiddenSelect = document.getElementById(hiddenSelectId);
        const optionsDiv = document.getElementById(optionsId);
        const selectedDiv = document.getElementById(selectedId);
        if (!hiddenSelect || !optionsDiv || !selectedDiv) return;
        setupChevron(selectedDiv);
        if (!selectedDiv.dataset.filled) {
            hiddenSelect.innerHTML = ""; optionsDiv.innerHTML = "";
            statKeys.forEach(k => {
                const opt = document.createElement("option"); opt.value = k; opt.textContent = labelFor(k); hiddenSelect.appendChild(opt);
                const row = document.createElement("div"); row.className = "dropdown-option"; row.dataset.value = k;
                const img = document.createElement("img"); img.src = iconFor(k); img.alt = labelFor(k);
                const span = document.createElement("span"); span.textContent = labelFor(k);
                row.appendChild(img); row.appendChild(span);
                row.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const label = selectedDiv.querySelector(".dropdown-label");
                    if (label) { label.innerHTML = ""; label.appendChild(img.cloneNode()); label.appendChild(document.createTextNode(labelFor(k))); }
                    optionsDiv.classList.add("hidden"); selectedDiv.classList.remove("open");
                    hiddenSelect.value = k; hiddenSelect.dispatchEvent(new Event("change"));
                });
                optionsDiv.appendChild(row);
            });
            selectedDiv.addEventListener("click", (e) => {
                e.stopPropagation();
                document.querySelectorAll(".dropdown-selected.open").forEach(el => { if (el !== selectedDiv) el.classList.remove("open"); });
                document.querySelectorAll(".dropdown-options:not(.hidden)").forEach(el => { if (el !== optionsDiv) el.classList.add("hidden"); });
                optionsDiv.classList.toggle("hidden"); selectedDiv.classList.toggle("open");
            });
            selectedDiv.dataset.filled = "1";
        }
    }

    function populateSubValueDropdown(idx, values, selectedVal = "") {
        const hiddenId = `echoSub${idx}Val`;
        const optionsId = `echoSub${idx}ValOptions`;
        const selectedId = `echoSub${idx}ValSelected`;
        const wrapId = `echoSub${idx}ValWrapper`;

        const hiddenSelect = document.getElementById(hiddenId);
        const optionsDiv = document.getElementById(optionsId);
        const selectedDiv = document.getElementById(selectedId);
        const wrap = document.getElementById(wrapId);
        if (!hiddenSelect || !optionsDiv || !selectedDiv) return;

        hiddenSelect.innerHTML = "";
        optionsDiv.innerHTML = "";

        // Placeholder in hidden select
        const placeholderOpt = document.createElement("option");
        placeholderOpt.value = "";
        placeholderOpt.textContent = "—";
        hiddenSelect.appendChild(placeholderOpt);

        values.forEach(v => {
            const valStr = String(v);

            const opt = document.createElement("option");
            opt.value = valStr;
            opt.textContent = valStr;
            hiddenSelect.appendChild(opt);

            const row = document.createElement("div");
            row.className = "dropdown-option";
            row.dataset.value = valStr;
            row.textContent = valStr;
            row.addEventListener("click", e => {
                e.stopPropagation();
                const label = selectedDiv.querySelector(".dropdown-label");
                if (label) label.textContent = valStr;
                else selectedDiv.innerHTML = `<div class="dropdown-label">${valStr}</div>`;
                // Add/update unit overlay for percent substats
                let unitEl = selectedDiv.querySelector('.echo-unit');
                if (!unitEl) { unitEl = document.createElement('span'); unitEl.className = 'echo-unit'; selectedDiv.appendChild(unitEl); }
                if (wrap?.classList.contains('pct')) unitEl.textContent = '%'; else unitEl.textContent = '';
                optionsDiv.classList.add("hidden");
                selectedDiv.classList.remove("open");
                hiddenSelect.value = valStr;
                hiddenSelect.dispatchEvent(new Event("change"));
            });
            optionsDiv.appendChild(row);
        });

        // Toggle open/close
        if (!selectedDiv.dataset.filled) {
            selectedDiv.addEventListener("click", e => {
                e.stopPropagation();
                document.querySelectorAll(".dropdown-selected.open").forEach(el => { if (el !== selectedDiv) el.classList.remove("open"); });
                document.querySelectorAll(".dropdown-options:not(.hidden)").forEach(el => { if (el !== optionsDiv) el.classList.add("hidden"); });
                optionsDiv.classList.toggle("hidden");
                selectedDiv.classList.toggle("open");
            });
            selectedDiv.dataset.filled = "1";
        }

        // Restore
        if (selectedVal) {
            hiddenSelect.value = selectedVal;
            selectedDiv.innerHTML = `<div class="dropdown-label">${selectedVal}</div>`;
            // Ensure unit overlay reflects pct status
            let unitEl = selectedDiv.querySelector('.echo-unit');
            if (!unitEl) { unitEl = document.createElement('span'); unitEl.className = 'echo-unit'; selectedDiv.appendChild(unitEl); }
            if (wrap?.classList.contains('pct')) unitEl.textContent = '%'; else unitEl.textContent = '';
        } else {
            selectedDiv.innerHTML = `<div class="dropdown-label">—</div>`;
            // Clear any unit overlay on empty
            const unitEl = selectedDiv.querySelector('.echo-unit'); if (unitEl) unitEl.textContent = '';
        }
    }

    function rebuildCustomDropdown(selectedId, optionsId, hiddenSelectId, keys) {
        const selectedDiv = document.getElementById(selectedId);
        const optionsDiv = document.getElementById(optionsId);
        const hiddenSel = document.getElementById(hiddenSelectId);
        if (!selectedDiv || !optionsDiv || !hiddenSel) return;

        hiddenSel.innerHTML = ""; optionsDiv.innerHTML = "";
        keys.forEach(k => {
            const opt = document.createElement("option"); opt.value = k; opt.textContent = labelFor(k); hiddenSel.appendChild(opt);
            const row = document.createElement("div"); row.className = "dropdown-option"; row.dataset.value = k;
            const img = document.createElement("img"); img.src = iconFor(k); img.alt = labelFor(k);
            const span = document.createElement("span"); span.textContent = labelFor(k);
            row.appendChild(img); row.appendChild(span);
            row.addEventListener("click", (e) => {
                e.stopPropagation();
                const label = selectedDiv.querySelector(".dropdown-label");
                if (label) { label.innerHTML = ""; label.appendChild(img.cloneNode()); label.appendChild(document.createTextNode(labelFor(k))); }
                optionsDiv.classList.add("hidden"); selectedDiv.classList.remove("open");
                hiddenSel.value = k; hiddenSel.dispatchEvent(new Event("change"));
            });
            optionsDiv.appendChild(row);
        });
        setupChevron(selectedDiv);
    }
    function setCustomDropdownLabel(selectedId, valueKey) {
        const selectedDiv = document.getElementById(selectedId); if (!selectedDiv) return;
        const label = selectedDiv.querySelector(".dropdown-label"); if (!label) return;
        if (!valueKey) {
            if (selectedId.includes("Main")) label.innerHTML = "<span>Select Main Stat</span>";
            else if (selectedId.includes("Sub")) label.innerHTML = "<span>Select Sub Stat</span>";
            else label.innerHTML = "<span>Select</span>";
            return;
        }
        const img = document.createElement("img"); img.src = iconFor(valueKey); img.alt = labelFor(valueKey);
        label.innerHTML = ""; label.appendChild(img); label.appendChild(document.createTextNode(labelFor(valueKey)));
    }

    // Echo Sets dropdown --------------------------------------------------------
    function initEchoSetDropdown() {
        const selectedDiv = document.getElementById("echoSetDropdownSelected");
        const optionsDiv = document.getElementById("echoSetDropdownOptions");
        const hiddenSel = document.getElementById("echoSetKey");
        if (!selectedDiv || !optionsDiv || !hiddenSel) return;
        if (selectedDiv.dataset.filled) return;
        setupChevron(selectedDiv);
        hiddenSel.innerHTML = ""; optionsDiv.innerHTML = "";
        Object.entries(ECHO_SETS).forEach(([id, set]) => {
            const opt = document.createElement("option"); opt.value = id; opt.textContent = set.name; hiddenSel.appendChild(opt);
            const row = document.createElement("div"); row.className = "dropdown-option"; row.dataset.value = id;
            const img = document.createElement("img"); img.src = set.icon; img.alt = set.name;
            const span = document.createElement("span"); span.textContent = set.name;
            row.appendChild(img); row.appendChild(span);
            row.addEventListener("click", (e) => {
                e.stopPropagation();
                const label = selectedDiv.querySelector(".dropdown-label");
                if (label) { label.innerHTML = ""; label.appendChild(img.cloneNode()); label.appendChild(document.createTextNode(set.name)); }
                optionsDiv.classList.add("hidden"); selectedDiv.classList.remove("open");
                hiddenSel.value = id; hiddenSel.dispatchEvent(new Event("change"));
            });
            optionsDiv.appendChild(row);
        });
        selectedDiv.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelectorAll(".dropdown-selected.open").forEach(el => { if (el !== selectedDiv) el.classList.remove("open"); });
            document.querySelectorAll(".dropdown-options:not(.hidden)").forEach(el => { if (el !== optionsDiv) el.classList.add("hidden"); });
            optionsDiv.classList.toggle("hidden"); selectedDiv.classList.toggle("open");
        });
        selectedDiv.dataset.filled = "1";
    }
    function setEchoSetDropdownLabel(setId) {
        const selectedDiv = document.getElementById("echoSetDropdownSelected"); if (!selectedDiv) return;
        const label = selectedDiv.querySelector(".dropdown-label"); if (!label) return;
        if (!setId) { label.innerHTML = "<span>Select Echo Set</span>"; return; }
        const set = ECHO_SETS[setId]; if (!set) { label.innerHTML = "<span>Select Echo Set</span>"; return; }
        const img = document.createElement("img"); img.src = set.icon; img.alt = set.name;
        label.innerHTML = ""; label.appendChild(img); label.appendChild(document.createTextNode(set.name));
    }

    // Echo Types dropdown (typeahead input) -------------------------------------
    function getUsedEchoTypeIds(excludeSlot) {
        const used = new Set();
        currentEchoes.forEach((e, idx) => { if (e?.typeId) { const s = idx + 1; if (excludeSlot && s === excludeSlot) return; used.add(e.typeId); } });
        return used;
    }

    function populateEchoTypeDropdown({ cost, setId, activeSlot }) {
        const input = document.getElementById("echoTypeSearchInput");
        const optionsDiv = document.getElementById("echoTypeDropdownOptions");
        const hiddenSel = document.getElementById("echoTypeKey");
        if (!input || !optionsDiv || !hiddenSel) return;

        hiddenSel.innerHTML = ""; optionsDiv.innerHTML = "";

        const used = getUsedEchoTypeIds(activeSlot);
        const eligible = Object.entries(ECHO_TYPES).filter(([id, t]) => {
            if (t.cost !== cost) return false;
            if (setId && setId.length && !(t.sets || []).includes(setId)) return false;
            if (used.has(id)) return false;
            return true;
        });

        eligible.forEach(([id, t]) => {
            const opt = document.createElement("option");
            opt.value = id; opt.textContent = t.name; hiddenSel.appendChild(opt);

            const row = document.createElement("div");
            row.className = "dropdown-option";
            row.dataset.value = id;
            row.dataset.label = t.name.toLowerCase();

            const img = document.createElement("img"); img.src = t.icon; img.alt = t.name;
            const span = document.createElement("span"); span.textContent = t.name;
            row.appendChild(img); row.appendChild(span);

            row.addEventListener("click", () => {
                input.value = t.name;
                optionsDiv.classList.add("hidden");
                hiddenSel.value = id;
                hiddenSel.dispatchEvent(new Event("change"));
            });
            optionsDiv.appendChild(row);
        });

        // Bind once
        if (!input.dataset.bound) {
            input.addEventListener("input", () => {
                const q = input.value.trim().toLowerCase();
                optionsDiv.querySelectorAll(".dropdown-option").forEach(opt => {
                    const label = opt.dataset.label || "";
                    opt.classList.toggle("hidden", !label.includes(q));
                });
            });

            // Open without flicker
            input.addEventListener("focus", () => {
                optionsDiv.classList.remove("hidden");
                input.setAttribute("aria-expanded", "true");
            });
            input.addEventListener("mousedown", (e) => {
                if (optionsDiv.classList.contains("hidden")) {
                    e.preventDefault();
                    input.focus();
                    optionsDiv.classList.remove("hidden");
                    input.setAttribute("aria-expanded", "true");
                }
            });

            // Keep list open when interacting with it
            optionsDiv.addEventListener("mousedown", (e) => { e.preventDefault(); });

            // Close on true outside click
            document.addEventListener("click", (e) => {
                if (!e.target.closest(".custom-dropdown")) {
                    document.querySelectorAll(".dropdown-options").forEach(el => el.classList.add("hidden"));
                    document.querySelectorAll("input.dropdown-selected[aria-expanded='true']")
                        .forEach(el => el.setAttribute("aria-expanded", "false"));
                }
            });

            input.dataset.bound = "1";
        }
    }

    function setEchoTypeDropdownLabel(typeId) {
        const selectedDiv = document.getElementById("echoTypeDropdownSelected"); if (!selectedDiv) return;
        const label = selectedDiv.querySelector(".dropdown-label"); if (!label) return;
        if (!typeId || !ECHO_TYPES[typeId]) { label.innerHTML = "<span>Select Echo Type</span>"; return; }
        const t = ECHO_TYPES[typeId]; const img = document.createElement("img"); img.src = t.icon; img.alt = t.name;
        label.innerHTML = ""; label.appendChild(img); label.appendChild(document.createTextNode(t.name));
    }

    // Modal dropdown init (main + subs)
    function initEchoModalDropdowns() {
        const keysForMain = Object.keys(statIcons); // filtered later by cost
        setupCustomDropdown("echoMainDropdownWrapper", "echoMainKey", "echoMainDropdownOptions", "echoMainDropdownSelected", keysForMain);
        for (let i = 1; i <= 5; i++) {
            setupCustomDropdown(`echoSub${i}DropdownWrapper`, `echoSub${i}Key`, `echoSub${i}DropdownOptions`, `echoSub${i}DropdownSelected`, ORDERED_SUBSTAT_KEYS);
        }
    }

    // Substat values (legacy select builder kept for safety)
    function buildSubValueOptionsHTML(key, selectedVal = "") {
        const values = SUBSTAT_VALUES[key] || [];
        const opts = ['<option value="">—</option>'];
        for (const v of values) {
            const s = String(v); const sel = (String(selectedVal) === s) ? ' selected' : '';
            opts.push(`<option value="${s}"${sel}>${s}</option>`);
        }
        return opts.join("");
    }
    function populateSubValueSelect(idx, key, selectedVal = "") {
        const sel = document.getElementById(`echoSub${idx}Val`); if (!sel) return;
        sel.innerHTML = buildSubValueOptionsHTML(key, selectedVal);
    }
    function updateSubKeyDuplicateDisables() {
        const chosen = new Map();
        for (let i = 1; i <= 5; i++) { const k = document.getElementById(`echoSub${i}Key`)?.value || ""; if (!k) continue; chosen.set(k, (chosen.get(k) || 0) + 1); }
        for (let i = 1; i <= 5; i++) {
            const keySel = document.getElementById(`echoSub${i}Key`);
            const optsDiv = document.getElementById(`echoSub${i}DropdownOptions`);
            if (!keySel) continue;
            const current = keySel.value;
            Array.from(keySel.options).forEach(opt => {
                if (!opt.value) { opt.disabled = false; return; }
                const count = chosen.get(opt.value) || 0; const isThis = (opt.value === current);
                opt.disabled = (!isThis && count >= 1);
            });
            if (optsDiv) {
                Array.from(optsDiv.children).forEach(divOpt => {
                    const val = divOpt?.dataset?.value || "";
                    if (!val) { divOpt.classList.remove("disabled"); return; }
                    const count = chosen.get(val) || 0; const isThis = (val === current);
                    if (!isThis && count >= 1) divOpt.classList.add("disabled"); else divOpt.classList.remove("disabled");
                });
            }
        }
    }
    function onSubKeyChangeFactory(idx) {
        return function () {
            const key = document.getElementById(`echoSub${idx}Key`)?.value || "";
            const cur = document.getElementById(`echoSub${idx}Val`)?.value || "";
            const values = SUBSTAT_VALUES[key] || [];
            // Rebuild the custom value dropdown for this sub
            populateSubValueDropdown(idx, values, cur);
            // Enable/disable value selector until a key is chosen
            const wrap = document.getElementById(`echoSub${idx}ValWrapper`);
            if (wrap) {
                wrap.classList.toggle('disabled', !key);
                wrap.classList.toggle('pct', !!key && PCT_KEYS.includes(key));
                // If value already selected, update unit overlay accordingly
                const selectedDiv = document.getElementById(`echoSub${idx}ValSelected`);
                const unitEl = selectedDiv?.querySelector('.echo-unit');
                if (unitEl) unitEl.textContent = (wrap.classList.contains('pct') && cur) ? '%' : '';
            }
            updateSubKeyDuplicateDisables();
        };
    }

    // Main stat auto value by cost
    function setMainStatValueFromSelection() {
        const mainKeyEl = document.getElementById("echoMainKey");
        const mainValEl = document.getElementById("echoMainVal");
        const mainUnitEl = document.getElementById("echoMainValUnit");
        if (!mainKeyEl || !mainValEl) return;
        const cost = getSelectedEchoCost();
        const key = mainKeyEl.value;
        const v = (MAIN_STAT_VALUES?.[cost] ?? {})[key];
        mainValEl.value = (typeof v === "number") ? String(v) : "";
        mainValEl.readOnly = true; mainValEl.title = "Main stat value is auto-set by cost & stat";
        // Toggle inactive style until a main stat is chosen
        mainValEl.classList.toggle('disabled', !key);
        if (mainUnitEl) mainUnitEl.textContent = key && PCT_KEYS.includes(key) ? "%" : "";
    }

    // Echo modal state ----------------------------------------------------------
    let currentEchoes = [null, null, null, null, null]; // {cost,setId,typeId, main:{key,value}, subs:[{key,value}]}
    let activeEchoSlot = null;
    const ECHO_COST_CAP = 12;

    function computeTotalEchoCost() { return currentEchoes.reduce((s, e) => s + (e?.cost || 0), 0); }
    function renderEchoCost() {
        const el = document.getElementById("echoCostVal"); if (!el) return;
        const total = computeTotalEchoCost(); el.textContent = total;
        if (total > ECHO_COST_CAP) el.classList.add("over"); else el.classList.remove("over");
    }
    function composeEchoStats(e) {
        if (!e) return [];
        const out = []; if (e.main?.key) out.push({ key: e.main.key, value: parseNumber(e.main.value) });
        (e.subs || []).forEach(s => { if (s?.key) out.push({ key: s.key, value: parseNumber(s.value) }); });
        return out;
    }

    function renderEchoTiles() {
        const wrap = document.getElementById("echoTiles"); if (!wrap) return;
        wrap.innerHTML = "";
        const recSet = new Set((currentCharacter && RECOMMENDED_SUBSTATS[currentCharacter?.name]) || []);
        for (let i = 0; i < 5; i++) {
            const slot = i + 1;
            const data = currentEchoes[i];

            const tile = document.createElement("div");
            tile.className = "echo-card-proto"; // use prototype layout for live tiles
            tile.dataset.slot = String(slot);

            // Build prototype-style card for this echo
            {
                const left = document.createElement('div'); left.className = 'proto-left';
                const right = document.createElement('div'); right.className = 'proto-right';

                const hasType = !!(data?.typeId && ECHO_TYPES[data.typeId]);
                const hasSet = !!(data?.setId && ECHO_SETS[data.setId]);
                const hasMain = !!(data?.main?.key);
                const showLeft = hasType || hasSet || hasMain;

                if (showLeft) {
                    // Left: image (only show once a type is selected)
                    if (hasType) {
                        const thumbWrap = document.createElement('div'); thumbWrap.className = 'proto-thumb';
                        const img = document.createElement('img');
                        const t = ECHO_TYPES[data.typeId];
                        img.src = t.thumb || t.icon || 'images/stats/unknown.png';
                        img.alt = t.name || 'Echo';
                        thumbWrap.appendChild(img);
                        left.appendChild(thumbWrap);
                    }

                    // Top-right badges: cost + set
                    const badges = document.createElement('div'); badges.className = 'proto-badges';
                    const cost = document.createElement('div'); cost.className = 'proto-cost'; cost.textContent = String(data?.cost || 0);
                    badges.appendChild(cost);
                    if (hasSet) {
                        const setImg = document.createElement('img'); setImg.className = 'proto-set'; setImg.src = ECHO_SETS[data.setId].icon; setImg.alt = (ECHO_SETS[data.setId].name || 'Set');
                        badges.appendChild(setImg);
                    }
                    left.appendChild(badges);
                    // Echo type name below badges (only if type selected)
                    if (hasType) {
                        const typeName = ECHO_TYPES[data.typeId]?.name || `Echo ${slot}`;
                        const typeLbl = document.createElement('div'); typeLbl.className = 'proto-type'; typeLbl.textContent = typeName;
                        left.appendChild(typeLbl);
                    }

                    // Bottom-right main stat overlay (icon + value only)
                    if (hasMain) {
                        const main = document.createElement('div'); main.className = 'proto-main';
                        const ic = document.createElement('img'); ic.className = 'stat-icon small'; ic.src = iconFor(data.main.key); ic.alt = labelFor(data.main.key);
                        const isPct = PCT_KEYS.includes(data.main.key);
                        const val = document.createElement('span'); val.className = 'proto-main-value'; val.textContent = isPct ? `${parseNumber(data.main.value)}%` : `${parseNumber(data.main.value)}`;
                        main.appendChild(ic); main.appendChild(val);
                        left.appendChild(main);
                    }
                } else {
                    // No left content to show
                    tile.classList.add('no-left');
                }

                // Right: substats grid
                const statsGrid = document.createElement('div'); statsGrid.className = 'proto-stats';
                if (data && Array.isArray(data.subs)) {
                    data.subs.forEach(s => {
                        if (!s?.key) return;
                        const chip = document.createElement('div'); chip.className = 'proto-chip';
                        const sic = document.createElement('img'); sic.className = 'stat-icon small'; sic.src = iconFor(s.key); sic.alt = labelFor(s.key);
                        const name = document.createElement('span'); name.className = 'proto-name'; name.textContent = labelFor(s.key);
                        const val = document.createElement('span'); val.className = 'proto-value'; val.textContent = PCT_KEYS.includes(s.key) ? `${parseNumber(s.value)}%` : `${parseNumber(s.value)}`;
                        // tier/weight class for gradient background
                        chip.classList.add(substatQuartileClass(s.key, parseNumber(s.value)));
                        // dim non-recommended substats if recommendations exist
                        if (recSet && recSet.size) {
                            if (recSet.has(s.key)) chip.classList.add('recommended');
                            else chip.classList.add('not-recommended');
                        }
                        chip.appendChild(sic); chip.appendChild(name); chip.appendChild(val);
                        statsGrid.appendChild(chip);
                    });
                }
                right.appendChild(statsGrid);
                // Divider and score
                const divider = document.createElement('div'); divider.className = 'proto-divider'; right.appendChild(divider);
                const scoreVal = data && currentCharacter ? Math.round(scoreEchoPiece(data, currentCharacter.name)) : 0;
                const grade = gradeForScore(scoreVal);
                const scoreRow = document.createElement('div'); scoreRow.className = 'echo-tile__score';
                const sLeft = document.createElement('div'); sLeft.className = 'score-left';
                const scoreIcon = document.createElement('img'); scoreIcon.className = 'stat-icon small'; scoreIcon.src = 'images/misc/score.webp'; scoreIcon.alt = 'Score';
                const sLabel = document.createElement('span'); sLabel.className = 'stat-chip__name'; sLabel.textContent = 'Score';
                sLeft.appendChild(scoreIcon); sLeft.appendChild(sLabel);
                const sRight = document.createElement('div'); sRight.className = 'score-right';
                const sVal = document.createElement('span'); sVal.className = 'stat-chip__value'; sVal.textContent = String(scoreVal);
                const sGrade = document.createElement('span'); sGrade.className = 'score-grade'; sGrade.textContent = grade ? `(${grade})` : '';
                sRight.appendChild(sVal); sRight.appendChild(sGrade);
                scoreRow.appendChild(sLeft); scoreRow.appendChild(sRight);
                right.appendChild(scoreRow);

                // If empty, show hint text in right side
                if (!data) {
                    right.innerHTML = '';
                    const empty = document.createElement('div'); empty.className = 'light'; empty.textContent = `Add Echo ${slot} — Click to set cost & stats`;
                    empty.style.padding = '0.5rem 0.75rem';
                    right.appendChild(empty);
                }

                if (showLeft) { tile.appendChild(left); }
                tile.appendChild(right);
                tile.addEventListener('click', () => { if (!currentCharacter) return; openEchoModal(slot); });
                wrap.appendChild(tile);
                continue;
            }

            // Thumbnail: only show once an echo type has been selected
            let thumb = null;
            if (data?.typeId && ECHO_TYPES[data.typeId]) {
                const t = ECHO_TYPES[data.typeId];
                const thumbSrc = t.thumb || t.icon || "images/stats/unknown.png";
                const thumbAlt = t.name || "Echo";
                thumb = document.createElement("div");
                thumb.className = "echo-tile__thumb";
                const ico = document.createElement("img");
                ico.src = thumbSrc; ico.alt = thumbAlt;
                thumb.appendChild(ico);
            }

            const meta = document.createElement("div");
            meta.className = "echo-tile__meta";

            if (!data) {
                const title = document.createElement("div"); title.className = "echo-tile__title"; title.textContent = `Add Echo ${slot}`;
                const hint = document.createElement("div"); hint.className = "light"; hint.textContent = "Click to set cost & stats";
                meta.appendChild(title); meta.appendChild(hint);
            } else {
                // Header: type name + smaller cost
                const title = document.createElement("div");
                title.className = "echo-tile__title";
                const echoName = (data.typeId && ECHO_TYPES[data.typeId]?.name) || `Echo ${slot}`;
                // Prepend set icon (if any) to the echo title
                if (data.setId && ECHO_SETS[data.setId]?.icon) {
                    const setIcon = document.createElement("img");
                    setIcon.className = "echo-set-icon";
                    setIcon.src = ECHO_SETS[data.setId].icon;
                    setIcon.alt = ECHO_SETS[data.setId].name || "Set";
                    title.appendChild(setIcon);
                }
                const titleText = document.createElement("span");
                titleText.textContent = echoName;
                title.appendChild(titleText);

                // meta.appendChild(title); // suppressed; show type on image instead
                // Floating cost badge (top-left)
                const costBadge = document.createElement("div");
                costBadge.className = "echo-tile__cost";
                costBadge.textContent = String(data.cost || 0);
                tile.appendChild(costBadge);

                // Stats chips
                const stats = document.createElement("div"); stats.className = "echo-tile__stats";
                if (data.main?.key) {
                    const chip = document.createElement("div"); chip.className = "stat-chip";
                    const ic = document.createElement("img"); ic.className = "stat-icon small"; ic.src = iconFor(data.main.key); ic.alt = labelFor(data.main.key);
                    const nameEl = document.createElement("span"); nameEl.className = "stat-chip__name"; nameEl.textContent = `Main • ${labelFor(data.main.key)}`;
                    const valEl = document.createElement("span"); valEl.className = "stat-chip__value";
                    valEl.textContent = PCT_KEYS.includes(data.main.key) ? `${parseNumber(data.main.value)}%` : `${parseNumber(data.main.value)}`;
                    // Normalize main chip label and tag meta for CSS placement
                    try { nameEl.textContent = labelFor(data.main.key); } catch (_) { }
                    meta.classList.add('has-main');
                    chip.appendChild(ic); chip.appendChild(nameEl); chip.appendChild(valEl); stats.appendChild(chip);
                }
                (data.subs || []).forEach(s => {
                    if (!s?.key) return;
                    const chip = document.createElement("div"); chip.className = "stat-chip";
                    const ic = document.createElement("img"); ic.className = "stat-icon small"; ic.src = iconFor(s.key); ic.alt = labelFor(s.key);
                    const nameEl = document.createElement("span"); nameEl.className = "stat-chip__name"; nameEl.textContent = labelFor(s.key);
                    const valEl = document.createElement("span"); valEl.className = "stat-chip__value";
                    valEl.textContent = PCT_KEYS.includes(s.key) ? `${parseNumber(s.value)}%` : `${parseNumber(s.value)}`;
                    // If recommendations exist for this resonator, mark recommended and dim others
                    if (recSet.size) {
                        if (recSet.has(s.key)) chip.classList.add('recommended');
                        else chip.classList.add('not-recommended');
                    }
                    // Apply tier class based on value position in the allowed list for that substat key
                    chip.classList.add(substatTierClass(s.key, parseNumber(s.value)));
                    chip.appendChild(ic); chip.appendChild(nameEl); chip.appendChild(valEl); stats.appendChild(chip);
                });

                // Layout: left (image + main) | right (substats)
                const content = document.createElement('div'); content.className = 'echo-tile__content';
                const leftCol = document.createElement('div'); leftCol.className = 'echo-tile__left';
                const rightCol = document.createElement('div'); rightCol.className = 'echo-tile__right';
                // Left badges (cost + set) and echo type label
                const badges = document.createElement('div'); badges.className = 'echo-left-badges';
                const costChip = document.createElement('div'); costChip.className = 'echo-left-cost'; costChip.textContent = String(data.cost || 0);
                badges.appendChild(costChip);
                if (data.setId && ECHO_SETS[data.setId]?.icon) {
                    const setImg = document.createElement('img'); setImg.className = 'echo-left-set'; setImg.src = ECHO_SETS[data.setId].icon; setImg.alt = (ECHO_SETS[data.setId].name || 'Set'); badges.appendChild(setImg);
                }
                leftCol.appendChild(badges);
                const typeLbl = document.createElement('div'); typeLbl.className = 'echo-left-type'; typeLbl.textContent = echoName; leftCol.appendChild(typeLbl);

                // move main chip to left
                const mainChipEl = stats.firstElementChild || null;
                if (mainChipEl) { leftCol.appendChild(mainChipEl); }

                // image into left column if present
                if (thumb) { leftCol.insertBefore(thumb, leftCol.firstChild || null); }
                // Main stat overlay in left column
                if (data.main?.key) {
                    const mainWrap = document.createElement('div'); mainWrap.className = 'echo-main';
                    const ic2 = document.createElement('img'); ic2.className = 'stat-icon small'; ic2.src = iconFor(data.main.key); ic2.alt = labelFor(data.main.key);
                    const isPct2 = PCT_KEYS.includes(data.main.key);
                    const val2 = document.createElement('span'); val2.className = 'echo-main-value'; val2.textContent = isPct2 ? `${parseNumber(data.main.value)}%` : `${parseNumber(data.main.value)}`;
                    mainWrap.appendChild(ic2); mainWrap.appendChild(val2);
                    leftCol.appendChild(mainWrap);
                }

                // right: remaining substat chips
                rightCol.appendChild(stats);
                content.appendChild(leftCol);
                content.appendChild(rightCol);
                meta.appendChild(content);

                // bottom-aligned score row
                const score = currentCharacter ? scoreEchoPiece(data, currentCharacter.name) : 0;
                const grade = gradeForScore(score);
                const badge = document.createElement("div");
                badge.className = "echo-tile__score";
                // left: icon + label
                const left = document.createElement('div'); left.className = 'score-left';
                const scoreIcon = document.createElement("img"); scoreIcon.className = "stat-icon small"; scoreIcon.src = "images/misc/score.webp"; scoreIcon.alt = "Score";
                const scoreLabel = document.createElement("span"); scoreLabel.className = "stat-chip__name"; scoreLabel.textContent = "Score";
                left.appendChild(scoreIcon); left.appendChild(scoreLabel);
                // right: number + letter grade
                const right = document.createElement('div'); right.className = 'score-right';
                const scoreValue = document.createElement("span"); scoreValue.className = "stat-chip__value"; scoreValue.textContent = String(Math.round(score));
                const scoreGrade = document.createElement('span'); scoreGrade.className = 'score-grade'; scoreGrade.textContent = grade ? `(${grade})` : '';
                right.appendChild(scoreValue); right.appendChild(scoreGrade);
                badge.appendChild(left); badge.appendChild(right);
                // Divider between substats and score within right column
                const rDivider = document.createElement('div'); rDivider.className = 'echo-divider'; rightCol.appendChild(rDivider);
                rightCol.appendChild(badge);
            }

            if (thumb) { tile.classList.add('has-thumb'); }
            tile.appendChild(meta);
            tile.addEventListener("click", () => { if (!currentCharacter) return; openEchoModal(slot); });
            wrap.appendChild(tile);
        }
    }

    // Cost bonus preview
    function costBonusText(cost) {
        const arr = ECHO_COST_BONUS[cost] || []; if (!arr.length) return "No cost bonus";
        return arr.map(b => `+${b.value} ${labelFor(b.key)}`).join("  •  ");
    }
    function renderEchoCostBonusPreview(costVal) {
        const el = document.getElementById("echoCostBonus"); if (!el) return;
        const cost = parseInt(costVal, 10);
        const arr = ECHO_COST_BONUS[cost] || [];
        el.innerHTML = "";
        const label = document.createElement("span"); label.className = "label"; label.textContent = "Cost bonus:";
        el.appendChild(label);
        if (!arr.length) { const none = document.createElement("span"); none.className = "light"; none.textContent = "None"; el.appendChild(none); return; }
        arr.forEach(b => {
            const chip = document.createElement("div"); chip.className = "cost-bonus-chip";
            const ic = document.createElement("img"); ic.className = "stat-icon"; ic.src = iconFor(b.key); ic.alt = labelFor(b.key);
            const isPct = PCT_KEYS.includes(b.key);
            const txt = document.createElement("span"); txt.textContent = `${isPct ? b.value + "%" : b.value} ${labelFor(b.key)}`;
            chip.appendChild(ic); chip.appendChild(txt);
            el.appendChild(chip);
        });
    }

    // Set bonuses (panel + active bonuses list)
    function renderEchoSetBonusesPanel() {
        const list = document.getElementById("echoSetBonusesList"); if (!list) return;
        const panel = document.getElementById("echoSetBonuses");
        list.innerHTML = "";
        const counts = {}; currentEchoes.forEach(e => { if (e?.setId) counts[e.setId] = (counts[e.setId] || 0) + 1; });
        const setIds = Object.keys(counts);
        // Hide the entire panel if there are no sets selected
        if (!setIds.length) {
            if (panel) { panel.style.display = "none"; }
            return;
        } else {
            if (panel) { panel.style.display = "flex"; }
        }
        setIds.forEach(setId => {
            const def = ECHO_SETS[setId]; if (!def) return; const used = counts[setId];
            const row = document.createElement("div"); row.className = "saved-item";
            const head = document.createElement("div"); head.className = "saved-item__header";
            const img = document.createElement("img"); img.className = "saved-item__profile"; img.src = def.icon; img.alt = def.name;
            const title = document.createElement("h2"); title.textContent = `${def.name} — ${used}/5`;
            head.appendChild(img); head.appendChild(title);
            // Normalize title separator to avoid garbled characters
            title.textContent = `${def.name} — ${used}/5`;
            const bonusesWrap = document.createElement("div"); bonusesWrap.className = "weapon-stats";
            (def.bonuses || []).forEach(b => {
                const chip = document.createElement("div"); chip.className = "stat-chip";
                if (used < b.count) { chip.classList.add("inactive"); } else { chip.classList.add("active"); }
                const tag = document.createElement("h3"); tag.textContent = `${b.count}-Set: `;
                chip.appendChild(tag);
                b.stats.forEach(s => {
                    const ic = document.createElement("img"); ic.className = "stat-icon small"; ic.src = iconFor(s.key); ic.alt = labelFor(s.key);
                    const txt = document.createElement("span"); const isPct = PCT_KEYS.includes(s.key); txt.textContent = `${isPct ? s.value + "%" : s.value} ${labelFor(s.key)}`;
                    chip.appendChild(ic); chip.appendChild(txt);
                });
                bonusesWrap.appendChild(chip);
            });
            row.appendChild(head); row.appendChild(bonusesWrap); list.appendChild(row);
        });
    }
    function getActiveSetBonuses() {
        const counts = {}; currentEchoes.forEach(e => { if (e?.setId) counts[e.setId] = (counts[e.setId] || 0) + 1; });
        const out = [];
        Object.entries(counts).forEach(([setId, n]) => {
            const def = ECHO_SETS[setId]; if (!def || !Array.isArray(def.bonuses)) return;
            def.bonuses.forEach(b => { if (n >= b.count && Array.isArray(b.stats)) out.push(...b.stats.map(s => ({ key: s.key, value: s.value }))); });
        });
        return out;
    }
    function getEchoTypeBonuses() {
        const out = []; currentEchoes.forEach(e => { if (!e?.typeId) return; const def = ECHO_TYPES[e.typeId]; if (!def || !Array.isArray(def.bonus)) return; def.bonus.forEach(s => out.push({ key: s.key, value: s.value })); });
        return out;
    }

    // Stats computation (WuWa per-source flooring for base %) -------------------
    const PERCENT_TO_BASE = { atkp: "atk", hpp: "hp", defp: "def" };
    function normalizedBaseStats(char) {
        const s = { ...(char?.stats || {}) };
        ["hp", "atk", "def", "er", "cr", "cd", "basicdmg", "skilldmg", "heavydmg", "libdmg", "aerodmg", "electrodmg", "fusiondmg", "glaciodmg", "havocdmg", "spectrodmg", "healing"].forEach(k => { if (typeof s[k] !== "number") s[k] = 0; });
        return s;
    }
    function splitWeaponStats(weapon) {
        if (!weapon || !Array.isArray(weapon.stats)) return { weaponBaseAtk: 0, other: [] };
        let weaponBaseAtk = 0; const other = [];
        for (const ent of weapon.stats) {
            if (ent.key === "atk" && typeof ent.value === "number") { weaponBaseAtk += ent.value; }
            else other.push(ent);
        }
        return { weaponBaseAtk, other };
    }
    function applyBonusArray(bonuses, postPctFlat, pctList, out) {
        if (!Array.isArray(bonuses)) return;
        for (const { key, value } of bonuses) {
            if (typeof value !== "number") continue;
            if (key === "atk" || key === "hp" || key === "def") { postPctFlat[key] += Math.floor(value); continue; }
            if (PERCENT_TO_BASE[key]) { const baseKey = PERCENT_TO_BASE[key]; (pctList[baseKey] || (pctList[baseKey] = [])).push(value); continue; }
            if (key in out) out[key] += value;
        }
    }
    function computeStatsWithBonuses(char, weapon, echoStatsArr) {
        const base = normalizedBaseStats(char); const out = { ...base };
        const { weaponBaseAtk, other: weaponOther } = splitWeaponStats(weapon);
        const postPctFlat = { atk: 0, hp: 0, def: 0 }; const pctList = { atk: [], hp: [], def: [] };
        applyBonusArray(char?.minorFortes, postPctFlat, pctList, out);
        applyBonusArray(weaponOther, postPctFlat, pctList, out);
        applyBonusArray(echoStatsArr, postPctFlat, pctList, out);

        const baseAtk = base.atk + weaponBaseAtk, baseHp = base.hp, baseDef = base.def;
        const atkPctSum = (pctList.atk || []).reduce((s, p) => s + Math.floor(baseAtk * (p / 100)), 0);
        const hpPctSum = (pctList.hp || []).reduce((s, p) => s + Math.floor(baseHp * (p / 100)), 0);
        const defPctSum = (pctList.def || []).reduce((s, p) => s + Math.floor(baseDef * (p / 100)), 0);

        out.atk = Math.floor(baseAtk + atkPctSum + postPctFlat.atk);
        out.hp = Math.floor(baseHp + hpPctSum + postPctFlat.hp);
        out.def = Math.floor(baseDef + defPctSum + postPctFlat.def);
        return out;
    }
    function renderMainStatsFrom(char, weaponOrNull, echoStatsArr) {
        const merged = computeStatsWithBonuses(char, weaponOrNull, echoStatsArr || []);
        updateStats({ ...char, stats: merged });
    }
    function getAllEchoBonuses() {
        const out = []; currentEchoes.forEach(e => { out.push(...composeEchoStats(e), ...(ECHO_COST_BONUS[e?.cost] || [])); });
        out.push(...getActiveSetBonuses());
        out.push(...getEchoTypeBonuses());
        return out;
    }

    // DOM refs ------------------------------------------------------------------
    const charNameElement = document.getElementById("charName");
    const characterDropdown = document.getElementById("characterDropdown");
    const bgImg = document.querySelector(".resonator-bg");
    const profileImg = document.querySelector(".details-profile");
    const elementImg = document.querySelector("#resElem .details-icon");
    const elementName = document.querySelector("#resElem h2");
    const rarityImg = document.querySelector(".details-stars");
    const tierImg = document.querySelector("#resTiers .details-icon");
    const tierName = document.querySelector("#resTiers h2");
    const resonatorBasicsGrid = document.querySelector('.saved .details-grid');

    const dropdownSelected = document.getElementById("dropdownSelected");
    const dropdownOptions = document.getElementById("dropdownOptions");
    const weaponDropdownSelected = document.getElementById("weaponDropdownSelected");
    const weaponDropdownOptions = document.getElementById("weaponDropdownOptions");
    const weaponDropdownHidden = document.getElementById("weaponDropdown");
    const weaponImg = document.querySelector(".resonator-weapon__img");
    const weaponName = document.querySelector(".weapon-details h3");
    const weaponStats = document.querySelector(".weapon-stats");

    const characterSelectedUI = setupChevron(dropdownSelected);
    const weaponSelectedUI = setupChevron(weaponDropdownSelected);

    // Init stat icons
    function initStatIcons() {
        Object.keys(statIds).forEach(key => {
            const valueEl = document.getElementById(statIds[key]); if (!valueEl) return;
            const wrapper = valueEl.closest(".resonator-stat");
            const iconEl = wrapper?.querySelector(".stat-icon");
            if (iconEl) { iconEl.src = statIcons[key] || "images/stats/unknown.png"; iconEl.alt = key; }
        });
        const elemIconEl = document.getElementById("stat-elemental-icon");
        const elemNameEl = document.getElementById("stat-elemental-name");
        if (elemIconEl) { elemIconEl.src = "images/stats/unknown.png"; elemIconEl.alt = "Element"; }
        if (elemNameEl) { elemNameEl.textContent = "Element DMG"; }
    }

    // Weapon UI
    function clearWeaponDetailsGrid() {
        const grid = document.getElementById("weaponDetailsGrid"); if (grid) grid.style.display = "none";
        const ph = document.getElementById("weaponDetailsPlaceholder"); if (ph) ph.style.display = "block";
        ["1", "2"].forEach(i => {
            const icon = document.getElementById(`weaponStat${i}Icon`);
            const label = document.getElementById(`weaponStat${i}Label`);
            const value = document.getElementById(`weaponStat${i}Value`);
            const wrap = document.getElementById(`weaponStat${i}`);
            if (icon) { icon.src = ""; icon.alt = ""; } if (label) label.textContent = "—"; if (value) value.textContent = "—"; if (wrap) wrap.style.display = "none";
        });
    }
    function renderWeaponDetailsGrid(weapon) {
        clearWeaponDetailsGrid(); if (!weapon || !Array.isArray(weapon.stats) || weapon.stats.length === 0) return;
        const grid = document.getElementById("weaponDetailsGrid");
        const ph = document.getElementById("weaponDetailsPlaceholder");
        if (grid) grid.style.display = "grid"; if (ph) ph.style.display = "none";
        const s1 = weapon.stats[0]; if (s1) {
            const wrap = document.getElementById("weaponStat1");
            const icon = document.getElementById("weaponStat1Icon");
            const label = document.getElementById("weaponStat1Label");
            const value = document.getElementById("weaponStat1Value");
            if (wrap) wrap.style.display = "flex";
            if (icon) { icon.src = iconFor(s1.key); icon.alt = labelFor(s1.key); }
            if (label) label.textContent = labelFor(s1.key);
            if (value) value.textContent = formatWeaponStatValue(s1.key, s1.value);
        }
        const s2 = weapon.stats[1]; if (s2) {
            const wrap = document.getElementById("weaponStat2");
            const icon = document.getElementById("weaponStat2Icon");
            const label = document.getElementById("weaponStat2Label");
            const value = document.getElementById("weaponStat2Value");
            if (wrap) wrap.style.display = "flex";
            if (icon) { icon.src = iconFor(s2.key); icon.alt = labelFor(s2.key); }
            if (label) label.textContent = labelFor(s2.key);
            if (value) value.textContent = formatWeaponStatValue(s2.key, s2.value);
        }
    }
    function populateWeaponDetails(weapon) {
        if (weaponImg) { weaponImg.src = weapon.image; weaponImg.alt = weapon.name; }
        if (weaponName) weaponName.textContent = weapon.name;
        if (weaponStats) {
            weaponStats.innerHTML = ""; weapon.stats.forEach(stat => {
                const chip = document.createElement("div"); chip.classList.add("stat-chip");
                const ic = document.createElement("img"); ic.classList.add("stat-icon"); ic.src = iconFor(stat.key); ic.alt = labelFor(stat.key);
                const val = document.createElement("h2"); val.textContent = formatWeaponStatValue(stat.key, stat.value);
                chip.appendChild(ic); chip.appendChild(val); weaponStats.appendChild(chip);
            });
        }
        renderWeaponDetailsGrid(weapon);
    }
    function populateWeaponDropdown(character) {
        const list = weaponsByType[character.weaponType] || [];
        weaponDropdownHidden.innerHTML = ""; weaponDropdownOptions.innerHTML = "";
        if (weaponSelectedUI.label) { weaponSelectedUI.label.innerHTML = "<span>Select Weapon</span>"; }
        list.forEach((weapon, index) => {
            const option = document.createElement("option"); option.value = index; option.textContent = weapon.name; weaponDropdownHidden.appendChild(option);
            const row = document.createElement("div"); row.classList.add("dropdown-option"); row.dataset.index = index;
            const img = document.createElement("img"); img.src = weapon.image; img.alt = weapon.name;
            const span = document.createElement("span"); span.textContent = weapon.name;
            row.appendChild(img); row.appendChild(span);
            row.addEventListener("click", (ev) => {
                ev.stopPropagation();
                if (weaponSelectedUI.label) { weaponSelectedUI.label.innerHTML = ""; const selectedImg = img.cloneNode(); const selectedSpan = document.createElement("span"); selectedSpan.textContent = weapon.name; weaponSelectedUI.label.appendChild(selectedImg); weaponSelectedUI.label.appendChild(selectedSpan); }
                weaponDropdownOptions.classList.add("hidden"); weaponDropdownSelected.classList.remove("open");
                weaponDropdownHidden.value = index; weaponDropdownHidden.dispatchEvent(new Event("change"));
            });
            weaponDropdownOptions.appendChild(row);
        });
        clearWeaponDetailsGrid();
    }

    // Placeholder + stats UI
    function showPlaceholder() {
        const bg = document.querySelector(".resonator-bg");
        bg.src = "images/backgrounds/placeholder-background.webp"; bg.alt = "Placeholder Background"; bg.classList.add("placeholder");
        profileImg.style.opacity = 0; profileImg.style.display = "none"; profileImg.removeAttribute("src"); profileImg.removeAttribute("alt");
        charNameElement.style.display = "none"; charNameElement.textContent = "Select Resonator";
        elementImg.style.display = "none"; elementImg.removeAttribute("src"); elementImg.removeAttribute("alt"); elementName.textContent = "-";
        tierImg.style.display = "none"; tierImg.removeAttribute("src"); tierImg.removeAttribute("alt"); tierName.textContent = "-";
        rarityImg.style.display = "none"; rarityImg.src = ""; rarityImg.alt = "No rarity";
        document.documentElement.style.setProperty("--color1", "#484848");
        document.documentElement.style.setProperty("--color2", "#373737");
        document.documentElement.style.setProperty("--color1-rgb", "72, 72, 72");
        document.documentElement.style.setProperty("--color2-rgb", "55, 55, 55");
        if (characterSelectedUI.label) { characterSelectedUI.label.innerHTML = "<span>Select your resonator</span>"; }
        if (weaponSelectedUI.label) { weaponSelectedUI.label.innerHTML = "<span>Select Weapon</span>"; }
        // Hide basic resonator info grid until a character is chosen
        if (resonatorBasicsGrid) resonatorBasicsGrid.style.display = 'none';
        // Disable weapon selector and echo tiles until a character is chosen
        weaponDropdownSelected?.classList.add('disabled');
        const tiles = document.getElementById('echoTiles'); if (tiles) tiles.classList.add('disabled');
        clearWeaponDetailsGrid(); initStatIcons(); renderEchoSetBonusesPanel(); resetEchoBuilders();
    }
    function updateStats(char) {
        const stats = char.stats || {};
        for (const key in statIds) {
            const elemId = statIds[key]; const statElem = document.getElementById(elemId); if (!statElem) continue;
            let value = stats[key] || 0; if (PCT_KEYS.includes(key)) value = value + "%"; statElem.textContent = value;
            const wrapper = statElem.closest(".resonator-stat"); const iconElem = wrapper?.querySelector(".stat-icon");
            if (iconElem && statIcons[key]) { iconElem.src = statIcons[key]; iconElem.alt = key; }
        }
        const elementKey = (char.element?.name?.toLowerCase() || "") + "dmg";
        const elemVal = stats[elementKey] || 0;
        const elemValueEl = document.getElementById("stat-elemental-value");
        const elemNameEl = document.getElementById("stat-elemental-name");
        const elemIconEl = document.getElementById("stat-elemental-icon");
        if (elemValueEl) elemValueEl.textContent = elemVal + "%";
        if (elemNameEl) elemNameEl.textContent = (char.element?.name || "Element") + " DMG";
        if (elemIconEl) { elemIconEl.src = char.element?.image || "images/stats/unknown.png"; elemIconEl.alt = char.element?.name || "Element"; }
    }

    // Resonator dropdown
    const dropdownSelectedEl = dropdownSelected;
    const dropdownOptionsEl = dropdownOptions;

    resonators.forEach((char, index) => {
        const opt = document.createElement("option"); opt.value = index; opt.textContent = char.name; characterDropdown.appendChild(opt);
        const row = document.createElement("div"); row.classList.add("dropdown-option");
        const img = document.createElement("img"); img.src = char.profile || "images/resonators/placeholder.webp"; img.alt = char.name;
        const span = document.createElement("span"); span.textContent = char.name;
        row.appendChild(img); row.appendChild(span);
        row.addEventListener("click", () => {
            if (characterSelectedUI.label) { characterSelectedUI.label.innerHTML = ""; const selectedImg = img.cloneNode(); const selectedSpan = document.createElement("span"); selectedSpan.textContent = char.name; characterSelectedUI.label.appendChild(selectedImg); characterSelectedUI.label.appendChild(selectedSpan); }
            dropdownOptionsEl.classList.add("hidden"); dropdownSelectedEl.classList.remove("open");
            characterDropdown.value = index; characterDropdown.dispatchEvent(new Event("change"));
        });
        dropdownOptionsEl.appendChild(row);
    });

    // Selection state
    let currentCharacter = null, currentWeapon = null;

    weaponDropdownHidden.addEventListener("change", (e) => {
        if (!currentCharacter) return;
        const weaponIndex = e.target.value;
        const weapon = weaponsByType[currentCharacter.weaponType][weaponIndex];
        currentWeapon = weapon; populateWeaponDetails(weapon);
        renderMainStatsFrom(currentCharacter, currentWeapon, getAllEchoBonuses());
        // Persist weapon selection per resonator
        persistWeaponFor(currentCharacter, parseInt(weaponIndex, 10));
    });

    // Init
    initStatIcons(); renderEchoTiles(); showPlaceholder();

    characterDropdown.addEventListener("change", (e) => {
        const charIndex = e.target.value;
        if (charIndex === "") { showPlaceholder(); return; }
        const char = resonators[charIndex]; currentCharacter = char; currentWeapon = null;
        bgImg.classList.remove("placeholder"); bgImg.src = char.background; bgImg.alt = `${char.name} Background`;
        profileImg.style.display = "block"; profileImg.src = char.profile; profileImg.alt = `${char.name} Profile`;
        profileImg.style.transition = "opacity 0.5s ease"; setTimeout(() => profileImg.style.opacity = 1, 50);
        profileImg.classList.remove("glow-5star", "glow-4star"); if (char.rarity === 0) profileImg.classList.add("glow-5star"); else if (char.rarity === 1) profileImg.classList.add("glow-4star");
        charNameElement.style.display = "block"; charNameElement.textContent = char.name;
        elementImg.style.display = "block"; elementImg.src = char.element.image || ""; elementImg.alt = char.element.name || "Element"; elementName.textContent = char.element.name || "-";
        const charRarity = rarity[char.rarity]; const charTier = tier[char.tier];
        rarityImg.style.display = "block"; rarityImg.src = charRarity.image; rarityImg.alt = charRarity.name;
        tierImg.style.display = "block"; tierImg.src = charTier.image; tierImg.alt = charTier.name; tierName.textContent = charTier.name;
        // Show the basic resonator info grid now that a character is selected
        if (resonatorBasicsGrid) resonatorBasicsGrid.style.display = 'grid';
        document.documentElement.style.setProperty("--color1", char.color1);
        document.documentElement.style.setProperty("--color2", char.color2);
        document.documentElement.style.setProperty("--color1-rgb", hexToRgb(char.color1));
        document.documentElement.style.setProperty("--color2-rgb", hexToRgb(char.color2));
        clearWeaponDetailsGrid(); populateWeaponDropdown(char); resetEchoBuilders(); renderEchoSetBonusesPanel();
        renderMainStatsFrom(currentCharacter, null, []);
        // Persist selected resonator and rehydrate any saved build for it
        persistSelectedChar(currentCharacter);
        rehydrateForCharacter(currentCharacter);
        // Re-enable weapon selector and echo tiles
        weaponDropdownSelected?.classList.remove('disabled');
        const tiles = document.getElementById('echoTiles'); if (tiles) tiles.classList.remove('disabled');
    });

    // Character/weapon dropdown toggles
    dropdownSelected?.addEventListener("click", (e) => { e.stopPropagation(); dropdownOptions.classList.toggle("hidden"); dropdownSelected.classList.toggle("open"); });
    weaponDropdownSelected?.addEventListener("click", (e) => {
        if (!currentCharacter || weaponDropdownSelected.classList.contains('disabled')) return;
        e.stopPropagation(); weaponDropdownOptions.classList.toggle("hidden"); weaponDropdownSelected.classList.toggle("open");
    });

    // Global outside click closes any dropdown
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".custom-dropdown")) {
            document.querySelectorAll(".dropdown-options").forEach(el => el.classList.add("hidden"));
            document.querySelectorAll(".dropdown-selected.open").forEach(el => el.classList.remove("open"));
        }
    });

    // Attempt to restore previous session from cookies
    restoreOnLoad();

    // --- Echo Modal: open/close/save ------------------------------------------
    function refreshMainDropdownForCost(cost, preferKey = "") {
        const allowed = getAllowedMainKeys(cost); if (!allowed.length) return;
        rebuildCustomDropdown("echoMainDropdownSelected", "echoMainDropdownOptions", "echoMainKey", allowed);
        const mainKeyEl = document.getElementById("echoMainKey"); if (!mainKeyEl) return;
        if (preferKey && allowed.includes(preferKey)) {
            mainKeyEl.value = preferKey; setCustomDropdownLabel("echoMainDropdownSelected", preferKey); setMainStatValueFromSelection();
        } else {
            mainKeyEl.value = ""; setCustomDropdownLabel("echoMainDropdownSelected", "");
            const mv = document.getElementById("echoMainVal"); if (mv) { mv.value = ""; mv.classList.add('disabled'); }
            const mu = document.getElementById("echoMainValUnit"); if (mu) mu.textContent = "";
        }
    }

    function openEchoModal(slot) {
        activeEchoSlot = slot;
        initEchoModalDropdowns(); initEchoSetDropdown();

        const data = currentEchoes[slot - 1] || { cost: 4, setId: "", typeId: "", main: { key: "", value: "" }, subs: [] };

        setSelectedEchoCost(data.cost ?? 4);

        const mainKeyEl = document.getElementById("echoMainKey");
        const mainValEl = document.getElementById("echoMainVal");
        if (mainKeyEl) mainKeyEl.value = data.main?.key || "";
        if (mainValEl) { mainValEl.value = data.main?.value ?? ""; mainValEl.classList.toggle('disabled', !(data.main?.key)); }

        for (let i = 1; i <= 5; i++) {
            const kEl = document.getElementById(`echoSub${i}Key`);
            const vEl = document.getElementById(`echoSub${i}Val`);
            if (kEl) kEl.value = data.subs?.[i - 1]?.key || "";
            if (vEl) vEl.value = data.subs?.[i - 1]?.value ?? "";
        }

        setCustomDropdownLabel("echoMainDropdownSelected", data.main?.key || "");
        for (let i = 1; i <= 5; i++) { setCustomDropdownLabel(`echoSub${i}DropdownSelected`, data.subs?.[i - 1]?.key || ""); }

        // Make value dropdowns reflect the chosen sub keys
        for (let i = 1; i <= 5; i++) {
            const k = document.getElementById(`echoSub${i}Key`)?.value || "";
            const v = document.getElementById(`echoSub${i}Val`)?.value || "";
            const values = SUBSTAT_VALUES[k] || [];
            populateSubValueDropdown(i, values, v);   // <-- fixed to use k and custom dropdown
            const wrap = document.getElementById(`echoSub${i}ValWrapper`);
            if (wrap) {
                wrap.classList.toggle('disabled', !k);
                wrap.classList.toggle('pct', !!k && PCT_KEYS.includes(k));
                const selectedDiv = document.getElementById(`echoSub${i}ValSelected`);
                let unitEl = selectedDiv?.querySelector('.echo-unit');
                if (!unitEl) { unitEl = document.createElement('span'); unitEl.className = 'echo-unit'; selectedDiv?.appendChild(unitEl); }
                if (selectedDiv) unitEl.textContent = (wrap.classList.contains('pct') && v) ? '%' : '';
            }
        }
        updateSubKeyDuplicateDisables();

        // Set selector
        const setSel = document.getElementById("echoSetKey"); if (setSel) setSel.value = data.setId || ""; setEchoSetDropdownLabel(data.setId || "");

        // Cost-dependent pieces
        const cost = getSelectedEchoCost();
        refreshMainDropdownForCost(cost, document.getElementById("echoMainKey").value);
        setMainStatValueFromSelection();
        renderEchoCostBonusPreview(cost);

        // Type dropdown (typeahead)
        const chosenSetId = document.getElementById("echoSetKey")?.value || "";
        populateEchoTypeDropdown({ cost, setId: chosenSetId, activeSlot: slot });

        // Load saved type (also mirror to text input)
        const typeSel = document.getElementById("echoTypeKey");
        const typeInput = document.getElementById("echoTypeSearchInput");
        if (typeSel) { typeSel.value = data.typeId || ""; }
        if (typeInput) {
            typeInput.value = (data.typeId && ECHO_TYPES[data.typeId]?.name) ? ECHO_TYPES[data.typeId].name : "";
        }

        // Title + open
        const title = document.getElementById("echoModalTitle"); if (title) title.textContent = `Edit Echo ${slot}`;
        const modal = document.getElementById("echoModal"); modal?.classList.add("open"); modal?.setAttribute("aria-hidden", "false");
    }

    function closeEchoModal() {
        const modal = document.getElementById("echoModal");
        modal?.classList.remove("open"); modal?.setAttribute("aria-hidden", "true");
        activeEchoSlot = null;
    }

    function saveEchoFromModal() {
        if (!activeEchoSlot) return; const slot = activeEchoSlot;

        const typeId = document.getElementById("echoTypeKey")?.value || "";
        const cost = getSelectedEchoCost();
        const mainKey = document.getElementById("echoMainKey")?.value || "";
        const mainVal = parseNumber(document.getElementById("echoMainVal")?.value || 0);
        const setId = document.getElementById("echoSetKey")?.value || "";
        const subs = [];
        const seen = new Set();
        for (let i = 1; i <= 5; i++) {
            const k = document.getElementById(`echoSub${i}Key`)?.value || "";
            const vStr = document.getElementById(`echoSub${i}Val`)?.value || "";
            if (!k && !vStr) continue;
            if (!k || !vStr) { alert(`Sub ${i}: pick both a stat and a value.`); return; }
            if (seen.has(k)) { alert(`Duplicate sub stat "${labelFor(k)}" is not allowed.`); return; }
            seen.add(k); subs.push({ key: k, value: parseNumber(vStr) });
        }

        currentEchoes[slot - 1] = { cost, setId, typeId, main: { key: mainKey, value: mainVal }, subs };
        renderEchoCost();
        if (currentCharacter) renderMainStatsFrom(currentCharacter, currentWeapon, getAllEchoBonuses());
        renderEchoTiles(); renderEchoSetBonusesPanel();
        // Persist echoes per resonator
        if (currentCharacter) persistEchoesFor(currentCharacter, currentEchoes);
        closeEchoModal();
    }

    function clearEchoInModal() {
        setSelectedEchoCost(4);
        const mainKeyEl = document.getElementById("echoMainKey"); if (mainKeyEl) mainKeyEl.value = "";
        const mainValEl = document.getElementById("echoMainVal"); if (mainValEl) { mainValEl.value = ""; mainValEl.classList.add('disabled'); }
        const mainUnitEl = document.getElementById("echoMainValUnit"); if (mainUnitEl) mainUnitEl.textContent = "";
        for (let i = 1; i <= 5; i++) {
            const kEl = document.getElementById(`echoSub${i}Key`); if (kEl) kEl.value = "";
            const vEl = document.getElementById(`echoSub${i}Val`); if (vEl) vEl.value = "";
            const valSel = document.getElementById(`echoSub${i}Val`); if (valSel) valSel.innerHTML = '<option value="">—</option>';
            setCustomDropdownLabel(`echoSub${i}DropdownSelected`, "");
            // also reset custom value dropdown label
            const valSelected = document.getElementById(`echoSub${i}ValSelected`);
            const valOptions = document.getElementById(`echoSub${i}ValOptions`);
            if (valSelected) {
                valSelected.innerHTML = '<div class="dropdown-label">—</div>';
                const unitEl = valSelected.querySelector('.echo-unit'); if (unitEl) unitEl.textContent = '';
            }
            if (valOptions) valOptions.innerHTML = "";
            const wrap = document.getElementById(`echoSub${i}ValWrapper`); if (wrap) wrap.classList.add('disabled');
        }
        setCustomDropdownLabel("echoMainDropdownSelected", "");
        updateSubKeyDuplicateDisables();
        const setSel = document.getElementById("echoSetKey"); if (setSel) setSel.value = ""; setEchoSetDropdownLabel("");
        const typeSel = document.getElementById("echoTypeKey"); if (typeSel) typeSel.value = "";
        const typeInput = document.getElementById("echoTypeSearchInput"); if (typeInput) typeInput.value = "";
        renderEchoCostBonusPreview(4);
    }

    // Wire modal buttons + dynamic handlers
    (function initEchoModalWiring() {
        const modal = document.getElementById("echoModal");
        document.getElementById("echoModalSave")?.addEventListener("click", saveEchoFromModal);
        document.getElementById("echoModalCancel")?.addEventListener("click", closeEchoModal);
        document.getElementById("echoModalClose")?.addEventListener("click", closeEchoModal);
        document.getElementById("echoModalClear")?.addEventListener("click", clearEchoInModal);
        document.getElementById("echoMainKey")?.addEventListener("change", setMainStatValueFromSelection);
        modal?.querySelector("[data-close]")?.addEventListener("click", closeEchoModal);
        document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal?.classList.contains("open")) closeEchoModal(); });

        // Cost radio changes
        onEchoCostChange(() => {
            const cost = getSelectedEchoCost();
            refreshMainDropdownForCost(cost, document.getElementById("echoMainKey").value);
            setMainStatValueFromSelection();
            renderEchoCostBonusPreview(cost);
            const setIdNow = document.getElementById("echoSetKey")?.value || "";
            populateEchoTypeDropdown({ cost, setId: setIdNow, activeSlot: activeEchoSlot });
        });

        // Set change -> repopulate types for current cost
        document.getElementById("echoSetKey")?.addEventListener("change", () => {
            const c = getSelectedEchoCost();
            const s = document.getElementById("echoSetKey")?.value || "";
            populateEchoTypeDropdown({ cost: c, setId: s, activeSlot: activeEchoSlot });
        });

        // Sub key change handlers (once)
        for (let i = 1; i <= 5; i++) {
            const keySel = document.getElementById(`echoSub${i}Key`);
            if (keySel && !keySel.dataset.subKeyWired) {
                keySel.addEventListener("change", onSubKeyChangeFactory(i));
                keySel.dataset.subKeyWired = "1";
            }
        }
    })();

    function resetEchoBuilders() { currentEchoes = [null, null, null, null, null]; renderEchoTiles(); renderEchoCost(); renderEchoSetBonusesPanel(); }

    // Expose (optional)
    window._echoModal = { open: openEchoModal, close: closeEchoModal, save: saveEchoFromModal };
});


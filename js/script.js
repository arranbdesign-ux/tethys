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
        // for % keys
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
            stats: {
                hp: 10300, atk: 463, def: 1112, er: 100, cr: 5, cd: 150,
                basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0,
                aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0
            }
        },
        {
            name: "Carlotta", color1: "#AA01A4", color2: "#6D6D6D",
            profile: "images/resonators/carlotta.webp",
            background: "images/backgrounds/carlotta-splash.webp",
            element: elements[3], weaponType: "Pistols", rarity: 0, tier: 0,
            minorFortes: [{ key: "atkp", value: 12 }, { key: "cr", value: 8 }],
            stats: {
                hp: 12450, atk: 463, def: 1198, er: 100, cr: 5, cd: 150,
                basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0,
                aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0
            }
        },
        {
            name: "Danjin", color1: "#860124", color2: "#AA01A4",
            profile: "images/resonators/danjin.webp",
            background: "images/backgrounds/danjin-splash.jpg",
            element: elements[4], weaponType: "Sword", rarity: 1, tier: 1,
            minorFortes: [{ key: "atkp", value: 12 }, { key: "havocdmg", value: 12 }],
            stats: {
                hp: 9438, atk: 263, def: 1149, er: 100, cr: 5, cd: 150,
                basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0,
                aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0
            }
        },
        {
            name: "Phrolova", color1: "#860124", color2: "#602738",
            profile: "images/resonators/phrolova.webp",
            background: "images/backgrounds/phrolova-splash.webp",
            element: elements[4], weaponType: "Rectifier", rarity: 0, tier: 1,
            minorFortes: [{ key: "atkp", value: 12 }, { key: "cr", value: 8 }],
            stats: {
                hp: 10775, atk: 438, def: 1137, er: 100, cr: 5, cd: 150,
                basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0,
                aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0
            }
        },
        {
            name: "Shorekeeper", color1: "#011AAA", color2: "#5A5341",
            profile: "images/resonators/shorekeeper.webp",
            background: "images/backgrounds/shorekeeper-splash.webp",
            element: elements[5], weaponType: "Rectifier", rarity: 0, tier: 0,
            minorFortes: [{ key: "hpp", value: 12 }, { key: "healing", value: 12 }],
            stats: {
                hp: 16713, atk: 288, def: 1100, er: 100, cr: 5, cd: 150,
                basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0,
                aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0
            }
        },
        {
            name: "Zani", color1: "#FFE5AD", color2: "#C20003",
            profile: "images/resonators/zani.webp",
            background: "images/backgrounds/zani-splash.webp",
            element: elements[5], weaponType: "Gauntlets", rarity: 0, tier: 0,
            minorFortes: [{ key: "atkp", value: 12 }, { key: "cr", value: 8 }],
            stats: {
                hp: 10775, atk: 438, def: 1137, er: 100, cr: 5, cd: 150,
                basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0,
                aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0
            }
        }
    ];

    // --- Helpers --------------------------------------------------------------
    function labelFor(key) { return STAT_LABELS[key] || key.toUpperCase(); }
    function iconFor(key) { return statIcons[key] || "images/stats/unknown.png"; }
    function hexToRgb(hex) { hex = hex.replace(/^#/, ""); const n = parseInt(hex, 16); return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`; }

    // Chevron helpers
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
        selectedEl.appendChild(label);
        selectedEl.appendChild(chevron);
        return { label, chevron };
    }

    // Percent-suffixed keys
    const PCT_KEYS = ["atkp", "hpp", "defp", "cr", "cd", "er", "basicdmg", "skilldmg", "heavydmg", "libdmg", "havocdmg", "healing"];
    const WEAPON_PERCENT_KEYS = ["atkp", "hpp", "defp", "cr", "cd", "er"];
    function formatWeaponStatValue(key, value) {
        if (value == null || value === "") return "—";
        if (typeof value !== "number") return String(value);
        return WEAPON_PERCENT_KEYS.includes(key) ? `${value}%` : `${value}`;
    }
    function parseNumber(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }

    // ADD: WuWa-style integer floor
    function floorInt(x) { return Math.floor(Number(x) || 0); }

    // ADD: split weapon's base ATK from other bonuses
    function splitWeaponStats(weapon) {
        if (!weapon || !Array.isArray(weapon.stats)) return { weaponBaseAtk: 0, other: [] };
        let weaponBaseAtk = 0;
        const other = [];
        for (const ent of weapon.stats) {
            if (ent.key === "atk" && typeof ent.value === "number") {
                // Treat this as weapon BASE ATK contribution, not a flat bonus
                weaponBaseAtk += ent.value;
            } else {
                other.push(ent);
            }
        }
        return { weaponBaseAtk, other };
    }


    // ADD: cost-based flat bonuses per-echo
    const ECHO_COST_BONUS = {
        4: [{ key: "atk", value: 150 }],
        3: [{ key: "atk", value: 100 }],
        1: [{ key: "hp", value: 2280 }],
    };

    // ADD: per-echo helper
    function costBonusesForEcho(echo) {
        if (!echo || !echo.cost) return [];
        return ECHO_COST_BONUS[echo.cost] || [];
    }

    // ADD: flatten user-entered stats + cost bonuses for all echoes
    function getAllEchoBonuses() {
        const out = [];
        currentEchoes.forEach(e => {
            out.push(...composeEchoStats(e), ...costBonusesForEcho(e));
        });
        return out;
    }

    // ADD: pretty text for modal preview
    function costBonusText(cost) {
        const arr = ECHO_COST_BONUS[cost] || [];
        if (!arr.length) return "No cost bonus";
        return arr.map(b => `+${b.value} ${labelFor(b.key)}`).join("  •  ");
    }

    // ADD: render preview line in modal
    function renderEchoCostBonusPreview(costVal) {
        const el = document.getElementById("echoCostBonus");
        if (!el) return;
        const num = parseInt(costVal, 10);
        el.textContent = `Cost bonus: ${costBonusText(num)}`;
    }

    // --- Modal Custom Dropdown Builder ----------------------------------------
    function setupCustomDropdown(wrapperId, hiddenSelectId, optionsId, selectedId, statKeys) {
        const hiddenSelect = document.getElementById(hiddenSelectId);
        const optionsDiv = document.getElementById(optionsId);
        const selectedDiv = document.getElementById(selectedId);
        if (!hiddenSelect || !optionsDiv || !selectedDiv) return; // allow fallback

        setupChevron(selectedDiv);

        if (!selectedDiv.dataset.filled) {
            hiddenSelect.innerHTML = "";
            optionsDiv.innerHTML = "";

            statKeys.forEach((k) => {
                const opt = document.createElement("option");
                opt.value = k;
                opt.textContent = labelFor(k);
                hiddenSelect.appendChild(opt);

                const optDiv = document.createElement("div");
                optDiv.classList.add("dropdown-option");
                optDiv.dataset.value = k;

                const img = document.createElement("img");
                img.src = iconFor(k);
                img.alt = labelFor(k);

                const span = document.createElement("span");
                span.textContent = labelFor(k);

                optDiv.appendChild(img);
                optDiv.appendChild(span);

                optDiv.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const label = selectedDiv.querySelector(".dropdown-label");
                    if (label) {
                        label.innerHTML = "";
                        label.appendChild(img.cloneNode());
                        label.appendChild(document.createTextNode(labelFor(k)));
                    }
                    optionsDiv.classList.add("hidden");
                    selectedDiv.classList.remove("open");
                    hiddenSelect.value = k;
                    hiddenSelect.dispatchEvent(new Event("change"));
                });

                optionsDiv.appendChild(optDiv);
            });

            selectedDiv.addEventListener("click", (e) => {
                e.stopPropagation();
                // close any other open dropdowns first
                document.querySelectorAll(".dropdown-selected.open").forEach(el => {
                    if (el !== selectedDiv) el.classList.remove("open");
                });
                document.querySelectorAll(".dropdown-options:not(.hidden)").forEach(el => {
                    if (el !== optionsDiv) el.classList.add("hidden");
                });
                optionsDiv.classList.toggle("hidden");
                selectedDiv.classList.toggle("open");
            });

            selectedDiv.dataset.filled = "1";
        }
    }
    function initEchoModalDropdowns() {
        const keys = Object.keys(statIcons);
        setupCustomDropdown("echoMainDropdownWrapper", "echoMainKey", "echoMainDropdownOptions", "echoMainDropdownSelected", keys);
        for (let i = 1; i <= 5; i++) {
            setupCustomDropdown(`echoSub${i}DropdownWrapper`, `echoSub${i}Key`, `echoSub${i}DropdownOptions`, `echoSub${i}DropdownSelected`, keys);
        }
    }
    function setCustomDropdownLabel(selectedId, valueKey) {
        const selectedDiv = document.getElementById(selectedId);
        if (!selectedDiv) return;
        const label = selectedDiv.querySelector(".dropdown-label");
        if (!label) return;
        if (!valueKey) { label.innerHTML = "<span>Select</span>"; return; }
        const img = document.createElement("img");
        img.src = iconFor(valueKey);
        img.alt = labelFor(valueKey);
        label.innerHTML = "";
        label.appendChild(img);
        label.appendChild(document.createTextNode(labelFor(valueKey)));
    }

    // --- Echo Builder (Modal UX) ----------------------------------------------
    let currentEchoes = [null, null, null, null, null];
    const ECHO_COST_CAP = 12;

    function computeTotalEchoCost() { return currentEchoes.reduce((s, e) => s + (e?.cost || 0), 0); }
    function renderEchoCost() {
        const el = document.getElementById("echoCostVal"); if (!el) return;
        const total = computeTotalEchoCost(); el.textContent = total;
        if (total > ECHO_COST_CAP) el.classList.add("over"); else el.classList.remove("over");
    }

    function composeEchoStats(e) {
        if (!e) return [];
        const out = [];
        if (e.main?.key) out.push({ key: e.main.key, value: parseNumber(e.main.value) });
        (e.subs || []).forEach(s => { if (s?.key) out.push({ key: s.key, value: parseNumber(s.value) }); });
        return out;
    }

    function renderEchoTiles() {
        const wrap = document.getElementById("echoTiles"); if (!wrap) return;
        wrap.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            const slot = i + 1; const data = currentEchoes[i];

            const tile = document.createElement("div"); tile.className = "echo-tile"; tile.dataset.slot = String(slot);
            const thumb = document.createElement("div"); thumb.className = "echo-tile__thumb";
            const ico = document.createElement("img"); ico.src = "images/stats/unknown.png"; ico.alt = "Echo"; thumb.appendChild(ico);
            const meta = document.createElement("div"); meta.className = "echo-tile__meta";

            if (!data) {
                const title = document.createElement("div"); title.className = "echo-tile__title"; title.textContent = `Add Echo ${slot}`;
                const hint = document.createElement("div"); hint.className = "light"; hint.textContent = "Click to set cost & stats";
                meta.appendChild(title); meta.appendChild(hint);
            } else {
                const title = document.createElement("div"); title.className = "echo-tile__title"; title.textContent = `Echo ${slot} — Cost ${data.cost || 0}`;
                const stats = document.createElement("div"); stats.className = "echo-tile__stats";

                if (data.main?.key) {
                    const chip = document.createElement("div"); chip.className = "stat-chip";
                    const ic = document.createElement("img"); ic.className = "stat-icon small"; ic.src = iconFor(data.main.key); ic.alt = labelFor(data.main.key);
                    const nameEl = document.createElement("span"); nameEl.className = "stat-chip__name"; nameEl.textContent = `Main • ${labelFor(data.main.key)}`;
                    const valEl = document.createElement("span"); valEl.className = "stat-chip__value";
                    valEl.textContent = PCT_KEYS.includes(data.main.key) ? `${parseNumber(data.main.value)}%` : `${parseNumber(data.main.value)}`;
                    chip.appendChild(ic); chip.appendChild(nameEl); chip.appendChild(valEl); stats.appendChild(chip);
                }
                (data.subs || []).forEach(s => {
                    if (!s?.key) return;
                    const chip = document.createElement("div"); chip.className = "stat-chip";
                    const ic = document.createElement("img"); ic.className = "stat-icon small"; ic.src = iconFor(s.key); ic.alt = labelFor(s.key);
                    const nameEl = document.createElement("span"); nameEl.className = "stat-chip__name"; nameEl.textContent = labelFor(s.key);
                    const valEl = document.createElement("span"); valEl.className = "stat-chip__value";
                    valEl.textContent = PCT_KEYS.includes(s.key) ? `${parseNumber(s.value)}%` : `${parseNumber(s.value)}`;
                    chip.appendChild(ic); chip.appendChild(nameEl); chip.appendChild(valEl); stats.appendChild(chip);
                });

                meta.appendChild(title); meta.appendChild(stats);
            }

            tile.appendChild(thumb); tile.appendChild(meta);
            tile.addEventListener("click", () => openEchoModal(slot));
            wrap.appendChild(tile);
        }
    }

    // Modal open/close/save -----------------------------------------------------
    let activeEchoSlot = null;

    function openEchoModal(slot) {
        activeEchoSlot = slot;

        // Try to initialize custom dropdowns (if modal uses custom structure)
        initEchoModalDropdowns();

        const data = currentEchoes[slot - 1] || { cost: 4, main: { key: "", value: "" }, subs: [] };

        // Values into fields (hidden selects always exist in our pattern)
        const costEl = document.getElementById("echoCost");
        if (costEl) costEl.value = String(data.cost ?? 4);

        const mainKeyEl = document.getElementById("echoMainKey");
        const mainValEl = document.getElementById("echoMainVal");
        if (mainKeyEl) mainKeyEl.value = data.main?.key || "";
        if (mainValEl) mainValEl.value = data.main?.value ?? "";

        for (let i = 1; i <= 5; i++) {
            const kEl = document.getElementById(`echoSub${i}Key`);
            const vEl = document.getElementById(`echoSub${i}Val`);
            if (kEl) kEl.value = data.subs?.[i - 1]?.key || "";
            if (vEl) vEl.value = data.subs?.[i - 1]?.value ?? "";
        }

        // Reflect custom dropdown labels (if present)
        setCustomDropdownLabel("echoMainDropdownSelected", data.main?.key || "");
        for (let i = 1; i <= 5; i++) {
            setCustomDropdownLabel(`echoSub${i}DropdownSelected`, data.subs?.[i - 1]?.key || "");
        }

        // ADD: show + live-update cost bonus preview
        renderEchoCostBonusPreview(document.getElementById("echoCost").value);
        document.getElementById("echoCost").onchange = (e) => {
            renderEchoCostBonusPreview(e.target.value);
        };

        const title = document.getElementById("echoModalTitle");
        if (title) title.textContent = `Edit Echo ${slot}`;

        const modal = document.getElementById("echoModal");
        modal?.classList.add("open");
        modal?.setAttribute("aria-hidden", "false");
    }

    function closeEchoModal() {
        const modal = document.getElementById("echoModal");
        modal?.classList.remove("open");
        modal?.setAttribute("aria-hidden", "true");
        activeEchoSlot = null;
    }

    function saveEchoFromModal() {
        if (!activeEchoSlot) return;
        const slot = activeEchoSlot;

        const cost = parseInt(document.getElementById("echoCost")?.value || "0", 10) || 0;
        const mainKey = document.getElementById("echoMainKey")?.value || "";
        const mainVal = parseNumber(document.getElementById("echoMainVal")?.value || 0);

        const subs = [];
        for (let i = 1; i <= 5; i++) {
            const k = document.getElementById(`echoSub${i}Key`)?.value || "";
            const v = parseNumber(document.getElementById(`echoSub${i}Val`)?.value || 0);
            if (k) subs.push({ key: k, value: v });
        }

        currentEchoes[slot - 1] = { cost, main: { key: mainKey, value: mainVal }, subs };

        renderEchoCost();
        if (currentCharacter) {
            renderMainStatsFrom(currentCharacter, currentWeapon, getAllEchoBonuses());
        }
        renderEchoTiles();
        closeEchoModal();
    }

    function clearEchoInModal() {
        const costEl = document.getElementById("echoCost"); if (costEl) costEl.value = "4";
        const mainKeyEl = document.getElementById("echoMainKey"); if (mainKeyEl) mainKeyEl.value = "";
        const mainValEl = document.getElementById("echoMainVal"); if (mainValEl) mainValEl.value = "";
        for (let i = 1; i <= 5; i++) {
            const kEl = document.getElementById(`echoSub${i}Key`); if (kEl) kEl.value = "";
            const vEl = document.getElementById(`echoSub${i}Val`); if (vEl) vEl.value = "";
        }
        // Also reset visible labels on custom dropdowns if present
        setCustomDropdownLabel("echoMainDropdownSelected", "");
        for (let i = 1; i <= 5; i++) {
            setCustomDropdownLabel(`echoSub${i}DropdownSelected`, "");
        }
    }

    (function initEchoModalWiring() {
        const modal = document.getElementById("echoModal");
        document.getElementById("echoModalSave")?.addEventListener("click", saveEchoFromModal);
        document.getElementById("echoModalCancel")?.addEventListener("click", closeEchoModal);
        document.getElementById("echoModalClose")?.addEventListener("click", closeEchoModal);
        document.getElementById("echoModalClear")?.addEventListener("click", clearEchoInModal);
        modal?.querySelector("[data-close]")?.addEventListener("click", closeEchoModal);
        document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal?.classList.contains("open")) closeEchoModal(); });
    })();

    function resetEchoBuilders() { currentEchoes = [null, null, null, null, null]; renderEchoTiles(); renderEchoCost(); }

    // --- Stats computation -----------------------------------------------------
    const PERCENT_TO_BASE = { atkp: "atk", hpp: "hp", defp: "def" };

    function normalizedBaseStats(char) {
        const s = { ...(char?.stats || {}) };
        ["hp", "atk", "def", "er", "cr", "cd", "basicdmg", "skilldmg", "heavydmg", "libdmg", "aerodmg", "electrodmg", "fusiondmg", "glaciodmg", "havocdmg", "spectrodmg", "healing"]
            .forEach(k => { if (typeof s[k] !== "number") s[k] = 0; });
        return s;
    }

    // CHANGE: collect percent sources individually for per-source flooring
    function applyBonusArray(bonuses, postPctFlat, pctList, out) {
        if (!Array.isArray(bonuses)) return;
        for (const { key, value } of bonuses) {
            if (typeof value !== "number") continue;

            // Flats to bases are added AFTER % (WuWa behavior)
            if (key === "atk" || key === "hp" || key === "def") {
                postPctFlat[key] += Math.floor(value); // keep integers
                continue;
            }
            // Percent bases -> push each source into its list (we'll floor per source)
            if (PERCENT_TO_BASE[key]) {
                const baseKey = PERCENT_TO_BASE[key]; // atk / hp / def
                (pctList[baseKey] || (pctList[baseKey] = [])).push(value);
                continue;
            }
            // Everything else stacks additively
            if (key in out) out[key] += value;
        }
    }


    // CHANGE: per-source flooring for atkp/hpp/defp like WuWa
    function computeStatsWithBonuses(char, weapon, echoStatsArr) {
        const base = normalizedBaseStats(char);
        const out = { ...base };

        // Weapon base ATK vs other weapon bonuses
        const { weaponBaseAtk, other: weaponOther } = splitWeaponStats(weapon);

        // Accumulators
        const postPctFlat = { atk: 0, hp: 0, def: 0 };       // flats after %
        const pctList = { atk: [], hp: [], def: [] };    // each % source kept

        // Feed all sources
        applyBonusArray(char?.minorFortes, postPctFlat, pctList, out);
        applyBonusArray(weaponOther, postPctFlat, pctList, out);
        applyBonusArray(echoStatsArr, postPctFlat, pctList, out);

        // Bases used for % calculations
        const baseAtk = base.atk + weaponBaseAtk; // weapon contributes to ATK base
        const baseHp = base.hp;
        const baseDef = base.def;

        // Floor each % source individually (the key change)
        const atkPctSum = (pctList.atk || []).reduce((sum, p) => sum + Math.floor(baseAtk * (p / 100)), 0);
        const hpPctSum = (pctList.hp || []).reduce((sum, p) => sum + Math.floor(baseHp * (p / 100)), 0);
        const defPctSum = (pctList.def || []).reduce((sum, p) => sum + Math.floor(baseDef * (p / 100)), 0);

        // Final: (base + sum_of_floored_%_parts) + flats, then floor to be safe
        out.atk = Math.floor(baseAtk + atkPctSum + postPctFlat.atk);
        out.hp = Math.floor(baseHp + hpPctSum + postPctFlat.hp);
        out.def = Math.floor(baseDef + defPctSum + postPctFlat.def);

        return out;
    }



    function renderMainStatsFrom(char, weaponOrNull, echoStatsArr) {
        const merged = computeStatsWithBonuses(char, weaponOrNull, echoStatsArr || []);
        updateStats({ ...char, stats: merged });
    }

    // --- DOM refs -------------------------------------------------------------
    const charNameElement = document.getElementById("charName");
    const characterDropdown = document.getElementById("characterDropdown");
    const bgImg = document.querySelector(".resonator-bg");
    const profileImg = document.querySelector(".details-profile");
    const elementImg = document.querySelector("#resElem .details-icon");
    const elementName = document.querySelector("#resElem h2");
    const rarityImg = document.querySelector(".details-stars");
    const tierImg = document.querySelector("#resTiers .details-icon");
    const tierName = document.querySelector("#resTiers h2");

    const dropdownSelected = document.getElementById("dropdownSelected");
    const dropdownOptions = document.getElementById("dropdownOptions");

    const weaponDropdownSelected = document.getElementById("weaponDropdownSelected");
    const weaponDropdownOptions = document.getElementById("weaponDropdownOptions");
    const weaponDropdownHidden = document.getElementById("weaponDropdown");

    const weaponImg = document.querySelector(".resonator-weapon__img");
    const weaponName = document.querySelector(".weapon-details h3");
    const weaponStats = document.querySelector(".weapon-stats");

    // Setup chevrons for custom dropdown headers
    const characterSelectedUI = setupChevron(dropdownSelected);
    const weaponSelectedUI = setupChevron(weaponDropdownSelected);

    // Init stat icons
    function initStatIcons() {
        Object.keys(statIds).forEach((key) => {
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

    // Weapon details grid -------------------------------------------------------
    function clearWeaponDetailsGrid() {
        const grid = document.getElementById("weaponDetailsGrid"); if (grid) grid.style.display = "none";
        const ph = document.getElementById("weaponDetailsPlaceholder"); if (ph) ph.style.display = "block";
        ["1", "2"].forEach(i => {
            const wrap = document.getElementById(`weaponStat${i}`);
            const icon = document.getElementById(`weaponStat${i}Icon`);
            const label = document.getElementById(`weaponStat${i}Label`);
            const value = document.getElementById(`weaponStat${i}Value`);
            if (icon) { icon.src = ""; icon.alt = ""; }
            if (label) label.textContent = "—";
            if (value) value.textContent = "—";
            if (wrap) wrap.style.display = "none";
        });
    }
    function renderWeaponDetailsGrid(weapon) {
        clearWeaponDetailsGrid();
        if (!weapon || !Array.isArray(weapon.stats) || weapon.stats.length === 0) return;
        const grid = document.getElementById("weaponDetailsGrid");
        const ph = document.getElementById("weaponDetailsPlaceholder");
        if (grid) grid.style.display = "grid"; if (ph) ph.style.display = "none";

        const s1 = weapon.stats[0];
        if (s1) {
            const wrap = document.getElementById("weaponStat1");
            const icon = document.getElementById("weaponStat1Icon");
            const label = document.getElementById("weaponStat1Label");
            const value = document.getElementById("weaponStat1Value");
            if (wrap) wrap.style.display = "flex";
            if (icon) { icon.src = iconFor(s1.key); icon.alt = labelFor(s1.key); }
            if (label) label.textContent = labelFor(s1.key);
            if (value) value.textContent = formatWeaponStatValue(s1.key, s1.value);
        }
        const s2 = weapon.stats[1];
        if (s2) {
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
            weaponStats.innerHTML = "";
            weapon.stats.forEach(stat => {
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
            const optionDiv = document.createElement("div"); optionDiv.classList.add("dropdown-option"); optionDiv.dataset.index = index;
            const img = document.createElement("img"); img.src = weapon.image; img.alt = weapon.name;
            const span = document.createElement("span"); span.textContent = weapon.name;
            optionDiv.appendChild(img); optionDiv.appendChild(span);
            optionDiv.addEventListener("click", (ev) => {
                ev.stopPropagation();
                if (weaponSelectedUI.label) {
                    weaponSelectedUI.label.innerHTML = "";
                    const selectedImg = img.cloneNode();
                    const selectedSpan = document.createElement("span"); selectedSpan.textContent = weapon.name;
                    weaponSelectedUI.label.appendChild(selectedImg); weaponSelectedUI.label.appendChild(selectedSpan);
                }
                weaponDropdownOptions.classList.add("hidden");
                weaponDropdownSelected.classList.remove("open");
                weaponDropdownHidden.value = index;
                weaponDropdownHidden.dispatchEvent(new Event("change"));
            });
            weaponDropdownOptions.appendChild(optionDiv);
        });
        clearWeaponDetailsGrid();
    }

    // --- Stats + placeholder ---------------------------------------------------
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

        clearWeaponDetailsGrid();
        initStatIcons();
        resetEchoBuilders();
    }

    function updateStats(char) {
        const stats = char.stats || {};
        for (const key in statIds) {
            const elemId = statIds[key];
            const statElem = document.getElementById(elemId); if (!statElem) continue;
            let value = stats[key] || 0;
            if (PCT_KEYS.includes(key)) value = value + "%";
            statElem.textContent = value;

            const wrapper = statElem.closest(".resonator-stat");
            const iconElem = wrapper?.querySelector(".stat-icon");
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

    // --- Resonator dropdown (custom) ------------------------------------------
    resonators.forEach((char, index) => {
        const opt = document.createElement("option"); opt.value = index; opt.textContent = char.name; characterDropdown.appendChild(opt);
        const optDiv = document.createElement("div"); optDiv.classList.add("dropdown-option");
        const img = document.createElement("img"); img.src = char.profile || "images/resonators/placeholder.webp"; img.alt = char.name;
        const span = document.createElement("span"); span.textContent = char.name;
        optDiv.appendChild(img); optDiv.appendChild(span);
        optDiv.addEventListener("click", () => {
            if (characterSelectedUI.label) {
                characterSelectedUI.label.innerHTML = "";
                const selectedImg = img.cloneNode();
                const selectedSpan = document.createElement("span"); selectedSpan.textContent = char.name;
                characterSelectedUI.label.appendChild(selectedImg); characterSelectedUI.label.appendChild(selectedSpan);
            }
            dropdownOptions.classList.add("hidden");
            dropdownSelected.classList.remove("open");
            characterDropdown.value = index;
            characterDropdown.dispatchEvent(new Event("change"));
        });
        dropdownOptions.appendChild(optDiv);
    });

    // --- Selection state -------------------------------------------------------
    let currentCharacter = null;
    let currentWeapon = null;

    weaponDropdownHidden.addEventListener("change", (e) => {
        if (!currentCharacter) return;
        const weaponIndex = e.target.value;
        const weapon = weaponsByType[currentCharacter.weaponType][weaponIndex];
        currentWeapon = weapon;
        populateWeaponDetails(weapon);
        // CHANGE: include cost bonuses
        renderMainStatsFrom(currentCharacter, currentWeapon, getAllEchoBonuses());

    });

    // Initial
    initStatIcons();
    renderEchoTiles();
    showPlaceholder();

    characterDropdown.addEventListener("change", (e) => {
        const charIndex = e.target.value;
        if (charIndex === "") { showPlaceholder(); return; }
        const char = resonators[charIndex];
        currentCharacter = char; currentWeapon = null;

        bgImg.classList.remove("placeholder");
        bgImg.src = char.background; bgImg.alt = `${char.name} Background`;

        profileImg.style.display = "block"; profileImg.src = char.profile; profileImg.alt = `${char.name} Profile`;
        profileImg.style.transition = "opacity 0.5s ease"; setTimeout(() => (profileImg.style.opacity = 1), 50);

        profileImg.classList.remove("glow-5star", "glow-4star");
        if (char.rarity === 0) profileImg.classList.add("glow-5star");
        else if (char.rarity === 1) profileImg.classList.add("glow-4star");

        charNameElement.style.display = "block"; charNameElement.textContent = char.name;

        elementImg.style.display = "block"; elementImg.src = char.element.image || ""; elementImg.alt = char.element.name || "Element";
        elementName.textContent = char.element.name || "-";

        const charRarity = rarity[char.rarity]; const charTier = tier[char.tier];
        rarityImg.style.display = "block"; rarityImg.src = charRarity.image; rarityImg.alt = charRarity.name;
        tierImg.style.display = "block"; tierImg.src = charTier.image; tierImg.alt = charTier.name; tierName.textContent = charTier.name;

        document.documentElement.style.setProperty("--color1", char.color1);
        document.documentElement.style.setProperty("--color2", char.color2);
        document.documentElement.style.setProperty("--color1-rgb", hexToRgb(char.color1));
        document.documentElement.style.setProperty("--color2-rgb", hexToRgb(char.color2));

        clearWeaponDetailsGrid();
        populateWeaponDropdown(char);
        resetEchoBuilders();
        renderMainStatsFrom(currentCharacter, null, []);
    });

    // Dropdown toggles (character + weapon)
    dropdownSelected?.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownOptions.classList.toggle("hidden");
        dropdownSelected.classList.toggle("open");
    });
    weaponDropdownSelected?.addEventListener("click", (e) => {
        e.stopPropagation();
        weaponDropdownOptions.classList.toggle("hidden");
        weaponDropdownSelected.classList.toggle("open");
    });

    // Global outside-click closer (works for ALL dropdowns, including modal)
    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown-options").forEach(el => el.classList.add("hidden"));
        document.querySelectorAll(".dropdown-selected.open").forEach(el => el.classList.remove("open"));
    });

    // Modal buttons are wired in initEchoModalWiring()

    // Expose open/close/save if needed elsewhere (optional):
    window._echoModal = { open: openEchoModal, close: closeEchoModal, save: saveEchoFromModal };
});

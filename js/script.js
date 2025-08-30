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
            {
                name: "Verdant Summit", image: "images/weapons/verdant-summit.webp", stats: [
                    { key: "atk", value: 587 },
                    { key: "cd", value: 48.6 }
                ]
            },
            {
                name: "Lustrous Razor", image: "images/weapons/lustrous-razor.webp", stats: [
                    { key: "atk", value: 587 },
                    { key: "atkp", value: 36.4 }
                ]
            }
        ],
        Pistols: [
            {
                name: "Static Mist", image: "images/weapons/static-mist.webp", stats: [
                    { key: "atk", value: 587 },
                    { key: "cr", value: 24.3 }
                ]
            },
            {
                name: "The Last Dance", image: "images/weapons/the-last-dance.webp", stats: [
                    { key: "atk", value: 500 },
                    { key: "cd", value: 72 }
                ]
            }
        ],
        Rectifier: [
            {
                name: "Cosmic Ripples", image: "images/weapons/cosmic-ripples.webp", stats: [
                    { key: "atk", value: 500 },
                    { key: "atkp", value: 54 }
                ]
            },
            {
                name: "Lethean Elegy", image: "images/weapons/lethean-elegy.webp", stats: [
                    { key: "atk", value: 588 },
                    { key: "cr", value: 24.3 }
                ]
            },
        ],
        Gauntlets: [
            {
                name: "Blazing Justice", image: "images/weapons/blazing-justice.webp", stats: [
                    { key: "atk", value: 587 },
                    { key: "cd", value: 48.6 }
                ]
            },
        ],
        Sword: [
            {
                name: "Emerald of Genesis", image: "images/weapons/emerald-of-genesis.webp", stats: [
                    { key: "atk", value: 587 },
                    { key: "cr", value: 24.3 }
                ]
            },
        ]
    };

    const STAT_LABELS = {
        atk: "ATK",
        atkp: "ATK%",
        cr: "CRIT Rate",
        cd: "CRIT DMG",
        er: "Energy Regen",
        hpp: "HP%",
        defp: "DEF%"
    };

    const statIds = {
        hp: "stat-hp",
        atk: "stat-atk",
        def: "stat-def",
        er: "stat-er",
        cr: "stat-cr",
        cd: "stat-cd",
        basicdmg: "stat-basicdmg",
        skilldmg: "stat-skilldmg",
        heavydmg: "stat-heavydmg",
        libdmg: "stat-libdmg",
        healing: "stat-healing"
    };

    const statIcons = {
        hp: "images/stats/hp.webp",
        atk: "images/stats/atk.webp",
        def: "images/stats/def.webp",
        er: "images/stats/energy.webp",
        cr: "images/stats/crit.webp",
        cd: "images/stats/critdmg.webp",
        basicdmg: "images/stats/basic.png",
        skilldmg: "images/stats/skill.png",
        heavydmg: "images/stats/heavy.png",
        libdmg: "images/stats/lib.png",
        aerodmg: "images/elements/aero.webp",
        electrodmg: "images/elements/electro.webp",
        fusiondmg: "images/elements/fusion.webp",
        glaciodmg: "images/elements/glacio.webp",
        havocdmg: "images/elements/havoc.webp",
        spectrodmg: "images/elements/spectro.webp",
        healing: "images/stats/heal.webp",
        // weapon percent keys:
        atkp: "images/stats/atk.webp",
        defp: "images/stats/def.webp",
        hpp: "images/stats/hp.webp"
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
            minorFortes: [
                { key: "atkp", value: 12 },
                { key: "cr", value: 8 },
            ],
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
            minorFortes: [
                { key: "atkp", value: 12 },
                { key: "cr", value: 8 },
            ],
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
            minorFortes: [
                { key: "atkp", value: 12 },
                { key: "havocdmg", value: 12 },
            ],
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
            minorFortes: [
                { key: "atkp", value: 12 },
                { key: "cr", value: 8 },
            ],
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
            minorFortes: [
                { key: "hpp", value: 12 },
                { key: "healing", value: 12 },
            ],
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
            minorFortes: [
                { key: "atkp", value: 12 },
                { key: "cr", value: 8 },
            ],
            stats: {
                hp: 10775, atk: 438, def: 1137, er: 100, cr: 5, cd: 150,
                basicdmg: 0, skilldmg: 0, heavydmg: 0, libdmg: 0,
                aerodmg: 0, electrodmg: 0, fusiondmg: 0, glaciodmg: 0, havocdmg: 0, spectrodmg: 0, healing: 0
            }
        }
    ];

    // --- Helpers --------------------------------------------------------------
    function labelFor(key) {
        return STAT_LABELS[key] || key.toUpperCase();
    }
    function iconFor(key) {
        return statIcons[key] || "images/stats/unknown.png";
    }
    function hexToRgb(hex) {
        hex = hex.replace(/^#/, "");
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }

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

    // Which weapon stat keys should show a '%' suffix
    const WEAPON_PERCENT_KEYS = ["atkp", "hpp", "defp", "cr", "cd", "er"];

    // Format a stat value based on its key
    function formatWeaponStatValue(key, value) {
        if (value == null || value === "") return "—";
        if (typeof value !== "number") return String(value);
        return WEAPON_PERCENT_KEYS.includes(key) ? `${value}%` : `${value}`;
    }

    // map % keys to their base counterparts
    const PERCENT_TO_BASE = { atkp: "atk", hpp: "hp", defp: "def" };

    function normalizedBaseStats(char) {
        const s = { ...(char?.stats || {}) };
        const fields = [
            "hp", "atk", "def", "er", "cr", "cd",
            "basicdmg", "skilldmg", "heavydmg", "libdmg",
            "aerodmg", "electrodmg", "fusiondmg", "glaciodmg", "havocdmg", "spectrodmg",
            "healing"
        ];
        fields.forEach(k => { if (typeof s[k] !== "number") s[k] = 0; });
        return s;
    }

    function applyBonusArray(bonuses, prePctFlat, pctSum, out) {
        if (!Array.isArray(bonuses)) return;
        for (const { key, value } of bonuses) {
            if (typeof value !== "number") continue;

            if (key === "atk" || key === "hp" || key === "def") {
                prePctFlat[key] += value;
                continue;
            }
            if (PERCENT_TO_BASE[key]) {
                pctSum[PERCENT_TO_BASE[key]] += value;
                continue;
            }
            if (key in out) {
                out[key] += value;
            }
        }
    }

    function computeStatsWithBonuses(char, weapon) {
        const base = normalizedBaseStats(char);
        const out = { ...base };

        const prePctFlat = { atk: 0, hp: 0, def: 0 };
        const pctSum = { atk: 0, hp: 0, def: 0 };

        applyBonusArray(char?.minorFortes, prePctFlat, pctSum, out);
        applyBonusArray(weapon?.stats, prePctFlat, pctSum, out);

        out.atk = Math.round((base.atk + prePctFlat.atk) * (1 + pctSum.atk / 100));
        out.hp = Math.round((base.hp + prePctFlat.hp) * (1 + pctSum.hp / 100));
        out.def = Math.round((base.def + prePctFlat.def) * (1 + pctSum.def / 100));

        return out;
    }

    function renderMainStatsFrom(char, weaponOrNull) {
        const merged = computeStatsWithBonuses(char, weaponOrNull);
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

    const weaponDropdownWrapper = document.getElementById("weaponDropdownWrapper");
    const weaponDropdownSelected = document.getElementById("weaponDropdownSelected");
    const weaponDropdownOptions = document.getElementById("weaponDropdownOptions");
    const weaponDropdownHidden = document.getElementById("weaponDropdown");

    const weaponImg = document.querySelector(".resonator-weapon__img");
    const weaponName = document.querySelector(".weapon-details h3");
    const weaponStats = document.querySelector(".weapon-stats");

    // --- Setup chevrons on both selected headers ------------------------------
    const characterSelectedUI = setupChevron(dropdownSelected);
    const weaponSelectedUI = setupChevron(weaponDropdownSelected);

    function initStatIcons() {
        Object.keys(statIds).forEach(key => {
            const valueEl = document.getElementById(statIds[key]);
            if (!valueEl) return;
            const wrapper = valueEl.closest(".resonator-stat");
            const iconEl = wrapper?.querySelector(".stat-icon");
            if (iconEl) {
                iconEl.src = statIcons[key] || "images/stats/unknown.png";
                iconEl.alt = key;
            }
        });

        const elemIconEl = document.getElementById("stat-elemental-icon");
        const elemNameEl = document.getElementById("stat-elemental-name");
        if (elemIconEl) {
            elemIconEl.src = "images/stats/unknown.png";
            elemIconEl.alt = "Element";
        }
        if (elemNameEl) {
            elemNameEl.textContent = "Element DMG";
        }
    }

    // --- Weapon details grid controls ----------------------------------------
    function clearWeaponDetailsGrid() {
        const grid = document.getElementById("weaponDetailsGrid");
        if (grid) grid.style.display = "none";

        const ph = document.getElementById("weaponDetailsPlaceholder");
        if (ph) ph.style.display = "block";

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
        if (grid) grid.style.display = "grid";
        if (ph) ph.style.display = "none";

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
        if (weaponName) { weaponName.textContent = weapon.name; }

        if (weaponStats) {
            weaponStats.innerHTML = "";
            weapon.stats.forEach(stat => {
                const chip = document.createElement("div");
                chip.classList.add("stat-chip");
                const statIcon = document.createElement("img");
                statIcon.classList.add("stat-icon");
                statIcon.src = iconFor(stat.key);
                statIcon.alt = labelFor(stat.key);
                const statValue = document.createElement("h2");
                statValue.textContent = formatWeaponStatValue(stat.key, stat.value);
                chip.appendChild(statIcon);
                chip.appendChild(statValue);
                weaponStats.appendChild(chip);
            });
        }

        renderWeaponDetailsGrid(weapon);
    }

    function populateWeaponDropdown(character) {
        const availableWeapons = weaponsByType[character.weaponType] || [];

        weaponDropdownHidden.innerHTML = "";
        weaponDropdownOptions.innerHTML = "";

        // Set the selected label text (keeps chevron)
        if (weaponSelectedUI.label) {
            weaponSelectedUI.label.innerHTML = "<span>Select Weapon</span>";
        }

        availableWeapons.forEach((weapon, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = weapon.name;
            weaponDropdownHidden.appendChild(option);

            const optionDiv = document.createElement("div");
            optionDiv.classList.add("dropdown-option");
            optionDiv.dataset.index = index;

            const img = document.createElement("img");
            img.src = weapon.image;
            img.alt = weapon.name;

            const span = document.createElement("span");
            span.textContent = weapon.name;

            optionDiv.appendChild(img);
            optionDiv.appendChild(span);

            optionDiv.addEventListener("click", (ev) => {
                ev.stopPropagation();

                if (weaponSelectedUI.label) {
                    weaponSelectedUI.label.innerHTML = "";
                    const selectedImg = img.cloneNode();
                    const selectedSpan = document.createElement("span");
                    selectedSpan.textContent = weapon.name;
                    weaponSelectedUI.label.appendChild(selectedImg);
                    weaponSelectedUI.label.appendChild(selectedSpan);
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

    // --- Dropdown toggles -----------------------------------------------------
    weaponDropdownSelected.addEventListener("click", (e) => {
        e.stopPropagation();
        weaponDropdownOptions.classList.toggle("hidden");
        weaponDropdownSelected.classList.toggle("open");
    });

    dropdownSelected.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownOptions.classList.toggle("hidden");
        dropdownSelected.classList.toggle("open");
    });

    // Close both on outside click
    document.addEventListener("click", () => {
        weaponDropdownOptions.classList.add("hidden");
        dropdownOptions.classList.add("hidden");
        weaponDropdownSelected.classList.remove("open");
        dropdownSelected.classList.remove("open");
    });

    initStatIcons();

    // --- Stats + placeholder --------------------------------------------------
    function showPlaceholder() {
        bgImg.src = "images/backgrounds/placeholder-background.webp";
        bgImg.alt = "Placeholder Background";
        bgImg.classList.add("placeholder");

        profileImg.style.opacity = 0;
        profileImg.style.display = "none";
        profileImg.removeAttribute("src");
        profileImg.removeAttribute("alt");

        charNameElement.style.display = "none";
        charNameElement.textContent = "Select Resonator";

        elementImg.style.display = "none";
        elementImg.removeAttribute("src");
        elementImg.removeAttribute("alt");
        elementName.textContent = "-";

        tierImg.style.display = "none";
        tierImg.removeAttribute("src");
        tierImg.removeAttribute("alt");
        tierName.textContent = "-";

        rarityImg.style.display = "none";
        rarityImg.src = "";
        rarityImg.alt = "No rarity";

        document.documentElement.style.setProperty("--color1", "#484848");
        document.documentElement.style.setProperty("--color2", "#373737");
        document.documentElement.style.setProperty("--color1-rgb", "72, 72, 72");
        document.documentElement.style.setProperty("--color2-rgb", "55, 55, 55");

        if (characterSelectedUI.label) {
            characterSelectedUI.label.innerHTML = "<span>Select your resonator</span>";
        }
        if (weaponSelectedUI.label) {
            weaponSelectedUI.label.innerHTML = "<span>Select Weapon</span>";
        }

        clearWeaponDetailsGrid();
        initStatIcons();
    }

    function updateStats(char) {
        const stats = char.stats || {};

        for (const key in statIds) {
            const elemId = statIds[key];
            const statElem = document.getElementById(elemId);
            if (!statElem) continue;

            let value = stats[key] || 0;
            if (["cr", "cd", "er", "basicdmg", "skilldmg", "heavydmg", "libdmg", "havocdmg", "healing"].includes(key)) {
                value = value + "%";
            }
            statElem.textContent = value;

            const wrapper = statElem.closest(".resonator-stat");
            const iconElem = wrapper?.querySelector(".stat-icon");
            if (iconElem && statIcons[key]) {
                iconElem.src = statIcons[key];
                iconElem.alt = key;
            }
        }

        const elementKey = (char.element?.name?.toLowerCase() || "") + "dmg";
        const elemVal = stats[elementKey] || 0;
        const elemValueEl = document.getElementById("stat-elemental-value");
        const elemNameEl = document.getElementById("stat-elemental-name");
        const elemIconEl = document.getElementById("stat-elemental-icon");
        if (elemValueEl) elemValueEl.textContent = elemVal + "%";
        if (elemNameEl) elemNameEl.textContent = (char.element?.name || "Element") + " DMG";
        if (elemIconEl) {
            elemIconEl.src = char.element?.image || "images/stats/unknown.png";
            elemIconEl.alt = char.element?.name || "Element";
        }
    }

    // --- Resonator dropdown (custom) -----------------------------------------
    resonators.forEach((char, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = char.name;
        characterDropdown.appendChild(opt);

        const optDiv = document.createElement("div");
        optDiv.classList.add("dropdown-option");
        const img = document.createElement("img");
        img.src = char.profile || "images/resonators/placeholder.webp";
        img.alt = char.name;
        const span = document.createElement("span");
        span.textContent = char.name;
        optDiv.appendChild(img); optDiv.appendChild(span);
        optDiv.addEventListener("click", () => {
            if (characterSelectedUI.label) {
                characterSelectedUI.label.innerHTML = "";
                const selectedImg = img.cloneNode();
                const selectedSpan = document.createElement("span");
                selectedSpan.textContent = char.name;
                characterSelectedUI.label.appendChild(selectedImg);
                characterSelectedUI.label.appendChild(selectedSpan);
            }
            dropdownOptions.classList.add("hidden");
            dropdownSelected.classList.remove("open");
            characterDropdown.value = index;
            characterDropdown.dispatchEvent(new Event("change"));
        });
        dropdownOptions.appendChild(optDiv);
    });

    // --- Selection state ------------------------------------------------------
    let currentCharacter = null;
    let currentWeapon = null;

    // Weapon hidden select -> details
    weaponDropdownHidden.addEventListener("change", e => {
        if (!currentCharacter) return;
        const weaponIndex = e.target.value;
        const weapon = weaponsByType[currentCharacter.weaponType][weaponIndex];

        currentWeapon = weapon;
        populateWeaponDetails(weapon);
        renderMainStatsFrom(currentCharacter, currentWeapon);
    });

    // Initial placeholder
    showPlaceholder();

    // Main character change handler
    characterDropdown.addEventListener("change", (e) => {
        const charIndex = e.target.value;
        if (charIndex === "") { showPlaceholder(); return; }

        const char = resonators[charIndex];
        currentCharacter = char;
        currentWeapon = null;

        bgImg.classList.remove("placeholder");
        bgImg.src = char.background;
        bgImg.alt = `${char.name} Background`;

        profileImg.style.display = "block";
        profileImg.src = char.profile;
        profileImg.alt = `${char.name} Profile`;
        profileImg.style.transition = "opacity 0.5s ease";
        setTimeout(() => (profileImg.style.opacity = 1), 50);

        profileImg.classList.remove("glow-5star", "glow-4star");
        if (char.rarity === 0) {
            profileImg.classList.add("glow-5star");
        } else if (char.rarity === 1) {
            profileImg.classList.add("glow-4star");
        }

        charNameElement.style.display = "block";
        charNameElement.textContent = char.name;

        elementImg.style.display = "block";
        elementImg.src = char.element.image || "";
        elementImg.alt = char.element.name || "Element";
        elementName.textContent = char.element.name || "-";

        const charRarity = rarity[char.rarity];
        const charTier = tier[char.tier];
        rarityImg.style.display = "block";
        rarityImg.src = charRarity.image;
        rarityImg.alt = charRarity.name;
        tierImg.style.display = "block";
        tierImg.src = charTier.image;
        tierImg.alt = charTier.name;
        tierName.textContent = charTier.name;

        document.documentElement.style.setProperty("--color1", char.color1);
        document.documentElement.style.setProperty("--color2", char.color2);
        document.documentElement.style.setProperty("--color1-rgb", hexToRgb(char.color1));
        document.documentElement.style.setProperty("--color2-rgb", hexToRgb(char.color2));

        clearWeaponDetailsGrid();
        populateWeaponDropdown(char);

        renderMainStatsFrom(currentCharacter, null);
    });
});

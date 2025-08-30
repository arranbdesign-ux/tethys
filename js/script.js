document.addEventListener("DOMContentLoaded", () => {

    const weapons = [
        { name: "Broadblade", image: "" },
        { name: "Gauntlets", image: "" },
        { name: "Pistols", image: "" },
        { name: "Rectifier", image: "" },
        { name: "Sword", image: "" }
    ];

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
            { name: "Lustrous Razor", atk: 587, atkp: 36.4, image: "" },
            { name: "Verdant Summit", atk: 587, cd: 24.3, image: "" }
        ],
        Gauntlets: [
            { name: "Iron Fists", damage: 40, image: "" },
            { name: "Thunder Gloves", damage: 55, image: "" }
        ],
        Pistols: [
            { name: "Static Mist", atk: 587, cr: 24.3, image: "" },
            { name: "The Last Dance", atk: 500, cd: 72, image: "" }
        ],
        Sword: [
            { name: "Twin Pistols", damage: 45, image: "" },
            { name: "Flare Gun", damage: 50, image: "" }
        ],
        Rectifier: [
            { name: "Cosmic Ripples", atk: 500, atkp: 54, image: "" },
            { name: "Stellar Symphony", atk: 412, er: 77, image: "" },
            { name: "Variation", atk: 337, er: 51.8, image: "" },
            { name: "Lethean Elegy", atk: 588, cr: 24.3, image: "" }
        ]
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
            name: "Augusta",
            color1: '#861B01',
            color2: '#603827',
            profile: "images/resonators/augusta.webp",
            background: "images/backgrounds/augusta-splash.webp",
            element: elements[1],
            weaponType: "Broadblade",
            rarity: 0,
            tier: 0,
        },
        {
            name: "Carlotta",
            color1: '#AA01A4',
            color2: '#6D6D6D',
            profile: "images/resonators/carlotta.webp",
            background: "images/backgrounds/carlotta-splash.webp",
            element: elements[3],
            weaponType: "Pistols",
            rarity: 0,
            tier: 0,
        },
        {
            name: "Phrolova",
            color1: '#860124',
            color2: '#602738',
            profile: "images/resonators/phrolova.webp",
            background: "images/backgrounds/phrolova-splash.webp",
            element: elements[4],
            weaponType: "Rectifier",
            rarity: 0,
            tier: 1,
        },
        {
            name: "Shorekeeper",
            color1: '#011AAA',
            color2: '#5A5341',
            profile: "images/resonators/shorekeeper.webp",
            background: "images/backgrounds/shorekeeper-splash.webp",
            element: elements[5],
            weaponType: "Rectifier",
            rarity: 0,
            tier: 0,
        },
    ];

    const charNameElement = document.getElementById("charName");

    const characterDropdown = document.getElementById("characterDropdown");

    const bgImg = document.querySelector(".resonator-bg");

    const profileImg = document.querySelector(".details-profile");

    const elementImg = document.querySelector("#resElem .details-icon");
    const elementName = document.querySelector("#resElem h2");

    const rarityImg = document.querySelector(".details-stars");

    const tierImg = document.querySelector("#resTiers .details-icon");
    const tierName = document.querySelector("#resTiers h2");

    // Helper function to convert hex to rgb
    function hexToRgb(hex) {
        hex = hex.replace(/^#/, "");
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }

    // Function to show placeholder
    function showPlaceholder() {
        bgImg.src = "images/backgrounds/placeholder-background.webp";
        bgImg.alt = "Placeholder Background";
        bgImg.classList.add("placeholder"); // grayscale via CSS

        profileImg.style.opacity = 0;
        profileImg.style.display = "none";
        profileImg.removeAttribute("src");
        profileImg.removeAttribute("alt");

        charNameElement.textContent = "Select Resonator";

        elementImg.style.display = "none";
        elementImg.removeAttribute("src"); // clears the image
        elementImg.removeAttribute("alt");
        elementName.textContent = "-";       // placeholder text

        tierImg.style.display = "none";
        tierImg.removeAttribute("src"); // clears the image
        tierImg.removeAttribute("alt");
        tierName.textContent = "-";       // placeholder text

        //Rarity
        rarityImg.style.display = "none";
        rarityImg.src = "";
        rarityImg.alt = "No rarity";

        // Reset colors
        document.documentElement.style.setProperty("--color1", "#484848");
        document.documentElement.style.setProperty("--color2", "#373737");
        document.documentElement.style.setProperty("--color1-rgb", "72, 72, 72");
        document.documentElement.style.setProperty("--color2-rgb", "55, 55, 55");
    }

    // Populate dropdown
    resonators.forEach((char, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = char.name;
        characterDropdown.appendChild(option);
    });

    // Initial load
    showPlaceholder();

    // Handle character selection
    characterDropdown.addEventListener("change", (e) => {
        const charIndex = e.target.value;
        if (charIndex === "") {
            showPlaceholder();
            return;
        }

        const char = resonators[charIndex];
        const charRarity = rarity[char.rarity];
        const charTier = tier[char.tier];

        // Background
        bgImg.classList.remove("placeholder");
        bgImg.src = char.background;
        bgImg.alt = `${char.name} Background`;

        // Profile image fade-in
        profileImg.style.display = "block";
        profileImg.src = char.profile;
        profileImg.alt = `${char.name} Profile`;
        profileImg.style.transition = "opacity 0.5s ease";
        setTimeout(() => profileImg.style.opacity = 1, 50);

        // Name
        charNameElement.textContent = char.name;

        //Element
        elementImg.style.display = "block";
        elementImg.src = char.element.image || ""; // Set image (empty if none)
        elementImg.alt = char.element.name || "Element";
        elementName.textContent = char.element.name || ""; // Set element name

        //Rarity
        rarityImg.style.display = "block";
        rarityImg.src = charRarity.image;
        rarityImg.alt = charRarity.name;

        // Tier
        tierImg.style.display = "block";
        tierImg.src = charTier.image;
        tierImg.alt = charTier.name;
        tierName.textContent = charTier.name;

        // Update colors
        document.documentElement.style.setProperty("--color1", char.color1);
        document.documentElement.style.setProperty("--color2", char.color2);
        document.documentElement.style.setProperty("--color1-rgb", hexToRgb(char.color1));
        document.documentElement.style.setProperty("--color2-rgb", hexToRgb(char.color2));
    });
});

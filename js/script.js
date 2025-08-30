document.addEventListener("DOMContentLoaded", () => {
    const weapons = [
        { name: "Broadblade", image: "" },
        { name: "Gauntlets", image: "" },
        { name: "Pistols", image: "" },
        { name: "Rectifier", image: "" },
        { name: "Sword", image: "" }
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
        { name: "Aero", image: "" },
        { name: "Electro", image: "" },
        { name: "Fusion", image: "" },
        { name: "Glacio", image: "" },
        { name: "Havoc", image: "" },
        { name: "Spectro", image: "" }
    ];


    const resonators = [
        {
            name: "Augusta",
            color1: '#861B01',
            color2: '#603827',
            profile: "images\resonators\augusta.webp",
            background: "images\backgrounds\augusta-splash.webp",
            element: elements[1],
            weaponType: "Broadblade",
            stats: {
                hp: 10300,
                atk: 518,
                def: 1112,
                er: 100,
                cr: 13,
                cd: 150,
                basicdmg: 0,
                skilldmg: 0,
                heavydmg: 0,
                libdmg: 0,
                aerodmg: 0,
                electrodmg: 0,
                fusiondmg: 0,
                glaciodmg: 0,
                havocdmg: 0,
                spectrodmg: 0,
                healing: 0,
            },
        },
        {
            name: "Carlotta",
            color1: '#AA01A4',
            color2: '#6D6D6D',
            profile: "images\resonators\carlotta.webp",
            background: "images\backgrounds\carlotta-splash.webp",
            element: elements[3],
            weaponType: "Pistols",
            stats: {
                hp: 12450,
                atk: 518,
                def: 1198,
                er: 100,
                cr: 13,
                cd: 150,
                basicdmg: 0,
                skilldmg: 0,
                heavydmg: 0,
                libdmg: 0,
                aerodmg: 0,
                electrodmg: 0,
                fusiondmg: 0,
                glaciodmg: 0,
                havocdmg: 0,
                spectrodmg: 0,
                healing: 0,
            },

        },
        {
            name: "Phrolova",
            color1: '#860124',
            color2: '#602738',
            profile: "images\resonators\phrolova.webp",
            background: "images\backgrounds\phrolova-splash.webp",
            element: elements[3],
            weaponType: "Rectifier",
            stats: {
                hp: 10775,
                atk: 490,
                def: 1137,
                er: 100,
                cr: 13,
                cd: 150,
                basicdmg: 0,
                skilldmg: 0,
                heavydmg: 0,
                libdmg: 0,
                aerodmg: 0,
                electrodmg: 0,
                fusiondmg: 0,
                glaciodmg: 0,
                havocdmg: 0,
                spectrodmg: 0,
                healing: 0,
            },
        },
        {
            name: "Shorekeeper",
            color1: '#011AAA',
            color2: '#5A5341',
            profile: "images\resonators\shorekeeper.webp",
            background: "images\backgrounds\shorekeeper-splash.webp",
            element: elements[3],
            weaponType: "Rectifier",
            stats: {
                hp: 18718,
                atk: 288,
                def: 1100,
                er: 100,
                cr: 5,
                cd: 150,
                basicdmg: 0,
                skilldmg: 0,
                heavydmg: 0,
                libdmg: 0,
                aerodmg: 0,
                electrodmg: 0,
                fusiondmg: 0,
                glaciodmg: 0,
                havocdmg: 0,
                spectrodmg: 0,
                healing: 12,
            },
        },
    ]


    const charNameElement = document.getElementById("charName");
    const characterDropdown = document.getElementById("characterDropdown");
    const bgImg = document.querySelector(".resonator-bg");

    // Populate character dropdown
    resonators.forEach((char, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = char.name;
        characterDropdown.appendChild(option);
    });

    function hexToRgb(hex) {
        // Remove #
        hex = hex.replace(/^#/, "");

        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        return `${r}, ${g}, ${b}`;
    }

    // Change background when a character is selected
    characterDropdown.addEventListener("change", (e) => {
        const charIndex = e.target.value;
        if (charIndex === "") {
            bgImg.src = "";
            bgImg.alt = "No character selected";
            charNameElement.textContent = "";
            document.documentElement.style.setProperty("--color1", "#484848");
            document.documentElement.style.setProperty("--color2", "#373737");
            document.documentElement.style.setProperty("--color1-rgb", "72, 72, 72");
            document.documentElement.style.setProperty("--color2-rgb", "55, 55, 55");
            return;
        }

        const char = resonators[charIndex];

        // Update background
        bgImg.src = char.background;
        bgImg.alt = `${char.name} Background`;

        // Update name
        charNameElement.textContent = char.name;

        // Update hex colors
        document.documentElement.style.setProperty("--color1", char.color1);
        document.documentElement.style.setProperty("--color2", char.color2);

        // Update rgb colors
        const rgb1 = hexToRgb(char.color1);
        const rgb2 = hexToRgb(char.color2);
        document.documentElement.style.setProperty("--color1-rgb", rgb1);
        document.documentElement.style.setProperty("--color2-rgb", rgb2);
    });
});
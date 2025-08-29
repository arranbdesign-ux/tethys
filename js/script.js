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
            color: '#861B01',
            profile: "",
            background: "https://images.rpgsite.net/articles/thumbnail/da49c9a1/18074/original/wuwa-augusta-iuno-2-6-thumb.png",
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
            color: '#AA01A4',
            profile: "",
            background: "https://pbs.twimg.com/media/GgWasGHawAA8D4l?format=jpg&name=4096x4096",
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
            color: '#860124',
            profile: "",
            background: "https://pbs.twimg.com/media/GtzuDRLWQAAsolO?format=jpg&name=4096x4096",
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
            color: '#011AAA',
            profile: "",
            background: "https://cdn-www.bluestacks.com/bs-images/01j8pxjwp99h55vn3a3k.webp",
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



    const characterDropdown = document.getElementById("characterDropdown");
    const bgImg = document.querySelector(".resonator-bg");

    // Populate character dropdown
    resonators.forEach((char, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = char.name;
        characterDropdown.appendChild(option);
    });

    // Change background when a character is selected
    characterDropdown.addEventListener("change", (e) => {
        const charIndex = e.target.value;
        if (charIndex === "") {
            bgImg.src = ""; // clear background if none selected
            bgImg.alt = "No character selected";
            return;
        }

        const char = resonators[charIndex];
        bgImg.src = char.background;
        bgImg.alt = `${char.name} Background`;
    });
});
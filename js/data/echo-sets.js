window.ECHO_SETS = {
    // example id -> { name, icon, bonuses: [{count, stats:[{key,value}, ...]}] }
    // counts are "at least" (>=)
    "freezingfrost": {
        name: "Freezing Frost",
        icon: "images/sets/freezing-frost.webp",
        bonuses: [
            { count: 2, stats: [{ key: "glaciodmg", value: 10 }] },
            { count: 5, stats: [{ key: "glaciodmg", value: 30 }] }
        ]
    },
    "moltenrift": {
        name: "Molten Rift",
        icon: "images/sets/molten-rift.webp",
        bonuses: [
            { count: 2, stats: [{ key: "fusiondmg", value: 10 }] },
            { count: 5, stats: [{ key: "fusiondmg", value: 30 }] }
        ]
    },
    "voidthunder": {
        name: "Void Thunder",
        icon: "images/sets/void-thunder.webp",
        bonuses: [
            { count: 2, stats: [{ key: "electrodmg", value: 10 }] },
            { count: 5, stats: [{ key: "electrodmg", value: 30 }] }
        ]
    },
    "sierragale": {
        name: "Sierra Gale",
        icon: "images/sets/sierra-gale.webp",
        bonuses: [
            { count: 2, stats: [{ key: "aerodmg", value: 10 }] },
            { count: 5, stats: [{ key: "aerodmg", value: 30 }] }
        ]
    },
    "celestiallight": {
        name: "Celestial Light",
        icon: "images/sets/celestial-light.webp",
        bonuses: [
            { count: 2, stats: [{ key: "spectrodmg", value: 10 }] },
            { count: 5, stats: [{ key: "spectrodmg", value: 30 }] }
        ]
    },
    "havoceclipse": {
        name: "Havoc Eclipse",
        icon: "images/sets/havoc-eclipse.webp",
        bonuses: [
            { count: 2, stats: [{ key: "havocdmg", value: 10 }] },
            { count: 5, stats: [{ key: "havocdmg", value: 30 }] }
        ]
    },
    "rejuvinatingglow": {
        name: "Rejuvinating Glow",
        icon: "images/sets/rejuvinating-glow.webp",
        bonuses: [
            { count: 2, stats: [{ key: "healing", value: 10 }] },
        ]
    },
    "moonlitclouds": {
        name: "Moonlit Clouds",
        icon: "images/sets/moonlit-clouds.webp",
        bonuses: [
            { count: 2, stats: [{ key: "er", value: 10 }] },
        ]
    },
    "lingeringtunes": {
        name: "Lingering Tunes",
        icon: "images/sets/lingering-tunes.webp",
        bonuses: [
            { count: 2, stats: [{ key: "atkp", value: 10 }] },
            { count: 5, stats: [{ key: "atkp", value: 20 }] }
        ]
    },
    "frostyresolve": {
        name: "Frosty Resolve",
        icon: "images/sets/frosty-resolve.webp",
        bonuses: [
            { count: 2, stats: [{ key: "skilldmg", value: 10 }] },
            { count: 5, stats: [{ key: "glaciodmg", value: 50 }, { key: "skilldmg", value: 18 }] }
        ]
    },
    "eternalradiance": {
        name: "Eternal Radiance",
        icon: "images/sets/eternal-radiance.webp",
        bonuses: [
            { count: 2, stats: [{ key: "spectrodmg", value: 10 }] },
            { count: 5, stats: [{ key: "cr", value: 20 }, { key: "spectrodmg", value: 15 }] }
        ]
    },
    "midnightveil": {
        name: "Midnight Veil",
        icon: "images/sets/midnight-veil.webp",
        bonuses: [
            { count: 2, stats: [{ key: "havocdmg", value: 10 }] },
        ]
    },
    "empyreananthem": {
        name: "Empyrean Anthem",
        icon: "images/sets/empyrean-anthem.webp",
        bonuses: [
            { count: 2, stats: [{ key: "er", value: 10 }] },
            { count: 5, stats: [{ key: "atkp", value: 20 },] }
        ]
    },
    "tidebreakingcourage": {
        name: "Tidebreaking Courage",
        icon: "images/sets/tidebreaking-courage.webp",
        bonuses: [
            { count: 2, stats: [{ key: "er", value: 10 }] },
            {
                count: 5, stats: [{ key: "atkp", value: 15 }, { key: "aerodmg", value: 30 },
                { key: "electrodmg", value: 30 },
                { key: "fusiondmg", value: 30 },
                { key: "glaciodmg", value: 30 },
                { key: "havocdmg", value: 30 },
                { key: "spectrodmg", value: 30 }]
            }
        ]
    },
    "gustsofwelkin": {
        name: "Gusts of Welkin",
        icon: "images/sets/gusts-of-welkin.webp",
        bonuses: [
            { count: 2, stats: [{ key: "aerodmg", value: 10 }] },
            { count: 5, stats: [{ key: "aerodmg", value: 30 }] }
        ]
    },
    "windwardpilgrimage": {
        name: "Windward Pilgrimage",
        icon: "images/sets/windward-pilgrimage.webp",
        bonuses: [
            { count: 2, stats: [{ key: "aerodmg", value: 10 }] },
            { count: 5, stats: [{ key: "cr", value: 10 }, { key: "aerodmg", value: 30 }] }
        ]
    },
    "flamingclawprint": {
        name: "Flaming Clawprint",
        icon: "images/sets/flaming-clawprint.webp",
        bonuses: [
            { count: 2, stats: [{ key: "fusiondmg", value: 10 }] },
            { count: 5, stats: [{ key: "fusiondmg", value: 15 }, { key: "libdmg", value: 20 }] }
        ]
    },
    "dreamofthelost": {
        name: "Dream of the Lost",
        icon: "images/sets/dream-of-the-lost.webp",
        bonuses: [
            { count: 3, stats: [{ key: "cr", value: 20 }] },
        ]
    },
    "crownofvalor": {
        name: "Crown of Valor",
        icon: "images/sets/crown-of-valor.webp",
        bonuses: [
            { count: 3, stats: [{ key: "atkp", value: 30 }, { key: "cd", value: 20 }] },
        ]
    },
    // add more...
};
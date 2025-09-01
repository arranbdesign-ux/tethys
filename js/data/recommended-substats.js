// Map resonator display name -> array of recommended substat keys
// Keys should match the stat keys used elsewhere (e.g., "cr", "cd", "atkp", "er", "atk", "hpp", etc.)
// Example provided for "Augusta"; edit freely per resonator.
window.RECOMMENDED_SUBSTATS = {
  Augusta: ["cr", "cd", "atkp", "er", "atk", "heavydmg", "skilldmg"],
  Carlotta: ["cr", "cd", "atkp", "er", "atk", "skilldmg"],
  Danjin: ["cr", "cd", "atkp", "er", "atk", "heavydmg"],
  Phrolova: ["cr", "cd", "atkp", "atk", "basicdmg"],
  Shorekeeper: ["cd", "hpp", "hp", "libdmg"],
  Zani: ["cr", "cd", "atkp", "er", "atk", "heavydmg"],
};

// Recommended main stat keys per resonator. Any match yields full 10 points for main.
// Edit per resonator as needed.
window.RECOMMENDED_MAIN_STATS = {
  Augusta: ["cr", "cd", "atkp", "er", "atk"],
  Carlotta: ["cr", "cd", "atkp", "er", "atk"],
  Danjin: ["cr", "cd", "atkp", "er", "atk"],
  Phrolova: ["cr", "cd", "atkp", "er", "atk"],
  Shorekeeper: ["hpp", "hp", "libdmg"],
  Zani: ["cr", "cd", "atkp", "er", "atk"]
};

// Optional weighting per resonator for substats (multiplier; each sub still caps at 10 points)
// Omit or leave empty for uniform weighting
window.RECOMMENDED_WEIGHTS = {
  Augusta: { cr: 1.2, cd: 1.2, atkp: 1.1 },
  Carlotta: { cr: 1.2, cd: 1.2, atkp: 1.1 },
  // Example: Danjin: { heavydmg: 1.2 }
};

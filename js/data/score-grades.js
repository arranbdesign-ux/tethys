// Configure letter grades for echo scores (0..60)
// Ordered from highest to lowest; first match where score >= min applies
// Edit these thresholds to your liking
window.SCORE_GRADES = [
  { label: "WTF", min: 50 },
  { label: "SSS+", min: 45 },
  { label: "SSS", min: 40 },
  { label: "SS+", min: 35 },
  { label: "SS", min: 30 },
  { label: "S+", min: 25 },
  { label: "S", min: 20 },
  { label: "A", min: 15 },
  { label: "B", min: 10 },
  { label: "C", min: 5 },
  { label: "D", min: 0 }
];


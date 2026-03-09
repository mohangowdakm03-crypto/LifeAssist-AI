export const emergencyKeywords = [
  "collapsed",
  "not breathing",
  "heart attack",
  "unconscious",
  "cpr",
  "seizure",
  "severe bleeding",
  "stroke",
  "choking",
  "no pulse"
];

export function detectEmergency(input = "") {
  const normalized = input.toLowerCase();
  return emergencyKeywords.some((keyword) => normalized.includes(keyword));
}

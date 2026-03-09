import { Remedy } from "../models/Remedy.js";
import { QueryLog } from "../models/QueryLog.js";
import { buildSymptomPrompt } from "../prompts/healthPrompt.js";
import { generateStructuredJson } from "./openaiService.js";
import { detectEmergency } from "../data/emergencyKeywords.js";

const DISCLAIMER = "This system provides informational guidance only and is not a substitute for professional medical advice.";
const EMERGENCY_NOTICE = "Call emergency services immediately.";

function mergeUnique(items) {
  return [...new Set(items.filter(Boolean))];
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function flattenRemedyData(remedies) {
  if (!remedies.length) {
    return null;
  }

  return {
    possibleCauses: mergeUnique(remedies.flatMap((r) => r.possibleCauses || [])),
    homeRemedies: mergeUnique(remedies.flatMap((r) => r.homeRemedies || [])),
    otcMedicines: remedies.flatMap((r) => r.medicines || []),
    whenToSeeDoctor: mergeUnique(remedies.flatMap((r) => r.whenToSeeDoctor || [])),
    emergencyWarningSigns: mergeUnique(remedies.flatMap((r) => r.emergencyWarningSigns || []))
  };
}

function buildFallbackResponse(remedies, query) {
  const flattened = flattenRemedyData(remedies);

  if (!flattened) {
    return {
      possibleCauses: [
        "The symptoms may have multiple causes and need proper clinical evaluation.",
        "A common minor illness is possible, but this is uncertain without examination."
      ],
      homeRemedies: [
        "Rest and hydrate frequently.",
        "Monitor symptoms closely for changes.",
        "Avoid self-medicating beyond label instructions."
      ],
      otcMedicines: [],
      whenToSeeDoctor: [
        "If symptoms worsen or persist more than 24-48 hours.",
        "If high fever, repeated vomiting, severe pain, or dehydration is present."
      ],
      emergencyWarningSigns: [
        "Trouble breathing",
        "Chest pain",
        "Confusion",
        "Unconsciousness",
        "Severe bleeding"
      ],
      note: `No direct knowledge base match was found for: ${query}`
    };
  }

  return flattened;
}

function normalizeAiSections(aiOutput, fallback) {
  if (!aiOutput) {
    return fallback;
  }

  return {
    possibleCauses: aiOutput.possibleCauses?.length ? aiOutput.possibleCauses : fallback.possibleCauses,
    homeRemedies: aiOutput.homeRemedies?.length ? aiOutput.homeRemedies : fallback.homeRemedies,
    otcMedicines: aiOutput.otcMedicines?.length ? aiOutput.otcMedicines : fallback.otcMedicines,
    whenToSeeDoctor: aiOutput.whenToSeeDoctor?.length ? aiOutput.whenToSeeDoctor : fallback.whenToSeeDoctor,
    emergencyWarningSigns: aiOutput.emergencyWarningSigns?.length
      ? aiOutput.emergencyWarningSigns
      : fallback.emergencyWarningSigns
  };
}

export async function analyzeSymptoms(query) {
  const normalizedQuery = query.toLowerCase();
  const escapedQuery = escapeRegex(normalizedQuery);
  const emergency = detectEmergency(query);
  const tokens = normalizedQuery
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3)
    .map((token) => escapeRegex(token));

  const remedies = await Remedy.find({
    $or: [
      { condition: { $regex: escapedQuery, $options: "i" } },
      { aliases: { $regex: escapedQuery, $options: "i" } },
      ...tokens.map((token) => ({ condition: { $regex: token, $options: "i" } })),
      ...tokens.map((token) => ({ aliases: { $regex: token, $options: "i" } }))
    ]
  }).limit(5);

  const fallbackSections = buildFallbackResponse(remedies, query);

  const prompt = buildSymptomPrompt({
    query,
    matchedKnowledgeBase: remedies
  });

  const aiResponse = await generateStructuredJson(prompt);
  const sections = normalizeAiSections(aiResponse, fallbackSections);

  await QueryLog.create({
    query,
    emergency,
    matchedConditions: remedies.map((entry) => entry.condition),
    responseSource: aiResponse ? "ai" : "fallback"
  });

  return {
    emergency,
    disclaimer: DISCLAIMER,
    emergencyNotice: emergency ? EMERGENCY_NOTICE : null,
    matchedConditions: remedies.map((entry) => entry.condition),
    source: aiResponse ? "ai" : "fallback",
    sections
  };
}

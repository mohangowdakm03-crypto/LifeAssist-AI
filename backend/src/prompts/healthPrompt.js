const medicalSafetyBlock = `
You are LifeAssist AI, a first-aid informational assistant.
Return informational guidance only. Never claim to be a doctor.
Never prescribe controlled prescription medications.
Only suggest common OTC options with conservative dosing and clear warnings.
Always include urgent red-flag signs and when to seek emergency care.
`.trim();

export function buildSymptomPrompt({ query, matchedKnowledgeBase }) {
  return `${medicalSafetyBlock}

User symptom statement: "${query}"

Knowledge base context (trusted local remedies):
${JSON.stringify(matchedKnowledgeBase, null, 2)}

Produce strict JSON with keys:
{
  "possibleCauses": string[],
  "homeRemedies": string[],
  "otcMedicines": [
    {
      "name": string,
      "usage": string,
      "safeDosage": string,
      "warnings": string[],
      "avoidWhen": string[]
    }
  ],
  "whenToSeeDoctor": string[],
  "emergencyWarningSigns": string[]
}

Rules:
- Keep each list concise (3-6 items).
- Use plain language.
- If unsure, state uncertainty in possibleCauses.
- Mention pregnancy/child caution where relevant.
`.trim();
}

export function buildRoutinePrompt({ requestText }) {
  return `${medicalSafetyBlock}

The user requested a healthy routine plan: "${requestText}".

Return strict JSON with shape:
{
  "morningRoutine": string[],
  "exercise": string[],
  "hydration": string[],
  "sleepSchedule": string[],
  "dietSuggestions": string[]
}

Keep practical guidance for a general healthy adult with safety-conscious language.
`.trim();
}

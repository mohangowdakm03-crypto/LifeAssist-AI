import { buildRoutinePrompt } from "../prompts/healthPrompt.js";
import { generateStructuredJson } from "./openaiService.js";

function fallbackRoutine() {
  return {
    morningRoutine: [
      "Wake up at a consistent time",
      "Drink a glass of water",
      "5-10 minutes of light mobility or stretching",
      "Protein-rich breakfast"
    ],
    exercise: [
      "30 minutes brisk walk or cardio, 5 days/week",
      "2-3 strength sessions weekly",
      "Take standing/stretch breaks every hour"
    ],
    hydration: [
      "Target 2-3 liters of water/day unless medically restricted",
      "Drink one glass every 2-3 hours",
      "Increase intake with exercise or heat"
    ],
    sleepSchedule: [
      "Aim for 7-9 hours nightly",
      "Keep fixed bedtime and wake time",
      "Avoid screens 30-60 minutes before sleep"
    ],
    dietSuggestions: [
      "Use half-plate vegetables at lunch and dinner",
      "Choose whole grains and lean protein",
      "Limit sugary drinks and ultra-processed snacks"
    ]
  };
}

export async function createRoutine(requestText) {
  const aiRoutine = await generateStructuredJson(buildRoutinePrompt({ requestText }));
  const safeFallback = fallbackRoutine();

  if (!aiRoutine) {
    return {
      source: "fallback",
      ...safeFallback
    };
  }

  return {
    source: "ai",
    morningRoutine: aiRoutine.morningRoutine?.length ? aiRoutine.morningRoutine : safeFallback.morningRoutine,
    exercise: aiRoutine.exercise?.length ? aiRoutine.exercise : safeFallback.exercise,
    hydration: aiRoutine.hydration?.length ? aiRoutine.hydration : safeFallback.hydration,
    sleepSchedule: aiRoutine.sleepSchedule?.length ? aiRoutine.sleepSchedule : safeFallback.sleepSchedule,
    dietSuggestions: aiRoutine.dietSuggestions?.length ? aiRoutine.dietSuggestions : safeFallback.dietSuggestions
  };
}

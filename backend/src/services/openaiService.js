import OpenAI from "openai";
import { env } from "../config/env.js";
import { safeParseJson } from "../utils/json.js";

const client = env.openAiApiKey
  ? new OpenAI({
      apiKey: env.openAiApiKey
    })
  : null;

export async function generateStructuredJson(prompt) {
  if (!client) {
    return null;
  }

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
    temperature: 0.2,
    max_output_tokens: 900
  });

  const text = response.output_text || "";
  return safeParseJson(text);
}

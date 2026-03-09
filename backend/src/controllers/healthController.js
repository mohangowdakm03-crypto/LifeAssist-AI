import { analyzeSymptoms } from "../services/symptomService.js";

export async function analyzeSymptomsController(req, res, next) {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "A text query is required." });
    }

    const result = await analyzeSymptoms(query);
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

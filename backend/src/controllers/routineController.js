import { createRoutine } from "../services/routineService.js";

const DISCLAIMER = "This system provides informational guidance only and is not a substitute for professional medical advice.";

export async function routineController(req, res, next) {
  try {
    const requestText = req.body.requestText || "Create healthy routine";
    const routine = await createRoutine(requestText);

    return res.json({
      disclaimer: DISCLAIMER,
      ...routine
    });
  } catch (error) {
    next(error);
  }
}

import { Remedy } from "../models/Remedy.js";

export async function getKnowledgeBaseController(_req, res, next) {
  try {
    const remedies = await Remedy.find({}).sort({ condition: 1 });
    return res.json({ count: remedies.length, remedies });
  } catch (error) {
    next(error);
  }
}

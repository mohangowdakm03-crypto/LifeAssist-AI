import { Router } from "express";
import { analyzeSymptomsController } from "../controllers/healthController.js";
import { cprGuideController } from "../controllers/emergencyController.js";
import { nearbyController } from "../controllers/nearbyController.js";
import { getKnowledgeBaseController } from "../controllers/knowledgeController.js";
import { routineController } from "../controllers/routineController.js";

export const healthRouter = Router();

healthRouter.post("/analyze", analyzeSymptomsController);
healthRouter.post("/routine", routineController);
healthRouter.get("/emergency/cpr", cprGuideController);
healthRouter.get("/nearby", nearbyController);
healthRouter.get("/knowledge-base", getKnowledgeBaseController);

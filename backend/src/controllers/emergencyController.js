import { cprSteps } from "../data/cprSteps.js";
import { env } from "../config/env.js";

export function cprGuideController(_req, res) {
  return res.json({
    emergency: true,
    emergencyNotice: "Call emergency services immediately.",
    emergencyNumber: env.emergencyCallNumber,
    rhythm: {
      bpmMin: 100,
      bpmMax: 120
    },
    steps: cprSteps
  });
}

import cors from "cors";
import express from "express";
import { healthRouter } from "./routes/healthRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

export const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    service: "LifeAssist AI API",
    status: "ok",
    disclaimer: "This system provides informational guidance only and is not a substitute for professional medical advice."
  });
});

app.use("/api/health", healthRouter);

app.use(notFoundHandler);
app.use(errorHandler);

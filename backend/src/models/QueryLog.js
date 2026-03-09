import mongoose from "mongoose";

const queryLogSchema = new mongoose.Schema(
  {
    query: { type: String, required: true },
    emergency: { type: Boolean, default: false },
    matchedConditions: [{ type: String }],
    responseSource: { type: String, enum: ["ai", "fallback"], default: "fallback" }
  },
  { timestamps: true }
);

export const QueryLog = mongoose.model("QueryLog", queryLogSchema);

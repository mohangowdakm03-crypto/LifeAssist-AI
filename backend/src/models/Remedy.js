import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    usage: { type: String, required: true },
    safeDosage: { type: String, required: true },
    warnings: [{ type: String }],
    avoidWhen: [{ type: String }]
  },
  { _id: false }
);

const remedySchema = new mongoose.Schema(
  {
    condition: { type: String, required: true, unique: true },
    aliases: [{ type: String }],
    possibleCauses: [{ type: String }],
    homeRemedies: [{ type: String }],
    medicines: [medicineSchema],
    whenToSeeDoctor: [{ type: String }],
    emergencyWarningSigns: [{ type: String }]
  },
  { timestamps: true }
);

export const Remedy = mongoose.model("Remedy", remedySchema);

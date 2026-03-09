import { connectDb } from "../config/db.js";
import { Remedy } from "../models/Remedy.js";
import { remediesData } from "../data/remediesData.js";

async function seed() {
  await connectDb();

  for (const remedy of remediesData) {
    await Remedy.findOneAndUpdate({ condition: remedy.condition }, remedy, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
  }

  console.log(`Seeded ${remediesData.length} remedy records.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

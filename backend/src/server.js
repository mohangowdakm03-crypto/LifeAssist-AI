import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { app } from "./app.js";

async function start() {
  try {
    await connectDb();
    app.listen(env.port, () => {
      console.log(`LifeAssist backend listening on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

start();

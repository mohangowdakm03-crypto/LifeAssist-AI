import dotenv from "dotenv";

dotenv.config();

const requiredInProduction = ["OPENAI_API_KEY", "MONGODB_URI"];
if (process.env.NODE_ENV === "production") {
  requiredInProduction.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required env variable: ${key}`);
    }
  });
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lifeassist_ai",
  openAiApiKey: process.env.OPENAI_API_KEY || "",
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
  defaultSearchRadiusMeters: Number(process.env.SEARCH_RADIUS_METERS || 5000),
  emergencyCallNumber: process.env.EMERGENCY_CALL_NUMBER || "911"
};

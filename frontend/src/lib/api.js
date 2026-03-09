import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/health",
  timeout: 15000
});

export async function analyzeSymptoms(query) {
  const { data } = await api.post("/analyze", { query });
  return data;
}

export async function generateRoutine(requestText) {
  const { data } = await api.post("/routine", { requestText });
  return data;
}

export async function getCprGuide() {
  const { data } = await api.get("/emergency/cpr");
  return data;
}

export async function getNearbyPlaces(lat, lng) {
  const { data } = await api.get(`/nearby?lat=${lat}&lng=${lng}`);
  return data;
}

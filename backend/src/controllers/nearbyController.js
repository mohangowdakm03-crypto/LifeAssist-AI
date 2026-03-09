import { getNearbyMedicalLocations } from "../services/mapService.js";

export async function nearbyController(req, res, next) {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    const radius = Number(req.query.radius || 5000);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return res.status(400).json({ message: "Valid lat and lng query parameters are required." });
    }

    const places = await getNearbyMedicalLocations({ lat, lng, radius });
    return res.json({
      disclaimer: "This system provides informational guidance only and is not a substitute for professional medical advice.",
      location: { lat, lng, radius },
      places
    });
  } catch (error) {
    next(error);
  }
}

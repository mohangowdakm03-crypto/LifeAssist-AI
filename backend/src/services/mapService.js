import { env } from "../config/env.js";
import { haversineDistanceKm } from "../utils/distance.js";

const PLACE_TYPES = {
  clinics: {
    label: "Clinics",
    osm: ["clinic", "doctors"],
    googleKeyword: "clinic"
  },
  hospitals: {
    label: "Hospitals",
    osm: ["hospital"],
    googleKeyword: "hospital"
  },
  pharmacies: {
    label: "Pharmacies",
    osm: ["pharmacy"],
    googleKeyword: "pharmacy"
  },
  ambulance: {
    label: "Ambulance Services",
    osm: ["ambulance_station"],
    googleKeyword: "ambulance"
  }
};

function normalizeResult(item, lat, lng) {
  const distanceKm = haversineDistanceKm(lat, lng, item.lat, item.lng);
  return {
    ...item,
    distanceKm: Number(distanceKm.toFixed(2)),
    directionUrl: `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`
  };
}

async function fetchGooglePlaces({ lat, lng, radius, keyword }) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
  url.searchParams.set("location", `${lat},${lng}`);
  url.searchParams.set("radius", String(radius));
  url.searchParams.set("keyword", keyword);
  url.searchParams.set("key", env.googleMapsApiKey);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Places failed: ${response.status}`);
  }

  const data = await response.json();
  return (data.results || []).slice(0, 12).map((place) => ({
    name: place.name,
    rating: place.rating ?? null,
    address: place.vicinity || "Address unavailable",
    lat: place.geometry?.location?.lat,
    lng: place.geometry?.location?.lng
  }));
}

async function fetchOsmPlaces({ lat, lng, radius, amenities }) {
  const overpassQuery = `
[out:json][timeout:25];
(
${amenities.map((amenity) => `node["amenity"="${amenity}"](around:${radius},${lat},${lng});`).join("\n")}
);
out body;
`;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: overpassQuery
  });

  if (!response.ok) {
    throw new Error(`Overpass API failed: ${response.status}`);
  }

  const data = await response.json();
  return (data.elements || []).slice(0, 12).map((place) => ({
    name: place.tags?.name || "Medical location",
    rating: null,
    address: place.tags?.["addr:full"] || place.tags?.["addr:street"] || "Address unavailable",
    lat: place.lat,
    lng: place.lon
  }));
}

export async function getNearbyMedicalLocations({ lat, lng, radius = env.defaultSearchRadiusMeters }) {
  const entries = await Promise.all(
    Object.entries(PLACE_TYPES).map(async ([key, config]) => {
      try {
        const results = env.googleMapsApiKey
          ? await fetchGooglePlaces({ lat, lng, radius, keyword: config.googleKeyword })
          : await fetchOsmPlaces({ lat, lng, radius, amenities: config.osm });

        return [
          key,
          {
            label: config.label,
            items: results
              .filter((item) => typeof item.lat === "number" && typeof item.lng === "number")
              .map((item) => normalizeResult(item, lat, lng))
              .sort((a, b) => a.distanceKm - b.distanceKm)
          }
        ];
      } catch (_error) {
        return [key, { label: config.label, items: [] }];
      }
    })
  );

  return Object.fromEntries(entries);
}

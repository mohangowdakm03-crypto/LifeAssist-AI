"use client";

import { useMemo, useState } from "react";
import { getNearbyPlaces } from "lib/api";
import NearbyMap from "./NearbyMap";

const colors = {
  clinics: "#2a6fdb",
  hospitals: "#cf2a2a",
  pharmacies: "#3fa372",
  ambulance: "#cc7a00"
};

export default function NearbyHelp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState(null);
  const [places, setPlaces] = useState(null);

  const markers = useMemo(() => {
    if (!places) {
      return [];
    }

    return Object.entries(places)
      .flatMap(([key, payload]) =>
        (payload.items || []).map((item, index) => ({
          id: `${key}-${item.name}-${index}`,
          category: payload.label,
          color: colors[key] || "#2a6fdb",
          ...item
        }))
      )
      .slice(0, 40);
  }, [places]);

  const findNearby = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not available in this browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (coords) => {
        const lat = coords.coords.latitude;
        const lng = coords.coords.longitude;
        setPosition({ lat, lng });

        try {
          const response = await getNearbyPlaces(lat, lng);
          setPlaces(response.places);
        } catch (_err) {
          setError("Unable to fetch nearby medical locations right now.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("Location permission denied. Enable location access to use this feature.");
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Nearby Medical Help</h2>
        <button
          type="button"
          onClick={findNearby}
          disabled={loading}
          className="rounded-lg bg-med-green px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Locating..." : "Find Nearby Clinics/Pharmacies"}
        </button>
      </div>

      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

      {position && markers.length ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="h-80 overflow-hidden rounded-xl border border-blue-100">
            <NearbyMap center={position} markers={markers} />
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
            {Object.entries(places).map(([key, payload]) => (
              <article key={key} className="rounded-xl border border-blue-100 p-3">
                <p className="font-semibold">{payload.label}</p>
                {(payload.items || []).length ? (
                  payload.items.slice(0, 3).map((item, index) => (
                    <div key={`${item.name}-${index}`} className="mt-2 rounded-lg bg-med-sky/30 p-2 text-sm">
                      <p className="font-medium">{item.name}</p>
                      <p>{item.distanceKm} km away</p>
                      <p>Rating: {item.rating ?? "N/A"}</p>
                      <a
                        href={item.directionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-med-blue underline"
                      >
                        Directions
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="mt-2 text-sm text-med-slate">No nearby locations found.</p>
                )}
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

export default function NearbyMapClient({ center, markers }) {
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false} className="h-full min-h-72 w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CircleMarker center={[center.lat, center.lng]} radius={8} pathOptions={{ color: "#2a6fdb" }}>
        <Popup>Your location</Popup>
      </CircleMarker>

      {markers.map((marker) => (
        <CircleMarker key={marker.id} center={[marker.lat, marker.lng]} radius={7} pathOptions={{ color: marker.color }}>
          <Popup>
            <p className="font-semibold">{marker.name}</p>
            <p>{marker.category}</p>
            <p>{marker.distanceKm} km away</p>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

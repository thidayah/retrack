"use client";

import { MapContainer, TileLayer } from "react-leaflet";

export default function MapView() {
  return (
    <MapContainer
      center={[-6.2, 106.8]}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
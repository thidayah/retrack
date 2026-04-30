"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import Routing from "./Routing";
import RouteControlButtons from "./RouteControlButtons";
import LocateControl from "./LocateControl";

export default function MapInner({
  waypoints,
  setWaypoints,
  undoStack,
  redoStack,
}) {
  return (
    <MapContainer
      // center={[-6.2, 106.8]}
      center={[-6.8731786, 107.5365777]}

      zoom={13}
      zoomControl={true}
      className="h-full w-full"
    >
      <TileLayer
        // attribution="&copy; OpenStreetMap"
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution="&copy; OpenStreetMap & Carto"
        // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark mode
        attribution="&copy; Stadia Maps"
        // url="https://stadiamaps.com/{z}/{x}/{y}{r}.png"
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />

      <LocateControl />

      <Routing
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        undoStack={undoStack}
        redoStack={redoStack}
      />

      <RouteControlButtons
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        undoStack={undoStack}
        redoStack={redoStack}
      />
    </MapContainer>
  );
}
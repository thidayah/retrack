"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import Routing from "./Routing";
import RouteControlButtons from "./RouteControlButtons";
import LocateControl from "./LocateControl";
import MapControls from "../MapControls";

export default function MapInner({
  waypoints,
  setWaypoints,
  undoStack,
  redoStack,
  setRouteData,
}) {
  return (
    <MapContainer
      // center={[-6.2, 106.8]}
      center={[-6.8731786, 107.5365777]}

      zoom={13}
      zoomControl={false}
      className="h-175 lg:h-full w-full border border-gray-200 rounded-2xl z-10 relative"
    >
      <TileLayer
        // attribution="&copy; OpenStreetMap"
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"

        // attribution="&copy; OpenStreetMap & Carto"
        // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark mode

        // attribution="&copy; Stadia Maps"
        // url="https://stadiamaps.com/{z}/{x}/{y}{r}.png"

        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap contributors'
        url={`https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
      />

      {/* <LocateControl /> */}
      {/* <RouteControlButtons
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        undoStack={undoStack}
        redoStack={redoStack}
      /> */}
      
      <MapControls
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        undoStack={undoStack}
        redoStack={redoStack}
        setRouteData={setRouteData}
      />

      <Routing
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        undoStack={undoStack}
        redoStack={redoStack}
        setRouteData={setRouteData}
      />

    </MapContainer>
  );
}
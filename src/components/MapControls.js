"use client";

import { ArrowLeftRight, Locate, Minus, Plus, Redo2, Search, Trash, Undo2 } from "lucide-react";
import { useMap } from "react-leaflet";

export default function MapControls({
  waypoints,
  setWaypoints,
  undoStack,
  redoStack,
}) {
  const map = useMap()
  const zoom = map.getZoom();

  const btn = "size-6 md:size-8 bg-white rounded-lg shadow flex items-center justify-center hover:bg-gray-100 font-bold transition cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 ";

  const handleZoom = (e, delta) => {
    // e.stopPropagation(); // React

    // if (e.nativeEvent) {
    //   e.nativeEvent.stopPropagation(); 
    // }  

    if (delta > 0) {
      map.zoomIn(1, { animate: true });
    } else {
      map.zoomOut(1, { animate: true });
    }
  }

  // const stop = (e) => {
  //   e.stopPropagation();
  //   e.nativeEvent?.stopPropagation();
  // };

  const handleUndo = () => {
    if (undoStack.current.length === 0) return;

    const prev = undoStack.current.pop();
    redoStack.current.push([...waypoints]);

    setWaypoints(prev);
  }

  const handleRedo = () => {
    if (redoStack.current.length === 0) return;

    const next = redoStack.current.pop();
    undoStack.current.push([...waypoints]);

    setWaypoints(next);
  }

  const handleReverse = () => {
    alert('Soon!')
  }

  const handleClear = () => {
    undoStack.current.push([...waypoints]);
    redoStack.current = [];

    setWaypoints([]);
  }

  const handleLocation = (e) => {
    L.DomEvent.stopPropagation(e);
    L.DomEvent.preventDefault(e);

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    let marker;
    let circle;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const latlng = [latitude, longitude];

      map.setView(latlng, 15);

      if (marker) map.removeLayer(marker);
      if (circle) map.removeLayer(circle);

      marker = L.circleMarker(latlng, {
        radius: 12,
        // color: "#ff8126",
        color: "#ffffff",
        fillColor: "#006aff",
        fillOpacity: 1,
        weight: 4,
      }).addTo(map);

      circle = L.circle(latlng, {
        radius: 24,
        color: "#006aff",
        fillColor: "#006aff",
        fillOpacity: 0.25,
        weight: 0,
      }).addTo(map);
    });
  };

  const handleSearch = () => {
    alert('Soon!')
  }

  return (
    <div
      className="map-control absolute right-2 top-3 space-y-4 z-1000"
    // onMouseDown={stop}
    // onPointerDown={stop}
    // onTouchStart={stop}
    >
      {/* Zoom */}
      <div className="flex flex-col gap-2 bg-white/40 backdrop-blur-sm rounded-xl shadow p-1.5 md:p-2">
        <button
          className={btn}
          // disabled={zoom >= 18}
          onClick={(e) => handleZoom(e, 1)}
        >
          <Plus className="size-3 md:size-4" />
        </button>
        <button
          className={btn}
          // disabled={zoom <= 1}
          onClick={(e) => handleZoom(e, -1)}
        >
          <Minus className="size-3 md:size-4" />
        </button>
      </div>

      {/* Edit */}
      <div className="flex flex-col gap-2 bg-white/40 backdrop-blur-sm rounded-xl shadow p-1.5 md:p-2">
        <button className={btn} onClick={handleUndo}>
          <Undo2 className="size-3 md:size-4" />
        </button>
        <button className={btn} onClick={handleRedo}>
          <Redo2 className="size-3 md:size-4" />
        </button>
        {/* <button className={btn} onClick={handleReverse}>
          <ArrowLeftRight className="size-3 md:size-4" />
        </button> */}
        <button className={`${btn} text-red-500`} onClick={handleClear}>
          <Trash className="size-3 md:size-4" />
        </button>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2 bg-white/40 backdrop-blur-sm rounded-xl shadow p-1.5 md:p-2">
        <button className={btn} onClick={handleLocation}>
          <Locate className="size-3 md:size-4" />
        </button>
        {/* <button className={`${btn} text-blue-500`} onClick={handleSearch}>
          <Search className="size-3 md:size-4" />
        </button> */}
      </div>
    </div>
  );
}
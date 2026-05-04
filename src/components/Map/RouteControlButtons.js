"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function RouteControlButtons({
  waypoints,
  setWaypoints,
  undoStack,
  redoStack,
}) {
  const map = useMap();

  useEffect(() => {
    const control = L.control({ position: "topright" });

    control.onAdd = function () {
      const div = L.DomUtil.create("div", "leaflet-bar");

      div.style.display = "flex";
      div.style.flexDirection = "column";
      div.style.background = "white";

      // helper buat button
      const createBtn = (label, onClick) => {
        const btn = L.DomUtil.create("button", "");
        btn.innerHTML = label;
        btn.style.padding = "6px";
        btn.style.cursor = "pointer";
        btn.style.border = "none";
        btn.style.borderBottom = "1px solid #ddd";
        btn.style.background = "white";

        L.DomEvent.disableClickPropagation(btn);

        btn.onclick = (e) => {
          L.DomEvent.stopPropagation(e);
          onClick();
        };

        return btn;
      };

      // ↩️ UNDO
      const undoBtn = createBtn("↩️", () => {
        if (undoStack.current.length === 0) return;

        const prev = undoStack.current.pop();
        redoStack.current.push([...waypoints]);

        setWaypoints(prev);
      });

      // ↪️ REDO
      const redoBtn = createBtn("↪️", () => {
        if (redoStack.current.length === 0) return;

        const next = redoStack.current.pop();
        undoStack.current.push([...waypoints]);

        setWaypoints(next);
      });

      // 🗑️ CLEAR
      const clearBtn = createBtn("🗑️", () => {
        undoStack.current.push([...waypoints]);
        redoStack.current = [];

        setWaypoints([]);
      });

      div.appendChild(undoBtn);
      div.appendChild(redoBtn);
      div.appendChild(clearBtn);

      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, waypoints, setWaypoints, undoStack, redoStack]);

  return null;
}
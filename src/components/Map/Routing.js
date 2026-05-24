"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import polyline from "@mapbox/polyline";
import L from "leaflet";
import "leaflet-routing-machine";

const customRouter = {
  route: function (waypoints, callback, context) {
    this._pendingRequest = true;

    fetch("/api/ors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: waypoints.map(w => [w.latLng.lng, w.latLng.lat]),
        format: "geojson"
      }),
    })
      .then(res => res.json())
      .then(data => {
        this._pendingRequest = null;

        const route = data.routes[0];
        const decoded = polyline.decode(route.geometry);
        const coordinates = decoded.map(([lat, lng]) => ({
          lat,
          lng,
        }));

        const result = [{
          name: "Route",
          coordinates,
          instructions: [],
          summary: {
            totalDistance: route.summary.distance,
            totalTime: route.summary.duration,
          },
          inputWaypoints: waypoints,
          waypoints: waypoints,
        }];

        callback.call(context, null, result);
      })
      .catch(err => {
        this._pendingRequest = null;
        callback.call(context, err);
      });
  }
};

export default function Routing({
  waypoints,
  setWaypoints,
  undoStack,
  redoStack,
  setRouteData,
}) {
  const map = useMap();

  const routingControlRef = useRef(null);
  const isUpdatingRef = useRef(false);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const kmMarkersRef = useRef([]);

  // 🧩 HANDLE CLICK MAP
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.originalEvent?.target;

      // 🔥 cek apakah klik dari control UI
      if (target.closest(".map-control")) return;

      const { lat, lng } = e.latlng;
      const newPoint = L.latLng(lat, lng);

      undoStack.current.push([...waypoints]);
      redoStack.current = [];

      setWaypoints(prev => {
        const last = prev[prev.length - 1];

        if (last && last.distanceTo(newPoint) < 5) {
          return prev; // ignore kalau terlalu dekat
        }

        undoStack.current.push([...prev]);
        redoStack.current = [];

        return [...prev, newPoint];
      });
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [map, waypoints]);

  // 🔁 SYNC WAYPOINTS → ROUTING
  useEffect(() => {
    if (waypoints.length === 0) {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
      kmMarkersRef.current.forEach(m => m.remove());
      kmMarkersRef.current = [];
      return;
    }

    // buat control pertama kali
    if (!routingControlRef.current) {
      routingControlRef.current = L.Routing.control({
        waypoints,
        routeWhileDragging: false,
        // addWaypoints: false,
        // draggableWaypoints: false,
        itinerary: false,
        show: false,
        createMarker: () => null,
        lineOptions: {
          styles: [
            { color: "#000", weight: 7, opacity: 0.15 },
            { color: "#ff8126", weight: 3 },
          ],
        },
        // router: customRouter
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        })
      }).addTo(map);

      // 🔥 EXTRACT ROUTE DATA
      routingControlRef.current.on("routesfound", function (e) {
        const route = e.routes[0];

        const data = {
          coordinates: route.coordinates,
          distance: route.summary.totalDistance,
          duration: route.summary.totalTime,
        };

        if (setRouteData) setRouteData(data);

        // KM MARKERS
        kmMarkersRef.current.forEach(m => m.remove());
        kmMarkersRef.current = [];

        const coords = route.coordinates;
        let accumulated = 0;
        let nextKm = 1;

        for (let i = 1; i < coords.length; i++) {
          const segDist = L.latLng(coords[i - 1]).distanceTo(L.latLng(coords[i]));
          accumulated += segDist;

          while (accumulated >= nextKm * 1000) {
            const icon = L.divIcon({
              className: "",
              html: `<div style="width:20px;height:20px;border-radius:50%;background:#111;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.5);border:2px solid white">${nextKm}</div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            });
            kmMarkersRef.current.push(L.marker(coords[i], { icon, zIndexOffset: 5 }).addTo(map));
            nextKm++;
          }
        }
      });

      routingControlRef.current.on("waypointschanged", function (e) {
        if (isUpdatingRef.current) return;

        const newWaypoints = e.waypoints
          .filter(w => w.latLng)
          .map(w => w.latLng);

        // console.log({ newWaypoints });


        // setWaypoints(prev => {
        //   undoStack.current.push([...prev]);
        //   redoStack.current = [];
        //   return newWaypoints;
        // });
      });
    } else {
      // update waypoint
      isUpdatingRef.current = true;
      routingControlRef.current.setWaypoints(waypoints);
      isUpdatingRef.current = false;
    }
  }, [waypoints, map, setRouteData]);

  // START / END MARKERS
  useEffect(() => {
    const makeIcon = (color) => L.divIcon({
      className: "",
      html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    if (startMarkerRef.current) { startMarkerRef.current.remove(); startMarkerRef.current = null; }
    if (endMarkerRef.current) { endMarkerRef.current.remove(); endMarkerRef.current = null; }

    if (waypoints.length >= 1) {
      startMarkerRef.current = L.marker(waypoints[0], { icon: makeIcon("#dc2626"), zIndexOffset: 10 }).addTo(map);
    }
    if (waypoints.length >= 2) {
      endMarkerRef.current = L.marker(waypoints[waypoints.length - 1], { icon: makeIcon("#16a34a"), zIndexOffset: 10 }).addTo(map);
    }
  }, [waypoints, map]);

  return null;
}
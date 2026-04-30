"use client";

import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

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

  // 🧩 HANDLE CLICK MAP
  useEffect(() => {
    const handleClick = (e) => {
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
  // useEffect(() => {
  //   if (waypoints.length === 0) {
  //     if (routingControlRef.current) {
  //       map.removeControl(routingControlRef.current);
  //       routingControlRef.current = null;
  //     }
  //     return;
  //   }

  //   // buat control pertama kali
  //   if (!routingControlRef.current) {
  //     routingControlRef.current = L.Routing.control({
  //       waypoints,
  //       routeWhileDragging: false,
  //       // addWaypoints: false,
  //       // draggableWaypoints: false,
  //       itinerary: false,
  //       show: false,
  //       createMarker: () => null,

  //       lineOptions: {
  //         styles: [
  //           { color: "#000", weight: 7, opacity: 0.15 },
  //           { color: "#ff8126", weight: 3 },
  //         ],
  //       },

  //       router: L.Routing.osrmv1({
  //         serviceUrl: "https://router.project-osrm.org/route/v1",
  //       }),
  //     }).addTo(map);

  //     // 🔥 EXTRACT ROUTE DATA
  //     routingControlRef.current.on("routesfound", function (e) {
  //       const route = e.routes[0];

  //       const data = {
  //         coordinates: route.coordinates,
  //         distance: route.summary.totalDistance,
  //         duration: route.summary.totalTime,
  //       };

  //       console.log("ROUTE DATA:", data);

  //       if (setRouteData) {
  //         setRouteData(data);
  //       }
  //     });

  //     routingControlRef.current.on("waypointschanged", function (e) {
  //       if (isUpdatingRef.current) return;

  //       const newWaypoints = e.waypoints
  //         .filter(w => w.latLng)
  //         .map(w => w.latLng);

  //       setWaypoints(prev => {
  //         undoStack.current.push([...prev]);
  //         redoStack.current = [];
  //         return newWaypoints;
  //       });
  //     });
  //   } else {
  //     // update waypoint
  //     isUpdatingRef.current = true;
  //     routingControlRef.current.setWaypoints(waypoints);
  //     isUpdatingRef.current = false;
  //   }
  // }, [waypoints, map, setRouteData]);

  useEffect(() => {
    if (routingControlRef.current) return;

    routingControlRef.current = L.Routing.control({
      waypoints: [],
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

      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
    }).addTo(map);

    // extract route
    routingControlRef.current.on("routesfound", function (e) {
      const route = e.routes[0];

      setRouteData?.({
        coordinates: route.coordinates,
        distance: route.summary.totalDistance,
        duration: route.summary.totalTime,
      });
    });

    // sync drag → state
    routingControlRef.current.on("waypointschanged", function (e) {
      if (isUpdatingRef.current) return;

      const newWaypoints = e.waypoints
        .filter(w => w.latLng)
        .map(w => w.latLng);

      setWaypoints(prev => {
        undoStack.current.push([...prev]);
        redoStack.current = [];
        return newWaypoints;
      });
    });

    routingControlRef.current.on("routingerror", function (e) {
      console.warn("Routing error:", e.error);

      alert("Route tidak ditemukan, coba titik lain");
    });

  }, [map]);

  useEffect(() => {
    if (!routingControlRef.current) return;

    if (waypoints.length < 2) return; 

    isUpdatingRef.current = true;
    routingControlRef.current.setWaypoints(waypoints);
    isUpdatingRef.current = false;

  }, [waypoints]);

  return null;
}
"use client";

import { useEffect, useRef, useState } from "react";
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
  useEffect(() => {
    if (waypoints.length === 0) {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
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

        console.log("ROUTE DATA:", data);

        if (setRouteData) {
          setRouteData(data);
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


  return null;
}
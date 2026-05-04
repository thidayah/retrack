// "use client";

// import { useEffect, useRef, useState } from "react";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import Routing from "./Routing";

// // fix default icon path
// // delete L.Icon.Default.prototype._getIconUrl;

// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl:
// //     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
// //   iconUrl:
// //     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
// //   shadowUrl:
// //     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// // });

// // function ZoomControl() {
// //   const map = useMap();

// //   useEffect(() => {
// //     const zoomControl = L.control.zoom({
// //       position: "topright",
// //     });

// //     zoomControl.addTo(map);

// //     return () => {
// //       zoomControl.remove();
// //     };
// //   }, [map]);

// //   return null;
// // }

// function LocateControl() {
//   const map = useMap();

//   useEffect(() => {
//     const control = L.control({ position: "bottomright" });

//     control.onAdd = function () {
//       const div = L.DomUtil.create("div", "leaflet-bar");
//       L.DomEvent.disableClickPropagation(div);

//       div.style.background = "white";
//       div.style.padding = "6px";
//       div.style.cursor = "pointer";

//       div.innerHTML = "📍";

//       div.onclick = (e) => {
//         L.DomEvent.stopPropagation(e);
//         L.DomEvent.preventDefault(e);

//         if (!navigator.geolocation) {
//           alert("Geolocation not supported");
//           return;
//         }

//         // navigator.geolocation.getCurrentPosition(
//         //   (pos) => {
//         //     const { latitude, longitude } = pos.coords;

//         //     map.setView([latitude, longitude], 15);

//         //     L.marker([latitude, longitude])
//         //       .addTo(map)
//         //       .bindPopup("You are here")
//         //       .openPopup();
//         //   },
//         //   (err) => {
//         //     console.error(err);
//         //     alert("Failed to get location");
//         //   }
//         // );

//         let marker;
//         let circle;

//         navigator.geolocation.getCurrentPosition((pos) => {
//           const { latitude, longitude } = pos.coords;
//           const latlng = [latitude, longitude];

//           map.setView(latlng, 15);

//           // hapus sebelumnya
//           if (marker) map.removeLayer(marker);
//           if (circle) map.removeLayer(circle);

//           // 🔶 titik tengah
//           marker = L.circleMarker(latlng, {
//             radius: 5,
//             color: "#ff8126",
//             fillColor: "#ff8126",
//             fillOpacity: 1,
//             weight: 5,
//           }).addTo(map);

//           // 🔆 efek halo (memudar)
//           circle = L.circle(latlng, {
//             radius: 25, // meter (bisa kamu adjust)
//             color: "#ff8126",
//             fillColor: "#ff8126",
//             fillOpacity: 0.5,
//             weight: 0,
//           }).addTo(map);
//         });
//       };

//       return div;
//     };

//     control.addTo(map);

//     return () => {
//       control.remove();
//     };
//   }, [map]);

//   return null;
// }

// function RouteControlButtons({ setWaypoints, waypoints, undoStack, redoStack }) {
//   const map = useMap();

//   useEffect(() => {
//     const control = L.control({ position: "topright" });

//     control.onAdd = function () {
//       const div = L.DomUtil.create("div", "leaflet-bar");
//       div.style.display = "flex";
//       div.style.fontSize = "16px";
//       div.style.padding = "6px";
//       div.style.flexDirection = "column";

//       // 🔁 UNDO
//       const undoBtn = document.createElement("button");
//       undoBtn.innerHTML = "↩️";
//       undoBtn.onclick = (e) => {
//         L.DomEvent.stopPropagation(e);

//         if (undoStack.current.length === 0) return;

//         const prev = undoStack.current.pop();
//         redoStack.current.push([...waypoints]);
//         setWaypoints(prev);
//       };

//       // 🔄 REDO
//       const redoBtn = document.createElement("button");
//       redoBtn.innerHTML = "↪️";
//       redoBtn.onclick = (e) => {
//         L.DomEvent.stopPropagation(e);

//         if (redoStack.current.length === 0) return;

//         const next = redoStack.current.pop();
//         undoStack.current.push([...waypoints]);
//         setWaypoints(next);
//       };

//       // ❌ CLEAR
//       const clearBtn = document.createElement("button");
//       clearBtn.innerHTML = "🗑️";
//       clearBtn.onclick = (e) => {
//         L.DomEvent.stopPropagation(e);

//         undoStack.current.push([...waypoints]);
//         redoStack.current = [];
//         setWaypoints([]);
//       };

//       div.appendChild(undoBtn);
//       div.appendChild(redoBtn);
//       div.appendChild(clearBtn);

//       return div;
//     };

//     control.addTo(map);

//     return () => control.remove();
//   }, [map, waypoints, setWaypoints]);

//   return null;
// }

// // const [waypoints, setWaypoints] = useState([]);
// // const undoStack = useRef([]);
// // const redoStack = useRef([]);

// // function Routing({ setRouteData }) {
// //   const map = useMap();
// //   const routingControlRef = useRef(null);
// //   const waypointsRef = useRef([]);

// //   map.on("click", function (e) {
// //     const { lat, lng } = e.latlng;

// //     const newPoint = L.latLng(lat, lng);

// //     // simpan state lama ke undo
// //     undoStack.current.push([...waypoints]);

// //     // reset redo
// //     redoStack.current = [];

// //     const updated = [...waypoints, newPoint];
// //     setWaypoints(updated);
// //   });

// //   useEffect(() => {
// //     if (!routingControlRef.current && waypoints.length > 0) {
// //       routingControlRef.current = L.Routing.control({
// //         waypoints,
// //         itinerary: false,
// //         createMarker: () => null,
// //         lineOptions: {
// //           styles: [
// //             // { color: "#000", weight: 7, opacity: 0.15 },
// //             // { color: "#ff8126", weight: 4 },
// //             { color: "#ff8126", weight: 3 }, // utama
// //           ],
// //         },
// //         router: L.Routing.osrmv1({
// //           serviceUrl: "https://router.project-osrm.org/route/v1",
// //         }),
// //       }).addTo(map);
// //     } else if (routingControlRef.current) {
// //       routingControlRef.current.setWaypoints(waypoints);
// //     }
// //   }, [waypoints, map]);

// //   // useEffect(() => {
// //   //   map.on("click", function (e) {
// //   //     const { lat, lng } = e.latlng;

// //   //     console.log("CLICK:", lat, lng);

// //   //     waypointsRef.current.push(L.latLng(lat, lng));

// //   //     // kalau belum ada control → buat baru
// //   //     if (!routingControlRef.current) {
// //   //       routingControlRef.current = L.Routing.control({
// //   //         waypoints: waypointsRef.current,
// //   //         routeWhileDragging: false,
// //   //         addWaypoints: false,
// //   //         draggableWaypoints: false,
// //   //         createMarker: () => null,
// //   //         itinerary: false,
// //   //         show: false,

// //   //         lineOptions: {
// //   //           styles: [
// //   //             { color: "#ff8126", weight: 3 }, // utama
// //   //           ],
// //   //         },
// //   //         router: L.Routing.osrmv1({
// //   //           serviceUrl: "https://router.project-osrm.org/route/v1",
// //   //         }),
// //   //       }).addTo(map);

// //   //       routingControlRef.current.on("routesfound", function (e) {
// //   //         const route = e.routes[0];

// //   //         const data = {
// //   //           coordinates: route.coordinates,
// //   //           distance: route.summary.totalDistance,
// //   //           duration: route.summary.totalTime,
// //   //         };

// //   //         setRouteData(data);
// //   //       });
// //   //     } else {
// //   //       routingControlRef.current.setWaypoints(waypointsRef.current);
// //   //     }
// //   //   });

// //   //   return () => {
// //   //     map.off("click");
// //   //   };
// //   // }, [map]);

// //   return null;
// // }

// export default function MapView() {
//   const [routeData, setRouteData] = useState(null);


//   // console.log({ routeData });


//   return (
//     <MapContainer
//       // center={[-6.2, 106.8]}
//       center={[-6.8731786, 107.5365777]}
//       zoom={13}
//       zoomControl={true} // ✅ pastikan ini

//       className="h-full w-full"
//     >
//       <TileLayer
//         // attribution="&copy; OpenStreetMap"
//         // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap & Carto"
//         url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//       // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark mode
//       />
//       <Routing setRouteData={setRouteData} />
//       <LocateControl />
//       {/* {/* <ZoomControl /> Manual */}
//       {/* <RouteControlButtons
//         waypoints={waypoints}
//         setWaypoints={setWaypoints}
//         undoStack={undoStack}
//         redoStack={redoStack}
//       /> */}
//     </MapContainer>
//   );
// }

"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";

const MapViewInner = dynamic(() => import("./MapInner"), {
  ssr: false,
});

export default function MapView({ setRouteData }) {
  const [waypoints, setWaypoints] = useState([]);

  const undoStack = useRef([]);
  const redoStack = useRef([]);

  return (
    <MapViewInner
      waypoints={waypoints}
      setWaypoints={setWaypoints}
      undoStack={undoStack}
      redoStack={redoStack}
      setRouteData={setRouteData}
    />
  );
}
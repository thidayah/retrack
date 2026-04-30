
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
// 
export default function LocateControl() {
  const map = useMap();

  useEffect(() => {
    const control = L.control({ position: "bottomright" });

    control.onAdd = function () {
      const div = L.DomUtil.create("div", "leaflet-bar");
      L.DomEvent.disableClickPropagation(div);

      div.style.background = "white";
      div.style.padding = "6px";
      div.style.cursor = "pointer";

      div.innerHTML = "📍";

      div.onclick = (e) => {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);

        if (!navigator.geolocation) {
          alert("Geolocation not supported");
          return;
        }

        // navigator.geolocation.getCurrentPosition(
        //   (pos) => {
        //     const { latitude, longitude } = pos.coords;

        //     map.setView([latitude, longitude], 15);

        //     L.marker([latitude, longitude])
        //       .addTo(map)
        //       .bindPopup("You are here")
        //       .openPopup();
        //   },
        //   (err) => {
        //     console.error(err);
        //     alert("Failed to get location");
        //   }
        // );

        let marker;
        let circle;

        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          const latlng = [latitude, longitude];

          map.setView(latlng, 15);

          // hapus sebelumnya
          if (marker) map.removeLayer(marker);
          if (circle) map.removeLayer(circle);

          // 🔶 titik tengah
          marker = L.circleMarker(latlng, {
            radius: 12,
            // color: "#ff8126",
            color: "#ffffff",
            fillColor: "#006aff",
            fillOpacity: 1,
            weight: 4,
          }).addTo(map);

          // 🔆 efek halo (memudar)
          circle = L.circle(latlng, {
            radius: 24, // meter (bisa kamu adjust)
            color: "#006aff",
            fillColor: "#006aff",
            fillOpacity: 0.25,
            weight: 0,
          }).addTo(map);
        });
      };

      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map]);

  return null;
}
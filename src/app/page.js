"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/Map/MapView"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <MapView />
    </main>
  );
}
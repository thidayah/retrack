"use client";

import { useState } from "react";
import MapView from "@/components/Map/MapView";
import { generateTrackpoints, generateTrackpointsV2 } from "@/lib/generator/trackpoints";
import { generateGPX, downloadGPX } from "@/lib/gpx/gpx";
import { downloadTCX, generateTCX } from "@/lib/tcx/tcx";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  const [routeData, setRouteData] = useState(null);
  console.log({ routeData });

  const trackpoints = generateTrackpointsV2({
    coordinates: routeData?.coordinates,
    distance: routeData?.distance,
    // duration: "00:34:44",
    duration: "", // salah satu dengan avgPace
    avgPace: "06:32",
    avgHr: 156,
    avgCadence: 171,
    variability: 0.15,
    startTime: "2026-04-29T06:11:11", // WIB
  });

  const gpx = generateGPX(trackpoints, {
    name: "Tempo Run",
    desc: "Tempo",
    author: "Coros Pace Pro",
  });

  const handleDownloadGPX = () => {
    if (!routeData) return alert("Please create a route first!");
    downloadGPX(gpx, "activity.gpx");
  }

  const tcx = generateTCX(trackpoints, {
    name: "Tempo Run",
    sport: "Running",
    creator: "Coros Pace Pro",
  });

  const handleDownloadTCX = () => {
    if (!routeData) return alert("Please create a route first!");
    downloadTCX(tcx, "activity.tcx");
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <Hero />
      <MapSection />
      <Features />
      <HowItWorks />
      <Footer />

      <main className="flex flex-row items-start">
        <div className=" h-screen w-200">
          <MapView setRouteData={setRouteData} />
        </div>

        <button onClick={handleDownloadGPX}>Export GPX</button>
        <button onClick={handleDownloadTCX}>Export TCX</button>
      </main>
    </div>
  );
}
"use client";

import { useState } from "react";
import ActivityForm from "./ActivityForm";
import Stats from "./Stats";
import MapView from "./Map/MapView";
import { generateTCX } from "@/lib/tcx/tcx";
import { generateGPX } from "@/lib/gpx/gpx";
import { generateTrackpointsV2, generateTrackpointsV3 } from "@/lib/generator/trackpoints";
import { downloadFile, getDistance, getDurationFromDistanceAndPace, getLocalDateTime, getPaceFromDistanceAndDuration, meterToKm } from "@/helper";

export default function MapSection() {
  const [routeData, setRouteData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    startTime: getLocalDateTime(), // default now
    activityType: "Run",
    isDuration: true,
    duration: "01:15",
    pace: "06:45",
    heartRate: "145",
    cadence: "170",
    device: "",
    exportType: "GPX",
  });

  const handleDownload = () => {
    if (!routeData) return alert("Coba buat rutenya dulu yaa!");
    if (!form.name) return alert('Nama aktivitas harus diisi')
    if (!form.device) return alert('Pilih perangkat harus diisi')

    const trackpoints = generateTrackpointsV3({
      coordinates: routeData?.coordinates,
      // distance: routeData?.distance,
      type: form.activityType === 'Ride' ? 'ride' : 'run',
      duration: form.isDuration ? form.duration + ':00' : '',
      avgPaceOrSpeed: !form.isDuration ? form.pace : '',
      // avgPace: !form.isDuration ? form.pace : '',
      avgHr: form.heartRate,
      avgCadence: form.cadence,
      variability: 0.15,
      startTime: form.startTime, // WIB
    });

    let fileGenerate = null

    const typeGpxOrTcx = {
      Run: { gpx: 'running', tcx: 'Running' },
      Trailrun: { gpx: 'trail_running', tcx: 'Running' },
      Ride: { gpx: 'cycling', tcx: 'Biking' },
      Walk: { gpx: 'walking', tcx: 'Other' },
      Hike: { gpx: 'hiking', tcx: 'Other' },
    };

    const activityType = typeGpxOrTcx[form.activityType] || typeGpxOrTcx.Run;

    if (form.exportType === 'GPX') {
      fileGenerate = generateGPX(trackpoints, {
        name: form.name,
        desc: form.description,
        type: activityType.gpx,
        author: form.device,
      });
    }

    if (form.exportType === 'TCX') {
      fileGenerate = generateTCX(trackpoints, {
        type: activityType.tcx,
        author: form.device,
      });
    }

    downloadFile(fileGenerate, form.exportType.toLocaleLowerCase(), form.name);
  }

  const getRealDistance = () => {
    const coordinates = routeData?.coordinates || 0
    const segments = [];
    for (let i = 1; i < coordinates.length; i++) {
      segments.push(getDistance(coordinates[i - 1], coordinates[i]));
    }
    const totalDistance = segments.reduce((a, b) => a + b, 0);
    return totalDistance
  }

  const getTotalDistance = () => {
    const realDistance = getRealDistance()
    return meterToKm(realDistance || 0) + ' km'
  }

  const getTotalDuration = () => {
    let duration = form.duration
    if (form.isDuration) {
      duration = duration + ':00'
    } else {
      const realDistance = getRealDistance()
      const totalDuration = realDistance > 0 ?  getDurationFromDistanceAndPace(realDistance, form.pace, form.activityType.toLocaleLowerCase()) : 0
      duration = totalDuration // hitung durasi berdasarkan jarak dan pace
    }
    return duration;
  }

  const getAvgPace = () => {
    let avgPace = form.pace
    let format = form.activityType === 'Ride' ? ' km/h' : ' min/km'

    // if (!form.isDuration) {
    //   avgPace = avgPace
    // } else {
    if (form.isDuration) {
      const realDistance = getRealDistance()
      const getPace = realDistance > 0 ?
        getPaceFromDistanceAndDuration(realDistance, form.duration + ':00', form.activityType.toLocaleLowerCase())
        : '06:45'
      avgPace = getPace // hitung pace berdasarkan jarak dan durasi
    }
    return avgPace + format;
  }

  const getTotalElevation = () => {
    return '75 m';
  }

  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-20" id="activity">
      {/* <div className="grid grid-cols-[300px_1fr] gap-6"> */}
      <div className="flex flex-col-reverse lg:flex-row gap-6" >
        {/* LEFT PANEL */}
        <ActivityForm
          form={form}
          setForm={setForm}
          onDownload={handleDownload}
        />

        {/* RIGHT MAP */}
        {/* <div className="relative bg-gray-200 rounded-2xl col-span-6 md:col-span-4 h-200 md:h-auto"> */}
        <div className="relative bg-gray-200 rounded-2xl flex-5 h-200 lg:h-auto ">

          {/* <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Map Placeholder
          </div> */}

          <MapView setRouteData={setRouteData} />

          <Stats
            distance={getTotalDistance()}
            duration={getTotalDuration()}
            pace={getAvgPace()}
            elevation={getTotalElevation()}
          />
        </div>
      </div>
    </section>
  );
}
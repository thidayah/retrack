import { generateTrackpointsV2 } from "@/lib/generator/trackpoints";
import { Footprints, NotepadText, SportShoe, Mountain, Bike, MountainSnow, ChevronDown, Download } from "lucide-react";
import { useState } from "react";

export default function ActivityForm({ form, setForm, onDownload }) {

  const paceToSeconds = (pace = "04:00") => {
    const [minutes, seconds] = pace.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const secondsToPace = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(minutes)}:${pad(secs)}`;
  };

  const activityTypes = [
    { name: "Run", icon: <SportShoe /> },
    { name: "Trailrun", icon: <Mountain /> },
    { name: "Ride", icon: <Bike /> },
    { name: "Walk", icon: <Footprints /> },
    { name: "Hike", icon: <MountainSnow /> },
  ];

  const deviceOptions = [
    "Garmin Forerunner 255",
    "Garmin fēnix 7",
    "Garmin Instinct 2",
    "Garmin Enduro",
    "Coros",
    "Amazfit T-Rex 3",
    "Amazfit Active Max",
    // "Apple Watch",
    // "StravaGpx",
    "Strava App",
  ];

  return (
    // <div className="bg-white rounded-2xl border border-gray-200 shadow p-5 col-span-6 md:col-span-2">
    <div className="bg-white rounded-2xl border border-gray-200 shadow p-5 flex-2">
      <div className="space-y-4">
        <h3 className="font-semibold uppercase flex items-center gap-2">
          <NotepadText />
          Detail Aktivitas
        </h3>

        <div>
          <label className="block text-sm font-bold text-gray-700 pb-1">Nama Aktivitas</label>
          <input
            placeholder="Lari Pagi"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-primary/60"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 pb-1">Deskripsi <span className="text-gray-500 font-normal">(opsional)</span></label>
          <textarea
            placeholder="Jogging santai di Gasibu"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-primary/60"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 pb-1">Waktu Mulai</label>
          <input
            type="datetime-local"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-primary/60"
            value={form.startTime}
            onFocus={(e) => e.target.showPicker?.()}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          />
        </div>

        {/* Activity Type */}
        <div>
          <label className="block text-sm font-bold text-gray-700 pb-1">Tipe Aktivitas</label>
          <div className="grid grid-cols-5 gap-2">
            {activityTypes.map((item, index) => (
              <button
                key={index}
                className={` ${form.activityType === item.name ? 'border-primary text-primary' : 'border-gray-200'} border rounded-xl py-2 hover:bg-gray-100 flex justify-center flex-col items-center cursor-pointer gap-2`}
                onClick={() => setForm({ ...form, activityType: item.name, pace: item.name === 'Ride' ? '25' : '06:45' })}
              >
                {item.icon}
                <span className="font-bold text-xs">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Smart Input Toggle */}
        <div className="flex gap-2">
          <button
            className={`flex-1 py-2 border-b font-bold cursor-pointer ${form.isDuration ? 'text-primary' : 'bg-transparent text-gray-500'}`}
            value={form.duration}
            onClick={() => setForm({ ...form, isDuration: true })}
          >
            Input Durasi
          </button>
          <button
            className={`flex-1 py-2 border-b font-bold cursor-pointer ${!form.isDuration ? 'text-primary' : 'bg-transparent text-gray-500'}`}
            onClick={() => setForm({ ...form, isDuration: false })}
          >
            Input Pace
          </button>
        </div>

        {form.isDuration ? (
          // Duration
          <div>
            <label className="block text-sm font-bold text-gray-700 pb-1">Durasi</label>
            <div className=" flex items-center gap-2">
              <input
                type="time"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-primary/60"
                value={form.duration}
                onFocus={(e) => e.target.showPicker?.()}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
              <span className="text-sm text-gray-500">hh:mm</span>
            </div>
          </div>
        ) : (
          // Pace
          <div >
            <div className=" flex justify-between items-center">
              <label className="block text-sm font-bold text-gray-700 pb-1">Pace</label>
              <span className="text-sm text-gray-500">{form.pace || '05:35'} {form.activityType === 'Ride' ? 'km/h' : 'min/km'}</span>
            </div>
            <input
              type="range"
              className="w-full bg-linear-to-r from-primary/20 via-primary/90 to-primary appearance-none rounded-full h-1.5 cursor-pointer accent-primary"
              min={form.activityType === 'Ride' ? 10 : paceToSeconds("04:00")}
              max={form.activityType === 'Ride' ? 50 : paceToSeconds("20:00")}
              step="1"
              value={form.activityType === 'Ride' ? (parseInt(form.pace) || 25) : paceToSeconds(form.pace)}
              onChange={(e) => form.activityType === 'Ride' ? setForm({ ...form, pace: String(e.target.value) }) : setForm({ ...form, pace: secondsToPace(e.target.value) })}
            />
          </div>
        )}

        {/* HR */}
        <div>
          <div className=" flex justify-between items-center">
            <label className="block text-sm font-bold text-gray-700 pb-1">Heart Rate</label>
            <span className="text-sm text-gray-500">{form.heartRate || '145'} bpm</span>
          </div>
          <input
            type="range"
            min={90}
            max={210}
            className="w-full bg-linear-to-r from-primary/20 to-primary appearance-none rounded-full h-1.5 cursor-pointer accent-primary"
            value={form.heartRate}
            onChange={(e) => setForm({ ...form, heartRate: e.target.value })}
          />
        </div>

        {/* Cadence */}
        {form.activityType !== 'Ride' && (
          <div>
            <div className=" flex justify-between items-center">
              <label className="block text-sm font-bold text-gray-700 pb-1">Cadence</label>
              <span className="text-sm text-gray-500">{form.cadence || '170'} spm</span>
            </div>
            <input
              type="range"
              min={100}
              max={190}
              className="w-full bg-linear-to-r from-primary/20 via-primary/90 to-primary appearance-none rounded-full h-1.5 cursor-pointer accent-primary"
              value={form.cadence}
              onChange={(e) => setForm({ ...form, cadence: e.target.value })}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 pb-1">Perangkat</label>
          <div className="relative">
            <select
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-primary/60 appearance-none"
              value={form.device}
              onChange={(e) => setForm({ ...form, device: e.target.value })}
            >
              <option value="">Pilih Perangkat</option>
              {deviceOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className=" absolute size-5 right-2 top-2.5" />
          </div>
        </div>

        {/* Export */}
        <div>
          <label className="block text-sm font-bold text-gray-700 pb-1">Tipe Ekspor</label>
          <div className="flex gap-2">
            <button
              className={`flex-1 border rounded-lg py-2 hover:bg-gray-100 cursor-pointer text-xs font-semibold ${form.exportType === 'GPX' ? 'border-primary text-primary' : 'border-gray-200'}`}
              onClick={() => setForm({ ...form, exportType: 'GPX' })}
            >
              .GPX
            </button>
            <button
              className={`flex-1 border rounded-lg py-2 hover:bg-gray-100 cursor-pointer text-xs font-semibold ${form.exportType === 'TCX' ? 'border-primary text-primary' : 'border-gray-200'}`}
              onClick={() => setForm({ ...form, exportType: 'TCX' })}
            >
              .TCX
            </button>
          </div>
        </div>

        <button
          className="w-full bg-primary hover:bg-primary/75 text-white font-bold py-3 rounded-lg flex gap-2 items-center justify-center cursor-pointer mt-8"
          onClick={onDownload}
        >
          <Download className="size-5 font-bold" />
          Unduh Aktivitas
        </button>
      </div >
    </div >
  );
}
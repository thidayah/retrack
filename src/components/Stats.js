import { Clock, Gauge, MapPin, Mountain } from "lucide-react";

export default function Stats({ distance, duration, pace, elevation }) {
  const Item = ({ label, value, icon, color }) => (
    <div className="bg-white rounded-2xl shadow p-2 md:p-4 text-center md:text-left flex flex-col md:flex-row items-center justify-start md:justify-start gap-2 md:gap-4">
      <div className={`flex items-center justify-center ${color} p-2 md:p-4 border rounded-full size-8 md:w-14 md:h-14 `}>
        {icon}
      </div>
      <div>
        <div className="text-sm md:text-xl font-bold">{value}</div>
        <div className="text-gray-500 text-xs lg:text-sm">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4 px-2 py-4 md:p-4 absolute bottom-2 w-full z-20">
      <Item label="Total Jarak" value={distance} icon={<MapPin />} color="text-green-500 bg-green-500/10 border-green-500/20" />
      <Item label="Durasi Estimasi" value={duration} icon={<Clock />} color="text-blue-500 bg-blue-500/10 border-blue-500/20" />
      <Item label="Pace Rata-rata" value={pace} icon={<Gauge />} color="text-orange-500 bg-orange-500/10 border-orange-500/20" />
      {/* <Item label="Elevasi Gain" value={elevation} icon={<Mountain />} color="text-purple-500 bg-purple-500/10 border-purple-500/20" /> */}
    </div>
  );
}
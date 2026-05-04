import { Clock, Gauge, MapPin, Mountain } from "lucide-react";

export default function Stats() {
  const Item = ({ label, value, icon, color }) => (
    <div className="bg-white rounded-2xl shadow p-4 text-left flex flex-row items-center justify-start gap-4">
      <div className={`flex items-center justify-center ${color} p-4 border rounded-full w-14 h-14 `}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-500 text-sm">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-4 p-4 absolute bottom-0 w-full ">
      <Item label="Total Jarak" value="7.42 km" icon={<MapPin />} color="text-green-500 bg-green-500/10 border-green-500/20" />
      <Item label="Durasi Estimasi" value="01:02:30" icon={<Clock />} color="text-blue-500 bg-blue-500/10 border-blue-500/20" />
      <Item label="Pace Rata-rata" value="5:30/km" icon={<Gauge />} color="text-orange-500 bg-orange-500/10 border-orange-500/20" />
      <Item label="Elevasi Gain" value="68 m" icon={<Mountain />} color="text-purple-500 bg-purple-500/10 border-purple-500/20" />
    </div>
  );
}
import { MapIcon, Smartphone, Upload, Watch } from "lucide-react";

export default function Features() {
  const features = [
    "Nggak perlu smartwatch",
    "Perbaiki GPS error",
    "Mudah upload ke Strava",
  ];

  return (
    // {/* Tambahan sedikit "why retrack" ringkas di bawah hero agar seamless */}
    <section className="bg-gray-900 py-16 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-50">Kenapa Pakai <span className="text-primary">ReTrack?</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-2xl text-center hover:shadow-lg transition">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Watch className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-100">Nggak perlu smartwatch</h3>
            <p className="text-gray-400">Buat aktivitas kapan pun, di mana pun, tanpa perangkat mahal.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl text-center hover:shadow-lg transition">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapIcon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-100">Perbaiki aktivitas GPS bermasalah</h3>
            <p className="text-gray-400">GPS putus, baterai habis, atau data hilang? ReTrack solusinya!</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl text-center hover:shadow-lg transition">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-100">Mudah diunggah ke Strava</h3>
            <p className="text-gray-400">Ekspor file .GPX atau .TCX dan unggah langsung ke Strava.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
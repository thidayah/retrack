import { MapPin, Edit, FileText, Download, Upload } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: "Gambar rute di peta",
      description: "Klik di peta untuk menambahkan titik rute. Buat rute lari, bersepeda, atau hiking sesuai keinginanmu.",
      icon: MapPin,
    },
    {
      title: "Edit rute",
      description: "Edit rute yang telah dibuat dengan mudah. Tambahkan atau hapus titik rute sesuai kebutuhan.",
      icon: Edit,
    },
    {
      title: "Isi detail",
      description: "Isi detail rute seperti nama, deskripsi, dan tipe aktivitas.",
      icon: FileText,
    },
    {
      title: "Export file",
      description: "Ekspor rute yang telah dibuat ke format file yang dapat digunakan di aplikasi lain.",
      icon: Download,
    },
    {
      title: "Upload ke Strava",
      description: "Unggah file rute yang telah dibuat ke Strava dan bagikan aktivitasmu dengan teman-temanmu.",
      icon: Upload,
    }
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Cara Kerja <span className="text-primary">ReTrack?</span></h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-5 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-500 text-white rounded-full flex items-center justify-center mb-4">
              <step.icon size={24} />
            </div>
            <div className="w-6 h-6 mx-auto bg-green-600 text-white font-bold rounded-full flex items-center justify-center mb-2">
              {i + 1}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
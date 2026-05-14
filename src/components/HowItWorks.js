import { MapPin, Edit, FileText, Download, Upload, AlertTriangle } from 'lucide-react';

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
      description: "Unggah file rute yang telah dibuat ke website Strava dan bagikan aktivitasmu dengan teman-temanmu.",
      icon: Upload,
    }
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Cara Kerja <span className="text-primary">ReTrack?</span></h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="lg:text-center flex flex-row lg:flex-col  space-x-4">
            <div className="w-14 h-14 lg:w-16 lg:h-16 lg:mx-auto bg-gray-500 text-white rounded-full flex items-center justify-center lg:mb-4">
              <step.icon size={24} />
            </div>
            <div className=" flex flex-col w-4/5 lg:w-full">
              <div className=" flex flex-row gap-2 items-center lg:justify-center mb-2">
                <div className="w-6 h-6 bg-green-600 text-white font-bold rounded-full flex justify-center items-center  ">
                  {i + 1}
                </div>
                <h3 className="md:text-xl font-semibold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-sm md:text-base text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legal Disclaimer */}
      <div className="mt-12 mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
        <div className="shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-800 mb-1">Disclaimer</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            ReTrack hanya ditujukan untuk membantu pengguna yang aktivitas Strava-nya terputus akibat masalah teknis seperti GPS hilang atau baterai habis. Penggunaan alat ini untuk memalsukan aktivitas, manipulasi data, atau melanggar{' '}
            <a
              href="https://www.strava.com/legal/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-amber-900"
            >
              Ketentuan Layanan Strava
            </a>{' '}
            sepenuhnya menjadi tanggung jawab pengguna. Kami tidak bertanggung jawab atas penyalahgunaan aplikasi ini.
          </p>
        </div>
      </div>
    </section>
  );
}
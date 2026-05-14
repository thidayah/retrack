"use client";
import { Play } from 'lucide-react';

export default function Hero() {

  const scrollToActivity = () => {
    const activitysSection = document.getElementById('activity');
    if (activitysSection) {
      activitysSection.scrollIntoView({ behavior: 'smooth' });
      // window.scrollTo({
      //   top: 750,
      //   // left: 100,
      //   behavior: "smooth",
      // });
    }
  };

  return (
    <section style={{ backgroundImage: "url('/hero.webp')" }} className="relative overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 bg-cover bg-top ">
      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-20 h-150 md:h-200 flex ">
        <div className="grid lg:grid-cols-2 gap-12 md:items-center">
          {/* Left Column - Content */}
          <div className="space-y-4 flex flex-col mt-12 md:mt-0 md:justify-end">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 bg-[#FC4C02]/10 px-4 py-2 rounded-full text-[#FC4C02] text-sm font-semibold">
              <Activity className="w-4 h-4" />
              <span>Solusi untuk Strava keputus di tengah jalan</span>
            </div> */}

            {/* Main Heading */}
            <h1 className="text-3xl lg:text-5xl xl:text-7xl font-bold text-gray-800 ">
              <span className="text-primary">Strava</span> keputus <br />di tengah jalan?{' '}
            </h1>

            {/* Subheading */}
            <p className=" text-xs md:text-2xl font-semibold text-gray-800">
              Gengsi minta tag ke teman? <br />
              <span className=" text-green-600">Tenang, bikin ulang aktivitasmu disini!</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 md:mt-12">
              <button
                className="bg-primary text-white px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-lg hover:bg-primary/75 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                onClick={scrollToActivity}
              >
                <Play className="w-5 h-5" />
                Mulai Buat Aktivitas
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
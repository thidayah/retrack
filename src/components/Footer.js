export default function Footer() {
  return (
    <footer className=" bg-gray-100 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4 gap-6 lg:px-6 text-xs md:text-sm text-gray-500 flex flex-col md:flex-row md:justify-between items-start md:items-end">
        <p>
          <span className=" font-bold">© 2026 ReTrack — All rights reserved.</span>
          <br /> Buat ulang aktivitas Strava tanpa gengsi. Recover your ride, run, or hike.
        </p>
        <p>Dibuat dengan ☕️ oleh: <a className=" underline hover:text-primary cursor-pointer" href="https://thidayah.github.io/" target="_blank" rel="noopener noreferrer">@tukangetik</a></p>
      </div>
    </footer>
  );
}
export default function Footer() {
  return (
    <footer className=" bg-white py-8 text-sm ">
      <div className="container mx-auto px-6 text-gray-500 flex justify-between items-start">
        <p>
          <span className=" font-bold">© 2026 ReTrack — All rights reserved.</span>
          <br /> Buat ulang aktivitas Strava tanpa gengsi. Recover your ride, run, or hike.
        </p>
        <p>Dibuat dengan ☕️ oleh: <a className=" underline hover:text-primary cursor-pointer" href="https://thidayah.github.io/" target="_blank" rel="noopener noreferrer">@tukangetik</a></p>
      </div>
    </footer>
  );
}
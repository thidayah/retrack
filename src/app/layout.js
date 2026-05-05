import { Google_Sans } from 'next/font/google';
import "./globals.css";
import "leaflet/dist/leaflet.css";

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// const poppins = Poppins({
//   weight: ['300', '400', '500', '600', '700'],
//   subsets: ['latin'],
//   variable: '--font-poppins'
// });

const google_sans = Google_Sans({
  subsets: ['latin'],
  variable: '--font-google'
});

export const metadata = {
  title: "Retrack Web App",
  description: "Buat ulang aktivitas Strava tanpa gengsi. Recover your ride, run, or hike.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${google_sans.className}`} >
        {children}
      </body>
    </html>
  );
}

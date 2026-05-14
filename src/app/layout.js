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

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Retrack – Buat Ulang Aktivitas Strava yang Keputus",
  description: "GPS Strava kamu keputus di tengah jalan? Buat ulang aktivitas lari, sepeda, atau hiking kamu di Retrack tanpa perlu minta tag ke teman. Gratis dan mudah digunakan.",
  keywords: [
    "retrack strava",
    "buat ulang aktivitas strava",
    "strava keputus",
    "manual activity strava",
    "recover strava activity",
    "strava gps hilang",
    "buat aktivitas strava manual",
    "retrack",
    "strava indonesia",
    "upload gpx strava",
  ],
  alternates: {
    canonical: new URL(BASE_URL),
  },
  openGraph: {
    title: "Retrack – Buat Ulang Aktivitas Strava yang Keputus",
    description: "GPS Strava kamu keputus di tengah jalan? Gengsi minta tag ke teman? Tenang — bikin ulang aktivitas lari, sepeda, atau hiking kamu di Retrack. Gratis!",
    url: new URL(BASE_URL),
    siteName: "Retrack",
    images: [
      {
        url: "/thumbnail.webp",
        width: 800,
        height: 800,
        alt: "Retrack – Aplikasi untuk membuat ulang aktivitas Strava yang terputus",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retrack – Buat Ulang Aktivitas Strava yang Keputus",
    description: "GPS Strava keputus? Buat ulang aktivitas lari, sepeda, atau hiking kamu tanpa gengsi. Gratis di Retrack.",
    images: ["/thumbnail.webp"],
  },
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

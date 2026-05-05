
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header />
      <Hero />
      <MapSection />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}
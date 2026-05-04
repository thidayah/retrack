import ActivityForm from "./ActivityForm";
import Stats from "./Stats";
import MapControls from "./MapControls";

export default function MapSection() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-[380px_1fr] gap-6">
        {/* LEFT PANEL */}
        <ActivityForm />

        {/* RIGHT MAP */}
        <div className="relative bg-gray-200 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Map Placeholder
          </div>

          <MapControls />

          <Stats />
        </div>
      </div>
    </section>
  );
}
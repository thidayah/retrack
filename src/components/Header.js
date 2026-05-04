import Link from "next/link";
import { MapPinPen, Coffee } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      {/* <header className=" fixed w-full top-0 z-50"> */}
      <nav className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
  
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary w-8 h-8 rounded-xl flex items-center justify-center">
            <MapPinPen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-gray-900">Re<span className="text-primary">Track</span></span>
        </Link>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow transition cursor-pointer">
          <Coffee /> 
          {/* Traktir Kopi */}
        </button>
      </nav>
    </header>
  );
}
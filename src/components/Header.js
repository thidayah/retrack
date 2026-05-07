'use client';

import Link from "next/link";
import { MapPinPen, Coffee } from 'lucide-react';
import { useState } from 'react';
import CoffeeModal from './CoffeeModal';

export default function Header() {
  const [coffeeOpen, setCoffeeOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <nav className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">

          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary w-8 h-8 rounded-xl flex items-center justify-center">
              <MapPinPen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">Re<span className="text-primary">Track</span></span>
          </Link>

          <button
            onClick={() => setCoffeeOpen(true)}
            className="flex items-center gap-2 lg:px-4 lg:py-2 rounded-xl hover:shadow transition cursor-pointer"
          >
            <Coffee />
          </button>

        </nav>
      </header>

      <CoffeeModal isOpen={coffeeOpen} onClose={() => setCoffeeOpen(false)} />
    </>
  );
}

'use client';

import { X, Coffee } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CoffeeModal({ isOpen, onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) setImgLoaded(false);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="bg-amber-100 rounded-full p-3">
          <Coffee className="w-7 h-7 text-amber-600" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-gray-900">
            Jajanin Aku Kopi Dongsss
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Bikin aku semangat ngoding sambil ngopi — scan QR di bawah ya!
          </p>
        </div>

        {/* QR Code area */}
        <div className="w-full rounded-xl border-2 border-dashed border-primary/80 bg-amber-50 flex flex-col items-center justify-center gap-2 overflow-hidden">
          {!imgLoaded && (
            <div className="w-full h-80 bg-gray-300 animate-pulse rounded-xl" />
          )}
          <img
            src="/qris.png"
            alt="QR Donasi"
            className={`w-full object-contain rounded-xl transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0 h-0'}`}
            onLoad={() => setImgLoaded(true)}
          />

          {/* <Coffee className="w-10 h-10 text-amber-300" />
          <span className="text-xs text-amber-400 text-center px-2">
            Taruh QR code donasi kamu di sini
          </span> */}
        </div>

        {/* Footer note */}
        {/* <p className="text-xs text-gray-400 flex items-center gap-1">
          Dibuat dengan <Heart className="w-3 h-3 text-red-400 fill-red-400" /> oleh taufik
        </p> */}
      </div>
    </div>
  );
}

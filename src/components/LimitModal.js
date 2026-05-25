'use client';

import { X, Clock } from 'lucide-react';
import { useEffect } from 'react';

export default function LimitModal({ isOpen, onClose, expireAt }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (ts) => {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (ts) => {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="bg-blue-100 rounded-full p-3">
          <Clock className="w-7 h-7 text-blue-600" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-gray-900">
            Terima Kasih Sudah Menggunakan Aplikasi Ini!
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Kamu sudah mengunduh file hari ini. <strong>Sampai jumpa besok</strong>  — semoga aktivitasmu menyenangkan!
          </p>
        </div>

        

        <p className="text-xs text-gray-400 text-center">
          
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition cursor-pointer"
        >
          Oke
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const SESSION_KEY = "roesan_promo_hogar_shown";

export function PromoPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => setVisible(false)}
    >
      <div
        className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white rounded-full p-1 shadow-md transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
        <a
          href="https://wa.me/573126000414?text=Hola%2C+quiero+cotizar+mi+seguro+de+hogar"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setVisible(false)}
        >
          <Image
            src="/images/popup-hogar.jpg"
            alt="Protege tu Hogar - Roesan Seguros"
            width={600}
            height={600}
            className="w-full h-auto cursor-pointer"
            priority
          />
        </a>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface BrochureViewerProps {
  pdfUrl: string;
  fileName: string;
  title: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfjsLib: any;
  }
}

export default function BrochureViewer({ pdfUrl, fileName, title }: BrochureViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const PDFJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";
    const WORKER_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

    let cancelled = false;

    async function loadAndRender() {
      try {
        if (!window.pdfjsLib) {
          // Dynamic import from CDN
          const mod = await import(/* webpackIgnore: true */ PDFJS_CDN);
          window.pdfjsLib = mod;
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_CDN;
        }

        const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;
        if (cancelled) return;

        setPageCount(pdf.numPages);

        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          if (cancelled) return;

          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = "w-full h-auto block shadow-md rounded-sm mb-3";
          canvas.setAttribute("data-page", String(i));
          container.appendChild(canvas);

          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport }).promise;
          if (cancelled) return;

          setCurrentPage(i);
        }

        setLoading(false);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    loadAndRender();
    return () => { cancelled = true; };
  }, [pdfUrl]);

  return (
    <div className="relative min-h-screen bg-slate-100">
      {/* Sticky download bar */}
      <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <svg className="w-5 h-5 text-[#51408d] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              <path d="M8 15h8v1H8zm0-3h8v1H8zm0-3h5v1H8z"/>
            </svg>
            <span className="font-semibold text-slate-800 text-sm truncate">{title}</span>
            {!loading && pageCount > 0 && (
              <span className="text-xs text-slate-500 shrink-0 hidden sm:block">
                {pageCount} páginas
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/brochures"
              className="text-sm text-slate-500 hover:text-[#51408d] hidden sm:block transition-colors"
            >
              ← Brochures
            </Link>
            <a
              href={pdfUrl}
              download={fileName}
              className="flex items-center gap-2 bg-[#51408d] hover:bg-[#3d2f6b] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar PDF
            </a>
          </div>
        </div>
        {loading && pageCount > 0 && (
          <div className="h-1 bg-slate-200">
            <div
              className="h-1 bg-[#51408d] transition-all duration-300"
              style={{ width: `${(currentPage / pageCount) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* PDF pages */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {loading && pageCount === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <svg className="w-12 h-12 animate-spin mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            <p className="text-sm">Cargando brochure...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <svg className="w-16 h-16 text-slate-300 mb-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
            </svg>
            <p className="font-medium mb-2">No se pudo cargar el visor</p>
            <a
              href={pdfUrl}
              download={fileName}
              className="bg-[#51408d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3d2f6b] transition-colors"
            >
              Descargar PDF directamente
            </a>
          </div>
        )}

        <div ref={containerRef} className="space-y-3" />

        {!loading && !error && (
          <div className="text-center py-8">
            <a
              href={pdfUrl}
              download={fileName}
              className="inline-flex items-center gap-2 bg-[#51408d] hover:bg-[#3d2f6b] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar brochure completo
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

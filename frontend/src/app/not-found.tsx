"use client";

import { BoxIcon, GridIcon } from "@/icons/index";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8F9FC] flex items-center justify-center p-6 overflow-hidden font-outfit">

      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className={`relative z-10 max-w-2xl w-full text-center space-y-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Error Geometry */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-brand-600/10 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="relative flex items-center justify-center">
            <h1 className="text-[180px] md:text-[240px] font-black leading-none tracking-tighter text-gray-900/5 select-none italic">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32 md:w-48 md:h-48 group">
                <div className="absolute inset-0 border-2 border-dashed border-brand-500/20 rounded-[2.5rem] animate-spin-slow group-hover:border-brand-500/40 transition-colors" />
                <div className="absolute inset-4 border-2 border-brand-600/10 rounded-[2rem] animate-reverse-spin-slow" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BoxIcon className="w-16 h-16 md:w-24 md:h-24 text-brand-600 drop-shadow-[0_10px_30px_rgba(70,95,255,0.2)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase italic">Protocol Interrupted</h2>
            <p className="text-[14px] md:text-[16px] text-gray-400 font-bold uppercase tracking-[0.3em] leading-relaxed">
              The requested data node <span className="text-brand-600">does not exist</span> in the current schema.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-10 py-5 bg-brand-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[.25em] hover:bg-brand-700 shadow-2xl shadow-brand-600/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <GridIcon className="w-4 h-4" />
              Return to Core
            </Link>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-10 py-5 bg-white border border-gray-100 text-gray-400 rounded-2xl text-[11px] font-black uppercase tracking-[.25em] hover:bg-gray-50 transition-all active:scale-95"
            >
              Rollback Session
            </button>
          </div>
        </div>

        {/* System Status Footer */}
        <div className="pt-12 flex flex-col items-center gap-4 opacity-40">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">weMonks Core Engine v2.4.0</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-reverse-spin-slow {
          animation: reverse-spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

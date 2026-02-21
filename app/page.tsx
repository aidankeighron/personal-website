"use client";
import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#252525]">
      <div className="max-w-2xl animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#50DFB3] to-[#8E0092]">
          Aidan Keighron
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
          The next chapter of my digital journey is under construction. 
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 text-sm uppercase tracking-widest cursor-default">
            Coming Soon
          </div>
          
          <Link 
            href="/v1" 
            className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Explore v1.0</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#50DFB3] to-[#8E0092] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-xs tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Aidan Keighron
      </div>
      
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

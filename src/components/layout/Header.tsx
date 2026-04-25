import React from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-16 bg-zinc-900/90 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-4">
        <button className="bg-black/40 rounded-full p-1 hover:text-white text-zinc-400 transition cursor-not-allowed">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="bg-black/40 rounded-full p-1 hover:text-white text-zinc-400 transition cursor-not-allowed">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-zinc-300 font-semibold hover:text-white transition hover:scale-105">
          Sign up
        </button>
        <button className="bg-white text-black font-semibold rounded-full py-2 px-6 hover:scale-105 transition">
          Log in
        </button>
      </div>
    </header>
  );
};

import React from 'react';
import Link from 'next/link';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';
import { mockPlaylists } from '@/lib/data';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-zinc-950 flex flex-col h-full text-zinc-400">
      <div className="p-6">
        <Link href="/" className="text-white font-bold text-2xl flex items-center gap-2 mb-8 hover:text-white transition">
          <span className="bg-white text-black p-1 rounded-full w-8 h-8 flex items-center justify-center">L</span>
          Lowky Vibes
        </Link>

        <nav className="space-y-4">
          <Link href="/" className="flex items-center gap-4 text-zinc-100 hover:text-white transition font-semibold">
            <Home className="w-6 h-6" />
            Home
          </Link>
          <Link href="#" className="flex items-center gap-4 hover:text-white transition font-semibold">
            <Search className="w-6 h-6" />
            Search
          </Link>
          <Link href="#" className="flex items-center gap-4 hover:text-white transition font-semibold">
            <Library className="w-6 h-6" />
            Your Library
          </Link>
        </nav>
      </div>

      <div className="px-6 mt-4 space-y-4">
        <Link href="#" className="flex items-center gap-4 hover:text-white transition font-semibold">
          <div className="bg-zinc-300 text-black p-1 rounded-sm">
            <PlusSquare className="w-5 h-5" />
          </div>
          Create Playlist
        </Link>
        <Link href="#" className="flex items-center gap-4 hover:text-white transition font-semibold">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-400 text-white p-1 rounded-sm">
            <Heart className="w-5 h-5" />
          </div>
          Liked Songs
        </Link>
      </div>

      <div className="border-t border-zinc-800 mx-6 mt-6 pt-4 flex-1 overflow-y-auto min-h-0">
        <ul className="space-y-3">
          {mockPlaylists.map((playlist) => (
            <li key={playlist.id}>
              <Link href="#" className="hover:text-white transition text-sm">
                {playlist.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

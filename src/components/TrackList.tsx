"use client";

import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Track, usePlayerStore } from '@/store/usePlayerStore';

interface TrackListProps {
  tracks: Track[];
}

export const TrackList = ({ tracks }: TrackListProps) => {
  const { play, currentTrack, isPlaying } = usePlayerStore();

  const handlePlay = (track: Track) => {
    play(track, tracks);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-[16px_1fr_1fr_minmax(120px,1fr)_50px] gap-4 px-6 py-2 border-b border-zinc-800 text-sm text-zinc-400 mb-4 sticky top-16 bg-zinc-900 z-10">
        <div>#</div>
        <div>Title</div>
        <div>Album</div>
        <div>Date added</div>
        <div className="flex justify-center"><Clock className="w-4 h-4" /></div>
      </div>

      {/* Tracks */}
      <div className="px-4">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;

          return (
            <div
              key={track.id}
              className="grid grid-cols-[16px_1fr_1fr_minmax(120px,1fr)_50px] gap-4 px-2 py-2 rounded-md hover:bg-white/10 group cursor-pointer text-sm text-zinc-400 items-center transition-colors"
              onClick={() => handlePlay(track)}
            >
              {/* Number / Play Icon */}
              <div className="relative w-4 flex justify-center text-zinc-400">
                {isCurrentTrack && isPlaying ? (
                  <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" alt="playing" className="w-3 h-3" />
                ) : (
                  <>
                    <span className={`group-hover:hidden ${isCurrentTrack ? 'text-green-500' : ''}`}>{index + 1}</span>
                    <Play className="w-4 h-4 fill-white text-white hidden group-hover:block absolute top-1/2 -translate-y-1/2" />
                  </>
                )}
              </div>

              {/* Title & Artist */}
              <div className="flex items-center gap-3">
                <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded shadow" />
                <div className="truncate">
                  <div className={`font-medium truncate ${isCurrentTrack ? 'text-green-500' : 'text-white'}`}>
                    {track.title}
                  </div>
                  <div className="truncate group-hover:text-white transition-colors">
                    {track.artist}
                  </div>
                </div>
              </div>

              {/* Album */}
              <div className="truncate group-hover:text-white transition-colors">
                {track.album}
              </div>

              {/* Date Added (Mock) */}
              <div className="truncate">
                2 days ago
              </div>

              {/* Duration */}
              <div className="text-right tabular-nums">
                {formatTime(track.duration)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

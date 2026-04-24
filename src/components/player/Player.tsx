"use client";

import React, { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward,
  Shuffle, Repeat, Volume2, VolumeX, Mic2, MonitorSpeaker
} from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const Player = () => {
  const {
    currentTrack, isPlaying, progress, duration, volume,
    isShuffled, repeatMode,
    play, pause, resume, nextTrack, prevTrack,
    setVolume, seekTo, toggleShuffle, toggleRepeat
  } = usePlayerStore();

  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  if (!currentTrack) {
    return (
      <div className="h-24 bg-zinc-950 border-t border-zinc-800 flex items-center justify-center text-zinc-500 text-sm">
        Select a track to play
      </div>
    );
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSeekValue(val);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
    seekTo(seekValue);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const displayProgress = isSeeking ? seekValue : progress;

  return (
    <div className="h-24 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between px-4 z-50">
      {/* Left: Track Info */}
      <div className="flex items-center w-[30%] min-w-[180px]">
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="h-14 w-14 rounded-md object-cover shadow-lg"
        />
        <div className="ml-4 truncate">
          <div className="text-white text-sm font-semibold truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </div>
          <div className="text-zinc-400 text-xs truncate hover:underline cursor-pointer mt-0.5">
            {currentTrack.artist}
          </div>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center max-w-[40%] w-full">
        <div className="flex items-center gap-6 mb-2">
          <button
            onClick={toggleShuffle}
            className={`text-zinc-400 hover:text-white transition ${isShuffled ? 'text-green-500 hover:text-green-400' : ''}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={prevTrack}
            className="text-zinc-400 hover:text-white transition"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button
            onClick={isPlaying ? pause : resume}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={nextTrack}
            className="text-zinc-400 hover:text-white transition"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
          <button
            onClick={toggleRepeat}
            className={`text-zinc-400 hover:text-white transition ${repeatMode !== 'off' ? 'text-green-500 hover:text-green-400' : ''}`}
          >
            <Repeat className="w-4 h-4" />
            {repeatMode === 'track' && <span className="absolute text-[8px] font-bold -mt-2 ml-1.5 bg-zinc-950 rounded-full w-3 h-3 text-center text-green-500">1</span>}
          </button>
        </div>

        <div className="flex items-center w-full gap-2 text-xs text-zinc-400 font-medium">
          <span className="w-10 text-right">{formatTime(displayProgress)}</span>
          <div className="relative w-full h-1 bg-zinc-800 rounded-full group flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={displayProgress}
              onMouseDown={handleSeekStart}
              onChange={handleSeek}
              onMouseUp={handleSeekEnd}
              onTouchStart={handleSeekStart}
              onTouchEnd={handleSeekEnd}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className="absolute h-1 bg-white rounded-full group-hover:bg-green-500 transition-colors pointer-events-none"
              style={{ width: `${(displayProgress / (duration || 1)) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" />
            </div>
          </div>
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume & Extras */}
      <div className="flex items-center justify-end w-[30%] min-w-[180px] gap-3 text-zinc-400">
        <button className="hover:text-white transition"><Mic2 className="w-4 h-4" /></button>
        <button className="hover:text-white transition"><MonitorSpeaker className="w-4 h-4" /></button>
        <div className="flex items-center gap-2 w-24 group">
          <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="hover:text-white transition">
            {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <div className="relative w-full h-1 bg-zinc-800 rounded-full flex items-center">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className="absolute h-1 bg-white rounded-full group-hover:bg-green-500 transition-colors pointer-events-none"
              style={{ width: `${volume * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

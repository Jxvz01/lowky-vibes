"use client";

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';

export const AudioProvider = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = usePlayerStore(state => state.currentTrack);
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const volume = usePlayerStore(state => state.volume);
  const nextTrack = usePlayerStore(state => state.nextTrack);
  const setProgress = usePlayerStore(state => state.setProgress);
  const setDuration = usePlayerStore(state => state.setDuration);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setProgress, setDuration, nextTrack]);

  // Handle track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.src !== currentTrack.audioUrl) {
      audio.src = currentTrack.audioUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    }
  }, [currentTrack]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Handle volume
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  // Handle seeking (we'll need to subscribe to progress changes only if initiated by user,
  // but for a simple store, we can expose a function to seek explicitly in the store or component)
  // Sync seekTo from store
  useEffect(() => {
    return usePlayerStore.subscribe(
      (state) => {
        // If the jump is more than 1.5 second between audio element and store progress, assume it's a manual seek
        if (audioRef.current && Math.abs(state.progress - audioRef.current.currentTime) > 1.5) {
          audioRef.current.currentTime = state.progress;
        }
      }
    );
  }, []);

  return null;
};

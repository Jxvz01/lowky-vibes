import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
}

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  queueIndex: number;
  isPlaying: boolean;
  volume: number;
  progress: number; // in seconds
  duration: number; // in seconds
  isShuffled: boolean;
  repeatMode: 'off' | 'track' | 'list';

  // Actions
  play: (track: Track, newQueue?: Track[]) => void;
  pause: () => void;
  resume: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  seekTo: (progress: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  clearQueue: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  queueIndex: -1,
  isPlaying: false,
  volume: 1, // 0 to 1
  progress: 0,
  duration: 0,
  isShuffled: false,
  repeatMode: 'off',

  play: (track, newQueue) => set((state) => {
    let queue = state.queue;
    let queueIndex = state.queueIndex;

    if (newQueue) {
      queue = newQueue;
      queueIndex = newQueue.findIndex(t => t.id === track.id);
    } else if (state.queue.length === 0) {
      queue = [track];
      queueIndex = 0;
    } else {
      queueIndex = state.queue.findIndex(t => t.id === track.id);
      if(queueIndex === -1) {
        queue = [track];
        queueIndex = 0;
      }
    }

    return {
      currentTrack: track,
      queue,
      queueIndex,
      isPlaying: true,
      progress: 0
    };
  }),

  pause: () => set({ isPlaying: false }),
  resume: () => set((state) => ({ isPlaying: !!state.currentTrack })),

  nextTrack: () => set((state) => {
    if (state.queue.length === 0) return {};

    if (state.repeatMode === 'track') {
      return { progress: 0, isPlaying: true }; // Just replay current
    }

    let nextIndex = state.queueIndex + 1;

    if (nextIndex >= state.queue.length) {
      if (state.repeatMode === 'list') {
        nextIndex = 0;
      } else {
        return { isPlaying: false, progress: 0 }; // End of queue
      }
    }

    // Basic shuffle implementation (can be improved)
    if (state.isShuffled && state.queue.length > 1) {
      let randomIdx;
      do {
        randomIdx = Math.floor(Math.random() * state.queue.length);
      } while (randomIdx === state.queueIndex);
      nextIndex = randomIdx;
    }

    return {
      currentTrack: state.queue[nextIndex],
      queueIndex: nextIndex,
      isPlaying: true,
      progress: 0
    };
  }),

  prevTrack: () => set((state) => {
    if (state.queue.length === 0) return {};

    // If more than 3 seconds in, just restart the track
    if (state.progress > 3) {
      return { progress: 0 };
    }

    let prevIndex = state.queueIndex - 1;

    if (prevIndex < 0) {
      if (state.repeatMode === 'list') {
        prevIndex = state.queue.length - 1;
      } else {
        prevIndex = 0;
      }
    }

    return {
      currentTrack: state.queue[prevIndex],
      queueIndex: prevIndex,
      isPlaying: true,
      progress: 0
    };
  }),

  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  seekTo: (progress) => set({ progress }),

  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),

  toggleRepeat: () => set((state) => {
    const modes: ('off' | 'list' | 'track')[] = ['off', 'list', 'track'];
    const currentIdx = modes.indexOf(state.repeatMode);
    return { repeatMode: modes[(currentIdx + 1) % modes.length] };
  }),

  clearQueue: () => set({ queue: [], queueIndex: -1, currentTrack: null, isPlaying: false, progress: 0 })
}));

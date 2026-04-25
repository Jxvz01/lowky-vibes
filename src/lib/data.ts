import { Track } from '@/store/usePlayerStore';

export const mockTracks: Track[] = [
  {
    id: "1",
    title: "Lofi Study",
    artist: "FASSounds",
    album: "Chill Vibes",
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    duration: 146
  },
  {
    id: "2",
    title: "Good Night",
    artist: "FASSounds",
    album: "Midnight Sessions",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f92e?w=300&h=300&fit=crop",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_993abf22ce.mp3?filename=good-night-160166.mp3",
    duration: 147
  },
  {
    id: "3",
    title: "Chill Abstract",
    artist: "Coma-Media",
    album: "Abstract Sounds",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3",
    duration: 134
  },
  {
    id: "4",
    title: "Cali",
    artist: "Wataboi",
    album: "West Coast",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    audioUrl: "https://cdn.pixabay.com/download/audio/2021/04/07/audio_c6f2ea3058.mp3?filename=cali-1171.mp3",
    duration: 139
  },
  {
    id: "5",
    title: "Both of Us",
    artist: "Madirfan",
    album: "Together",
    coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=both-of-us-14037.mp3",
    duration: 154
  }
];

export const mockPlaylists = [
  {
    id: "p1",
    name: "Lofi Beats",
    description: "Chill beats to study and relax to.",
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&h=300&fit=crop",
    tracks: mockTracks
  },
  {
    id: "p2",
    name: "Focus Vibes",
    description: "Get in the zone.",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f92e?w=300&h=300&fit=crop",
    tracks: mockTracks.slice(1, 4)
  },
  {
    id: "p3",
    name: "Late Night Drive",
    description: "Cruising down the empty streets.",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    tracks: mockTracks.slice(2, 5)
  }
];

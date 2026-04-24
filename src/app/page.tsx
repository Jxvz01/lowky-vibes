import { Header } from '@/components/layout/Header';
import { TrackList } from '@/components/TrackList';
import { mockTracks } from '@/lib/data';

export default function Home() {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <Header />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{greeting()}</h1>

        {/* Featured Grid (Quick Picks) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {mockTracks.slice(0, 6).map((track) => (
            <div
              key={track.id}
              className="bg-white/5 hover:bg-white/10 transition-colors rounded-md overflow-hidden flex items-center group cursor-pointer"
            >
              <img src={track.coverUrl} alt={track.title} className="w-16 h-16 object-cover shadow-lg" />
              <div className="font-bold text-white ml-4 flex-1 truncate">{track.title}</div>
              <div className="w-12 h-12 flex items-center justify-center mr-2 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-xl translate-y-2 group-hover:translate-y-0 duration-300">
                <div className="bg-green-500 rounded-full p-3 shadow-lg">
                  <svg role="img" height="20" width="20" viewBox="0 0 24 24" className="fill-black"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Made for You / Recent */}
        <h2 className="text-2xl font-bold text-white mb-4 mt-12 hover:underline cursor-pointer inline-block">Made for You</h2>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {mockTracks.map((track) => (
            <div
              key={`card-${track.id}`}
              className="min-w-[160px] w-40 bg-zinc-900 hover:bg-zinc-800 transition-colors p-4 rounded-md cursor-pointer group"
            >
              <div className="relative mb-4">
                <img src={track.coverUrl} alt={track.title} className="w-full aspect-square object-cover rounded-md shadow-lg" />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-green-500 rounded-full p-3 shadow-xl">
                    <svg role="img" height="16" width="16" viewBox="0 0 24 24" className="fill-black"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
                  </div>
                </div>
              </div>
              <div className="font-semibold text-white truncate pb-1">{track.title}</div>
              <div className="text-sm text-zinc-400 truncate">{track.artist}</div>
            </div>
          ))}
        </div>

        {/* Track List */}
        <h2 className="text-2xl font-bold text-white mb-4 mt-8">All Tracks</h2>
        <TrackList tracks={mockTracks} />

      </main>
    </>
  );
}

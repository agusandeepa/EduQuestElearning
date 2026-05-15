// Map Section — chooser page: Sri Lanka Map & World Map
import { ArrowLeft, MapPin, Globe2 } from 'lucide-react';
import { HistoricalMap } from './historical-map';
import { WorldHistoricalMap } from './world-historical-map';
import { useState } from 'react';

interface MapSectionProps {
  onBack: () => void;
}

type MapView = 'menu' | 'srilanka' | 'world';

export function MapSection({ onBack }: MapSectionProps) {
  const [view, setView] = useState<MapView>('menu');

  if (view === 'srilanka') {
    return <HistoricalMap onBack={() => setView('menu')} />;
  }

  if (view === 'world') {
    return <WorldHistoricalMap onBack={() => setView('menu')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="h-5 w-px bg-white/20" />
          <h1 className="text-white font-bold text-lg">🗺️ Map Explorer</h1>
        </div>
      </div>

      {/* Hero text */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8 text-center">
        <p className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
          <Globe2 className="w-4 h-4" />
          Maps
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Explore the World
        </h2>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          Choose a map to explore.
        </p>
      </div>

      {/* Map cards */}
      <div className="max-w-4xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Sri Lanka Map Card */}
        <button
          onClick={() => setView('srilanka')}
          className="group rounded-3xl overflow-hidden shadow-2xl hover:shadow-green-500/25 hover:-translate-y-2 transition-all duration-300 text-left focus:outline-none focus:ring-4 focus:ring-green-500/40 bg-slate-800 border border-white/10"
        >
          <div className="relative h-52 overflow-hidden">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Sri_Lanka_location_map.svg/800px-Sri_Lanka_location_map.svg.png"
              alt="Sri Lanka Map"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Sri Lanka
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">Historical Map of Sri Lanka</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Explore the map of Sri Lanka — geography, regions and historical places.
            </p>
            <div className="w-full bg-green-500 group-hover:bg-green-400 transition-colors text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              Explore Sri Lanka Map
            </div>
          </div>
        </button>

        {/* World Map Card */}
        <button
          onClick={() => setView('world')}
          className="group rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-2 transition-all duration-300 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/40 bg-slate-800 border border-white/10"
        >
          <div className="relative h-52 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&q=80"
              alt="World Map"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              World View
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">World Historical Map</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Explore the world map — continents, countries and global geography.
            </p>
            <div className="w-full bg-blue-500 group-hover:bg-blue-400 transition-colors text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
              <Globe2 className="w-4 h-4" />
              Explore World Map
            </div>
          </div>
        </button>

      </div>
    </div>
  );
}

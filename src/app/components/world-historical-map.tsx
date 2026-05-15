// World Historical Map — real world map image only
import { ArrowLeft } from 'lucide-react';

interface WorldHistoricalMapProps {
  onBack: () => void;
}

export function WorldHistoricalMap({ onBack }: WorldHistoricalMapProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="h-5 w-px bg-white/20" />
          <h1 className="text-white font-bold text-lg">🌍 World Map</h1>
        </div>
      </div>

      {/* Map image — full screen */}
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2560px-World_map_-_low_resolution.svg.png"
          alt="World Map"
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
}

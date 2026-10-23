import React, { useState } from 'react';
import { Play, Flame, ExternalLink, X } from 'lucide-react';
import { VERIFIED_SHORTS, ShortItem } from '../config/creatorData';

export const ShortsSection: React.FC = () => {
  const [activeShort, setActiveShort] = useState<ShortItem | null>(null);

  return (
    <section className="py-20 relative bg-[#02050e] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Verified YouTube Shorts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Bite-Sized Insights
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md">
            Quick-fire price action setups, trading psychology reminders, and milestone lifestyle clips.
          </p>
        </div>

        {/* Shorts Horizontal / Grid Reel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {VERIFIED_SHORTS.map((short) => (
            <div
              key={short.id}
              onClick={() => setActiveShort(short)}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-red-500/50 cursor-pointer shadow-lg hover:shadow-red-950/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <img
                src={`https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`}
                alt={short.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* Red Shorts Badge */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-red-600/90 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-sm">
                <Flame className="w-3 h-3 fill-current" />
                <span>Shorts</span>
              </div>

              {/* Center Play Button on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/50 scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 inset-x-0 p-3.5">
                <span className="text-[11px] font-mono text-slate-300 block mb-1">
                  {short.views}
                </span>
                <h4 className="text-white text-xs sm:text-sm font-bold line-clamp-2 leading-tight group-hover:text-red-300 transition-colors">
                  {short.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shorts Modal Player */}
      {activeShort && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col">
            <button
              onClick={() => setActiveShort(null)}
              aria-label="Close shorts player"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeShort.id}?autoplay=1&rel=0`}
              title={activeShort.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
            <div className="p-3 bg-[#0a0f1d] border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white font-medium truncate pr-2">
                {activeShort.title}
              </span>
              <a
                href={`https://www.youtube.com/shorts/${activeShort.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 shrink-0"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

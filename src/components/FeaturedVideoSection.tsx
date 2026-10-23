import React, { useState } from 'react';
import { Play, ExternalLink, Maximize2, ShieldCheck, Film } from 'lucide-react';
import { VideoItem, VERIFIED_VIDEOS, CREATOR_CONFIG } from '../config/creatorData';

interface FeaturedVideoSectionProps {
  onExpandModal: (video: VideoItem) => void;
}

export const FeaturedVideoSection: React.FC<FeaturedVideoSectionProps> = ({ onExpandModal }) => {
  const featuredList = VERIFIED_VIDEOS.filter((v) => v.featured || v.id === 'mMEo3oKXrmQ');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(featuredList[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="featured" className="py-24 relative bg-[#02050f]/80 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>Cinematic Premieres</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Featured Experience
            </h2>
          </div>

          {/* Quick switcher buttons between featured videos */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {featuredList.map((video, idx) => {
              const active = selectedVideo.id === video.id;
              return (
                <button
                  key={video.id}
                  onClick={() => {
                    setSelectedVideo(video);
                    setIsPlaying(true);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/5'
                  }`}
                >
                  Feature #{idx + 1}: {video.categoryLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic 16:9 Screen Container */}
        <div className="relative group rounded-2xl p-1 bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] glow-blue">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="relative w-full h-full">
                {/* High-res thumbnail */}
                <img
                  src={`https://i.ytimg.com/vi/${selectedVideo.id}/hqdefault.jpg`}
                  alt={selectedVideo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-95 group-hover:scale-102 transition-transform duration-700"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20" />

                {/* Center Big Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    aria-label={`Play ${selectedVideo.title}`}
                    className="relative group/btn flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white shadow-[0_0_50px_rgba(59,130,246,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1" />
                    <span className="absolute -bottom-8 text-xs font-mono tracking-wider uppercase text-blue-200 opacity-0 group-hover/btn:opacity-100 transition-opacity">
                      Click to Play
                    </span>
                  </button>
                </div>

                {/* Top Badge Overlay */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Channel Video</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
                    {selectedVideo.duration}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 sm:bottom-8 inset-x-4 sm:inset-x-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-300 mb-2">
                      <span>{selectedVideo.categoryLabel}</span>
                      <span>·</span>
                      <span>{selectedVideo.views}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                      {selectedVideo.title}
                    </h3>
                    {selectedVideo.description && (
                      <p className="mt-2 text-sm text-slate-300/90 line-clamp-2">
                        {selectedVideo.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => onExpandModal(selectedVideo)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Cinema Mode</span>
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition-colors"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

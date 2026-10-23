import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, ExternalLink, Sparkles } from 'lucide-react';
import { VideoItem, VERIFIED_VIDEOS, CREATOR_CONFIG } from '../../config/creatorData';

interface Gallery3DProps {
  onSelectVideo: (video: VideoItem) => void;
}

export const Gallery3D: React.FC<Gallery3DProps> = ({ onSelectVideo }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Take top 6 high-impact verified videos for the 3D gallery
  const items = VERIFIED_VIDEOS.slice(0, 6);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Subtle auto-advance when not interacting
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#050b1d]/40 to-transparent">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Stage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Curated 3D Showcase
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Navigate through milestone breakdowns, price action strategies, and trader lifestyle journeys in perspective space.
          </p>
        </div>

        {/* 3D Perspective Stage Container */}
        <div
          className="relative h-[480px] sm:h-[540px] flex items-center justify-center perspective-[1200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {items.map((video, idx) => {
            // Calculate circular offset relative to activeIndex
            const count = items.length;
            let offset = (idx - activeIndex) % count;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isCurrent = offset === 0;
            const absOffset = Math.abs(offset);

            // Hide items further away than 2 units
            if (absOffset > 2) return null;

            // 3D positioning math
            const translateX = offset * 260; // horizontal spacing in px
            const translateZ = -absOffset * 180; // depth pushback
            const rotateY = -offset * 22; // perspective yaw rotation
            const scale = 1 - absOffset * 0.15;
            const opacity = 1 - absOffset * 0.28;
            const zIndex = 30 - absOffset * 10;

            return (
              <div
                key={video.id}
                onClick={() => {
                  if (isCurrent) {
                    onSelectVideo(video);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`absolute w-[300px] sm:w-[420px] md:w-[480px] rounded-2xl overflow-hidden cursor-pointer select-none border group ${
                  isCurrent
                    ? 'border-blue-500/50 shadow-[0_20px_50px_rgba(59,130,246,0.3)] ring-1 ring-blue-400/30'
                    : 'border-white/10 hover:border-blue-400/40 shadow-2xl'
                }`}
              >
                {/* Video Card Content */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark overlay scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Play badge button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                        isCurrent
                          ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/50 group-hover:scale-110 group-hover:bg-blue-500'
                          : 'bg-black/60 text-slate-300 group-hover:scale-105 group-hover:text-white'
                      }`}
                    >
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Duration and Category metadata */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md font-medium text-blue-300 border border-white/10">
                      {video.categoryLabel}
                    </span>
                    <span className="px-2 py-1 rounded bg-black/70 backdrop-blur-md font-mono tabular-nums text-slate-300 border border-white/10">
                      {video.duration || 'YouTube'}
                    </span>
                  </div>

                  {/* Bottom title & view counts */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-mono">
                      <span>{video.views}</span>
                      <span>·</span>
                      <span>{video.publishedDate}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 drop-shadow-sm group-hover:text-blue-300 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>

                {/* Card Action footer bar */}
                <div className="bg-slate-900/95 backdrop-blur-md px-4 py-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {isCurrent ? 'Click to Launch Cinema Player' : 'Click to Focus View'}
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3D Gallery Controls */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous video"
              className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-blue-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next video"
              className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-blue-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-500 font-mono">
            Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/10 text-slate-300">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/10 text-slate-300">→</kbd> arrow keys to navigate in 3D
          </p>
        </div>
      </div>
    </section>
  );
};

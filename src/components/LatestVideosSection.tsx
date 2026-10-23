import React, { useState } from 'react';
import { Play, ExternalLink, ArrowRight, Video } from 'lucide-react';
import { VideoItem, VERIFIED_VIDEOS, CREATOR_CONFIG } from '../config/creatorData';

interface LatestVideosSectionProps {
  onSelectVideo: (video: VideoItem) => void;
}

export const LatestVideosSection: React.FC<LatestVideosSectionProps> = ({ onSelectVideo }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'strategies' | 'vlogs' | 'crypto'>('all');

  const filteredVideos =
    activeFilter === 'all'
      ? VERIFIED_VIDEOS
      : VERIFIED_VIDEOS.filter((v) => v.category === activeFilter);

  const filters = [
    { id: 'all', label: 'All Releases' },
    { id: 'strategies', label: 'Trading Strategies' },
    { id: 'vlogs', label: 'Milestones & Vlogs' },
    { id: 'crypto', label: 'Crypto & USDT' },
  ] as const;

  return (
    <section id="videos" className="py-24 relative bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">
              <Video className="w-3.5 h-3.5" />
              <span>Public Video Archive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Latest Video Releases
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Authentic trading tutorials, compounding case studies, and transparent lifestyle updates from Rahul Midas.
            </p>
          </div>

          {/* Interactive Filter Tabs (Zero-Pill compliant button segmented bar) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
            {filters.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="group bg-[#080d1a] border border-white/10 hover:border-blue-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20 cursor-pointer flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-80" />

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono text-slate-200 border border-white/10">
                  {video.duration || 'YouTube'}
                </div>

                {/* Play Hover Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/50 scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Category label */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-medium text-blue-300 border border-white/10">
                  {video.categoryLabel}
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono">
                    <span>{video.views}</span>
                    <span>·</span>
                    <span>{video.publishedDate}</span>
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  )}
                </div>

                {/* Quick actions */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-blue-400 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Watch Now</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Videos CTA */}
        <div className="mt-14 text-center">
          <a
            href={CREATOR_CONFIG.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/15 hover:border-red-500/50 text-white font-semibold text-sm tracking-wide shadow-lg transition-all group"
          >
            <span>VIEW ALL 190+ VIDEOS ON YOUTUBE</span>
            <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

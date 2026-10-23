import React from 'react';
import { Play, Send, ChevronDown, ArrowUpRight } from 'lucide-react';
import { HeroScene } from './3d/HeroScene';
import { CREATOR_CONFIG } from '../config/creatorData';

interface HeroSectionProps {
  onWatchClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWatchClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* 3D WebGL Background Canvas */}
      <HeroScene />

      {/* Atmospheric radial glow and vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/40 to-[#030712] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Creator Kicker / Editorial Subtitle */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur-md text-xs font-mono text-blue-300 mb-6 shadow-lg shadow-black/40">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="tracking-widest uppercase">Official Creator Experience</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-display max-w-4xl leading-[1.05] drop-shadow-2xl">
          WELCOME TO THE WORLD OF{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            RAHUL MIDAS
          </span>
        </h1>

        {/* Supporting Headline */}
        <p className="mt-5 text-xl sm:text-2xl font-semibold tracking-wide text-blue-200/90 font-display">
          Watch. Explore. Connect.
        </p>

        {/* Supporting Text */}
        <p className="mt-3 text-slate-300/80 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Discover the videos, stories, and creator community of Rahul Midas.
        </p>

        {/* Primary and Secondary Action CTAs */}
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary CTA: Watch Latest Videos */}
          <button
            onClick={onWatchClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>WATCH LATEST VIDEOS</span>
          </button>

          {/* Secondary CTA: Join Telegram Community */}
          <a
            href={CREATOR_CONFIG.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/15 hover:border-purple-500/50 text-slate-100 hover:text-white font-bold text-sm tracking-wide backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <Send className="w-4 h-4 fill-current text-purple-400" />
            <span>JOIN TELEGRAM COMMUNITY</span>
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </a>
        </div>

        {/* Clean Unboxed Creator Proof Stats (Zero-Pill) */}
        <div className="mt-14 pt-8 border-t border-white/10 w-full max-w-2xl flex items-center justify-around text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
              {CREATOR_CONFIG.stats.subscribers}
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-0.5">
              Subscribers
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
              {CREATOR_CONFIG.stats.videos}
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-0.5">
              Channel Videos
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
              100% Verified
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-0.5">
              Creator Channel
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#featured"
          aria-label="Scroll to featured video"
          className="mt-12 text-slate-400 hover:text-white transition-colors flex flex-col items-center gap-1.5 focus:outline-none"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
        </a>
      </div>
    </section>
  );
};

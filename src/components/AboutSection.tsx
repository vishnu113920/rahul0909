import React from 'react';
import { Compass, TrendingUp, ShieldAlert, Users, Sparkles, Youtube, Send } from 'lucide-react';
import { CREATOR_CONFIG } from '../config/creatorData';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: TrendingUp,
      title: 'Price Action Precision',
      desc: 'Focusing on clean 1-minute candlestick confirmations, key support & resistance zones, and market flow rather than cluttered guesswork.',
    },
    {
      icon: ShieldAlert,
      title: 'Risk & Capital Discipline',
      desc: 'Trading requires strict money management. Real compounding is about preservation first, execution second, and zero reckless gambling.',
    },
    {
      icon: Compass,
      title: 'Transparent Milestones',
      desc: 'Documenting the unfiltered journey—from humble beginnings to personal dream house tours, travel vlogs, and real lifestyle upgrades.',
    },
    {
      icon: Users,
      title: 'Community-Driven Knowledge',
      desc: 'Building an active space where like-minded market enthusiasts exchange observations, learn chart discipline, and grow together.',
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#040816] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Abstract 3D Holographic Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-purple-500/30 shadow-2xl">
              <div className="relative rounded-[22px] bg-[#070d1e] overflow-hidden p-8 sm:p-10 border border-white/10 flex flex-col justify-between min-h-[460px]">
                {/* Background decorative grid and glow */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
                    Creator Profile
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                </div>

                {/* Center Abstract Monogram / Geometric Visual */}
                <div className="relative z-10 my-8 flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-2xl shadow-blue-600/30 mb-6 group">
                    <div className="w-full h-full rounded-[22px] bg-[#050917] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
                      <span className="text-4xl font-black font-display tracking-wider bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        RM
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-white font-display tracking-tight">
                    {CREATOR_CONFIG.name}
                  </h3>
                  <p className="text-xs font-mono text-blue-400 mt-1">
                    {CREATOR_CONFIG.handle} · YouTube Creator
                  </p>
                </div>

                {/* Card Bottom Meta */}
                <div className="relative z-10 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-black text-white font-display tabular-nums">
                      {CREATOR_CONFIG.stats.subscribers}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Subscribers
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-white font-display tabular-nums">
                      {CREATOR_CONFIG.stats.videos}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Videos Published
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Pillars */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vision & Journey</span>
            </div>

            {/* Requested Section Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display uppercase leading-tight mb-6">
              MORE THAN CONTENT.{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                A CREATOR EXPERIENCE.
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Rahul Midas shares an authentic window into high-pace market charts, short-duration strategy frameworks, and practical crypto execution. With over 210,000 subscribers, his channel documents both the disciplined mechanics of price action and the real-world freedom it unlocks.
            </p>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#070d1e]/80 border border-white/5 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold text-sm sm:text-base mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={CREATOR_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-red-600/20 transition-all"
              >
                <Youtube className="w-4 h-4" />
                <span>Visit YouTube Channel</span>
              </a>
              <a
                href={CREATOR_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-blue-500/40 text-slate-200 text-xs font-semibold tracking-wide transition-all"
              >
                <Send className="w-4 h-4 text-blue-400" />
                <span>Join Official Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

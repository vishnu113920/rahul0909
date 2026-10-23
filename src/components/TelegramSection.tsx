import React from 'react';
import { Send, ArrowUpRight, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { CommunityScene } from './3d/CommunityScene';
import { CREATOR_CONFIG } from '../config/creatorData';

export const TelegramSection: React.FC = () => {
  return (
    <section id="community" className="py-28 relative bg-[#020510] overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left / Center 3D Interactive Holographic Sphere */}
          <div className="lg:col-span-6 h-[380px] sm:h-[460px] relative flex items-center justify-center">
            {/* The 3D Scene */}
            <div className="w-full h-full relative">
              <CommunityScene />
            </div>

            {/* Subtle floating badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-mono text-blue-300 flex items-center gap-2 shadow-xl whitespace-nowrap">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Real-Time Broadcast & Community Hub</span>
            </div>
          </div>

          {/* Right Floating Glass CTA Panel */}
          <div className="lg:col-span-6">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-[#090e1f]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] glow-border">
              {/* Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-3">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Direct Creator Channel</span>
              </div>

              {/* Main Section Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight uppercase leading-tight">
                THE COMMUNITY IS WAITING.
              </h2>

              {/* Supporting Copy */}
              <p className="mt-4 text-base sm:text-lg font-medium text-blue-200/90 font-display">
                Stay connected. Explore updates. Join the conversation.
              </p>

              <p className="mt-2 text-sm text-slate-300/80 leading-relaxed">
                Connect directly with the official community channel. Receive market alerts, video release notifications, session announcements, and community discussions.
              </p>

              {/* Community Pillars */}
              <div className="my-7 space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Verified Official Invitation Link (@rahulmidas)</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span>Immediate alerts on new strategy breakdowns & YouTube releases</span>
                </div>
              </div>

              {/* High-Converting CTA Button */}
              <div className="space-y-3">
                <a
                  href={CREATOR_CONFIG.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <Send className="w-4 h-4 fill-current" />
                  <span>JOIN THE TELEGRAM COMMUNITY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* Mandatory Redirect Disclaimer Caption */}
                <p className="text-center text-xs text-slate-400 font-mono">
                  You will be redirected to Telegram.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Youtube, Send, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { CREATOR_CONFIG } from '../config/creatorData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02040b] border-t border-white/10 text-slate-400 text-sm">
      {/* Final Callout Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-slate-900/40 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2 block">
              Join 210K+ Followers
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              Start Exploring With Rahul Midas Today
            </h3>
            <p className="mt-2 text-slate-300/80 text-sm leading-relaxed">
              Dive into 190+ video tutorials, market breakdowns, and daily updates in the community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={CREATOR_CONFIG.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-red-600/20 transition-all"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={CREATOR_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/20 transition-all"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Telegram Channel</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xl font-extrabold text-white">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-black">
                RM
              </span>
              <span className="font-display tracking-wider">
                RAHUL<span className="text-blue-400 ml-1.5 font-light">MIDAS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The official 3D creator experience for Rahul Midas ({CREATOR_CONFIG.handle}). Educational trading breakdowns, price action tutorials, and personal lifestyle vlogs.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CREATOR_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-red-400 border border-white/5 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={CREATOR_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Community"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-blue-400 border border-white/5 flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#hero" className="hover:text-blue-400 transition-colors">
                  Top of Experience
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-blue-400 transition-colors">
                  Featured Premiere
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-blue-400 transition-colors">
                  Latest Video Archive
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-blue-400 transition-colors">
                  Interactive 3D Stage
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  About Rahul Midas
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-blue-400 transition-colors">
                  Telegram Community
                </a>
              </li>
            </ul>
          </div>

          {/* Official Verification */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
              Verified Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href={CREATOR_CONFIG.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>youtube.com/@rahulmidas</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={CREATOR_CONFIG.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>t.me/+VwqCkyl3v_c4OWY1</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Public Channel Records</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Financial Risk Disclaimer (Mandatory & Ethical) */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 text-[11px] text-slate-400 leading-relaxed space-y-2 mb-8 font-mono">
          <p className="font-bold text-slate-300">
            DISCLAIMER & RISK WARNING:
          </p>
          <p>
            Trading in financial markets, binary options (e.g. Pocket Option), foreign exchange, and digital assets carries a very high level of risk and may not be suitable for all individuals. A substantial percentage of retail traders lose capital. All materials, videos, strategies, and case studies presented on this website and associated channels are strictly for educational and entertainment purposes and do not constitute financial, investment, or trading advice. Past performance is no guarantee of future results. Never trade with capital you cannot afford to lose.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Rahul Midas Creator Experience. All public video rights belong to Rahul Midas.
          </p>
          <p className="flex items-center gap-1">
            Built with Three.js & React
          </p>
        </div>
      </div>
    </footer>
  );
};

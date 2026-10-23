import React, { useState, useEffect } from 'react';
import { Send, Menu, X, ArrowUpRight } from 'lucide-react';
import { CREATOR_CONFIG } from '../config/creatorData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Featured', href: '#featured' },
    { label: 'Videos', href: '#videos' },
    { label: '3D Stage', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Community', href: '#community' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-lg sm:text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-1"
        >
          <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            RM
          </span>
          <span className="font-display tracking-wider">
            RAHUL<span className="text-blue-400 ml-1.5 font-light">MIDAS</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links (single-line, concise) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 relative py-1 focus:outline-none focus:text-blue-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Join Telegram) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={CREATOR_CONFIG.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-blue-600/20 transition-all hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap shrink-0"
          >
            <Send className="w-3.5 h-3.5 fill-current" />
            <span>Join Telegram</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050914]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-white/5 hover:text-blue-400 font-medium text-base transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 mt-1">
              <a
                href={CREATOR_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-blue-600/30"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Join Official Telegram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

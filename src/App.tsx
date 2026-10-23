import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedVideoSection } from './components/FeaturedVideoSection';
import { LatestVideosSection } from './components/LatestVideosSection';
import { Gallery3D } from './components/3d/Gallery3D';
import { ShortsSection } from './components/ShortsSection';
import { AboutSection } from './components/AboutSection';
import { TelegramSection } from './components/TelegramSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { VideoItem, VERIFIED_VIDEOS } from './config/creatorData';

export default function App() {
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

  const handleWatchLatest = () => {
    // Smooth scroll down to the Featured / Latest Videos section
    const target = document.getElementById('featured');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Hero Section with Interactive 3D Stage */}
      <HeroSection onWatchClick={handleWatchLatest} />

      {/* Featured Video Premiere with Live Embedded Player */}
      <FeaturedVideoSection onExpandModal={(video) => setActiveModalVideo(video)} />

      {/* Latest Videos Archive with Filter Tabs */}
      <LatestVideosSection onSelectVideo={(video) => setActiveModalVideo(video)} />

      {/* Standout 3D Video Perspective Gallery */}
      <Gallery3D onSelectVideo={(video) => setActiveModalVideo(video)} />

      {/* Verified YouTube Shorts Reel */}
      <ShortsSection />

      {/* About Rahul Midas Section */}
      <AboutSection />

      {/* High-Converting 3D Telegram Community Section */}
      <TelegramSection />

      {/* Professional Footer & Disclaimers */}
      <Footer />

      {/* Cinematic Modal Player */}
      <VideoModal
        video={activeModalVideo}
        onClose={() => setActiveModalVideo(null)}
      />
    </div>
  );
}

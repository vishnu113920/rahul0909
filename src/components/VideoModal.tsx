import React, { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { VideoItem, CREATOR_CONFIG } from '../config/creatorData';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-video-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-5xl bg-[#090d16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#060a12]">
          <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official YouTube Player · {CREATOR_CONFIG.name}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video player"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 Video Aspect Container */}
        <div className="relative aspect-video bg-black w-full overflow-hidden">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Bottom Details & Meta */}
        <div className="p-5 sm:p-6 bg-[#090d16]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
                  {video.categoryLabel}
                </span>
                <span>{video.views}</span>
                <span>·</span>
                <span>{video.publishedDate}</span>
              </div>
              <h3 id="modal-video-title" className="text-lg sm:text-xl font-bold text-white leading-snug">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-sm text-slate-400 line-clamp-2">
                  {video.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-red-600/20"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

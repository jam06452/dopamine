import { useState, useEffect } from 'react';
import { useVideoUrls } from './hooks/useVideoUrls';
import { useMutedState } from './hooks/useMutedState';
import { SettingsMenu } from './components/SettingsMenu';
import { VideoGrid } from './components/VideoGrid';
import './App.css';

export default function App() {
  const { urls, handleUrlChange } = useVideoUrls();
  const { muted, setMuted } = useMutedState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState<{ videoId: string; index: number } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenVideo) {
          setFullscreenVideo(null);
        } else if (menuOpen) {
          setMenuOpen(false);
        }
      }
      if (e.key === 'f' && !menuOpen) {
        e.preventDefault();
        setFullscreenVideo(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, fullscreenVideo]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white p-0 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-50">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            className="settings-btn"
            title="Settings (Press ESC to close)"
            aria-label="Open settings menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v2m0 4v2m4-6h2M6 12H4"
              />
              <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
            </svg>
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <SettingsMenu
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                muted={muted}
                onMutedToggle={() => setMuted((m) => !m)}
                urls={urls}
                onUrlChange={handleUrlChange}
              />
            </>
          )}
        </div>
      </div>

      <VideoGrid
        urls={urls}
        muted={muted}
        onVideoFullscreen={(videoId, index) => setFullscreenVideo({ videoId, index })}
      />

      {fullscreenVideo && (
        <>
          <div
            className="fixed inset-0 bg-black/90 z-40"
            onClick={() => setFullscreenVideo(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setFullscreenVideo(null)}
              className="absolute top-4 right-4 text-white hover:text-zinc-300 transition text-2xl"
              title="Exit fullscreen (ESC or F)"
              aria-label="Exit fullscreen"
            >
              ✕
            </button>
            <div className="w-full h-full max-w-4xl max-h-[90vh]">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${fullscreenVideo.videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${fullscreenVideo.videoId}&controls=1&modestbranding=1`}
                title={`Video ${fullscreenVideo.index + 1} fullscreen`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

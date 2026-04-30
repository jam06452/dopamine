import { useState } from 'react';
import { extractYouTubeId } from '../utils/youtube';

interface VideoCardProps {
  url: string;
  videoIndex: number;
  muted: boolean;
  onFullscreen?: (videoId: string, index: number) => void;
}

export function VideoCard({ url, videoIndex, muted, onFullscreen }: VideoCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoId = extractYouTubeId(url || '');

  const handleDoubleClick = () => {
    if (videoId && onFullscreen) {
      onFullscreen(videoId, videoIndex);
    }
  };

  return (
    <div
      className="video-card video-cell relative overflow-hidden bg-black cursor-pointer group"
      onDoubleClick={handleDoubleClick}
      title="Double-click to fullscreen"
    >
      {videoId ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 animate-pulse z-10 flex items-center justify-center">
              <div className="text-zinc-400 text-sm">Loading...</div>
            </div>
          )}
          <iframe
            className="video-frame"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=1&modestbranding=1`}
            title={`Video ${videoIndex + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            ⛶ Fullscreen
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-sm text-zinc-400">
          No video
        </div>
      )}
    </div>
  );
}

import { extractYouTubeId } from '../utils/youtube';

interface VideoCardProps {
  url: string;
  videoIndex: number;
  muted: boolean;
}

export function VideoCard({ url, videoIndex, muted }: VideoCardProps) {
  const videoId = extractYouTubeId(url || '');

  return (
    <div className="video-card video-cell relative overflow-hidden bg-black">
      {videoId ? (
        <iframe
          className="video-frame"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=1&modestbranding=1`}
          title={`Video ${videoIndex + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="flex items-center justify-center h-full text-sm text-zinc-400">
          No video
        </div>
      )}
    </div>
  );
}

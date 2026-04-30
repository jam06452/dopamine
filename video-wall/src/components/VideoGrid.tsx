import { VideoCard } from './VideoCard';

interface VideoGridProps {
  urls: string[];
  muted: boolean;
  onVideoFullscreen?: (videoId: string, index: number) => void;
}

export function VideoGrid({ urls, muted, onVideoFullscreen }: VideoGridProps) {
  return (
    <main className="quad-grid">
      {urls.map((url, index) => (
        <VideoCard
          key={`${index}-${url}`}
          url={url}
          videoIndex={index}
          muted={muted}
          onFullscreen={onVideoFullscreen}
        />
      ))}
    </main>
  );
}

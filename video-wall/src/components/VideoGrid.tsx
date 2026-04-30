import { VideoCard } from './VideoCard';

interface VideoGridProps {
  urls: string[];
  muted: boolean;
}

export function VideoGrid({ urls, muted }: VideoGridProps) {
  return (
    <main className="quad-grid">
      {urls.map((url, index) => (
        <VideoCard key={index} url={url} videoIndex={index} muted={muted} />
      ))}
    </main>
  );
}

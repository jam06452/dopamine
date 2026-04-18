import { VIDEO_CONFIG } from './config';
import './App.css'

function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function App() {
  return (
    <div className="h-screen w-screen bg-black p-4">
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-2 border-2 border-zinc-800 rounded-3xl overflow-hidden">
        {VIDEO_CONFIG.map((url, i) => {
          const videoId = extractYouTubeId(url);
          return (
            <div key={i} className="relative w-full h-full bg-zinc-900 overflow-hidden">
              {videoId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1`}
                  title={`Video ${i + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-lg">
                  Invalid URL
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

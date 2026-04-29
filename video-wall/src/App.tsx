import { useState, useEffect } from 'react'
import { VIDEO_CONFIG } from './config';
import './App.css'

function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function App() {
  const defaultUrls = () => {
    const init = [...VIDEO_CONFIG].slice(0, 4)
    while (init.length < 4) init.push('')
    return init
  }

  const loadUrls = () => {
    try {
      const raw = localStorage.getItem('videoWall.urls')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          const a = parsed.slice(0, 4)
          while (a.length < 4) a.push('')
          return a
        }
      }
    } catch (e) {
      // ignore
    }
    return defaultUrls()
  }

  const [urls, setUrls] = useState<string[]>(() => {
    if (typeof window === 'undefined') return defaultUrls()
    return loadUrls()
  })

  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    try {
      const raw = localStorage.getItem('videoWall.muted')
      return raw ? JSON.parse(raw) : true
    } catch (e) { return true }
  })

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const handleUrlChange = (index: number, value: string) => {
    setUrls(prev => {
      const copy = [...prev]
      copy[index] = value
      return copy
    })
  }

  useEffect(() => {
    try { localStorage.setItem('videoWall.urls', JSON.stringify(urls)) } catch {}
  }, [urls])

  useEffect(() => {
    try { localStorage.setItem('videoWall.muted', JSON.stringify(muted)) } catch {}
  }, [muted])

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white p-0 relative overflow-hidden">
      {/* Settings dropdown (compact) */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            className="settings-btn"
            title="Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v2m0 4v2m4-6h2M6 12H4" />
              <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
            </svg>
          </button>

          {menuOpen && (
            <div className="settings-menu origin-top-right absolute right-0 mt-2 w-80 rounded-md bg-zinc-800 shadow-lg ring-1 ring-black/20 z-50 p-3">
              <div className="text-sm font-medium flex items-center justify-between mb-2">
                <div>Settings</div>
                <button onClick={() => setMenuOpen(false)} className="text-xs px-2 py-1 bg-zinc-700 rounded">Close</button>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Mute all</span>
                <button onClick={() => setMuted(m => !m)} className="px-2 py-1 bg-zinc-700 rounded text-sm">{muted ? 'On' : 'Off'}</button>
              </div>

              <div className="space-y-2">
                {urls.map((u, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-6 text-xs">#{idx + 1}</div>
                    <input value={u} onChange={(e) => handleUrlChange(idx, e.target.value)} placeholder={`YouTube URL ${idx + 1}`} className="flex-1 rounded px-2 py-1 bg-zinc-700 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="quad-grid">
        {urls.map((url, i) => {
          const videoId = extractYouTubeId(url || '')
          return (
            <div key={i} className="video-card video-cell relative overflow-hidden bg-black">
              {videoId ? (
                <iframe
                  className="video-frame"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=1&modestbranding=1`}
                  title={`Video ${i + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-zinc-400">No video</div>
              )}

            </div>
          )
        })}
      </main>
    </div>
  )
}

import { useRef, useEffect } from 'react';
import { isValidYouTubeUrl } from '../utils/youtube';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  muted: boolean;
  onMutedToggle: () => void;
  urls: string[];
  onUrlChange: (index: number, value: string) => void;
}

const truncateUrl = (url: string, maxLen: number = 40): string => {
  if (!url) return '';
  if (url.length <= maxLen) return url;
  return url.substring(0, maxLen - 3) + '...';
};

export function SettingsMenu({
  isOpen,
  onClose,
  muted,
  onMutedToggle,
  urls,
  onUrlChange,
}: SettingsMenuProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="settings-menu origin-top-right absolute right-0 mt-2 rounded-lg shadow-2xl ring-1 ring-black/20 z-50 p-4"
      style={{ width: '420px', maxWidth: '90vw' }}
      role="dialog"
      aria-labelledby="settings-title"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      <div className="settings-header flex items-center justify-between">
        <h2 id="settings-title" className="text-base font-semibold text-white whitespace-nowrap flex-1">
          Settings
        </h2>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition font-medium flex-shrink-0"
          aria-label="Close settings menu"
        >
          Close
        </button>
      </div>

      <div className="settings-section mt-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <label className="text-sm font-medium text-white block mb-1 truncate">Audio</label>
            <p className="text-xs text-zinc-400 truncate">Mute all videos</p>
          </div>
          <button
            onClick={onMutedToggle}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex-shrink-0 whitespace-nowrap ${
              muted
                ? 'bg-red-600/30 text-red-300 hover:bg-red-600/40'
                : 'bg-green-600/30 text-green-300 hover:bg-green-600/40'
            }`}
            aria-pressed={muted}
            aria-label={`Mute all videos: ${muted ? 'on' : 'off'}`}
          >
            {muted ? '🔇 Muted' : '🔊 Unmuted'}
          </button>
        </div>
      </div>

      <div className="mt-4 mb-2">
        <label className="text-sm font-medium text-white block whitespace-nowrap">Videos</label>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
        {urls.map((url, idx) => {
          const isValid = url === '' || isValidYouTubeUrl(url);
          const displayUrl = truncateUrl(url);
          return (
            <div key={idx} className="settings-section flex flex-col gap-1.5 p-3">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-medium text-zinc-300 whitespace-nowrap">#{idx + 1}</label>
                {url && (
                  <button
                    onClick={() => onUrlChange(idx, '')}
                    className="text-xs px-2 py-0.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded transition flex-shrink-0"
                    aria-label={`Clear video ${idx + 1} URL`}
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                ref={idx === 0 ? firstInputRef : undefined}
                type="text"
                value={url}
                onChange={(e) => onUrlChange(idx, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    onClose();
                  }
                }}
                placeholder="Paste YouTube URL..."
                className={`url-input ${
                  url === '' ? 'border-zinc-600' : isValid ? 'border-green-600' : 'border-red-600'
                }`}
                aria-label={`Video ${idx + 1} URL`}
                aria-invalid={!isValid && url !== ''}
              />
              {url && (
                <div className="text-xs text-zinc-400 break-all font-mono px-1">
                  {displayUrl}
                </div>
              )}
              <div className="flex items-center justify-between px-1">
                {!isValid && url && (
                  <div className="text-xs text-red-400 flex items-center gap-1 whitespace-nowrap">
                    <span>✕ Invalid URL</span>
                  </div>
                )}
                {isValid && url && (
                  <div className="text-xs text-green-400 flex items-center gap-1 whitespace-nowrap">
                    <span>✓ Valid</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {urls.some((u) => u && !isValidYouTubeUrl(u)) && (
        <div className="mt-3 p-3 bg-red-900/20 border border-red-700/30 rounded text-xs text-red-300" role="status">
          ⚠ Some URLs are invalid. Check your links.
        </div>
      )}
    </div>
  );
}

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  muted: boolean;
  onMutedToggle: () => void;
  urls: string[];
  onUrlChange: (index: number, value: string) => void;
}

export function SettingsMenu({
  isOpen,
  onClose,
  muted,
  onMutedToggle,
  urls,
  onUrlChange,
}: SettingsMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="settings-menu origin-top-right absolute right-0 mt-2 w-80 rounded-md bg-zinc-800 shadow-lg ring-1 ring-black/20 z-50 p-3">
      <div className="text-sm font-medium flex items-center justify-between mb-2">
        <div>Settings</div>
        <button
          onClick={onClose}
          className="text-xs px-2 py-1 bg-zinc-700 rounded"
        >
          Close
        </button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm">Mute all</span>
        <button
          onClick={onMutedToggle}
          className="px-2 py-1 bg-zinc-700 rounded text-sm"
        >
          {muted ? 'On' : 'Off'}
        </button>
      </div>

      <div className="space-y-2">
        {urls.map((u, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-6 text-xs">#{idx + 1}</div>
            <input
              value={u}
              onChange={(e) => onUrlChange(idx, e.target.value)}
              placeholder={`YouTube URL ${idx + 1}`}
              className="flex-1 rounded px-2 py-1 bg-zinc-700 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

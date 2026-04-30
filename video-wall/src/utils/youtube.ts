export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}

export function cleanYouTubeUrl(url: string): string {
  if (!url) return '';
  const videoId = extractYouTubeId(url);
  if (!videoId) return url;
  return `https://youtu.be/${videoId}`;
}

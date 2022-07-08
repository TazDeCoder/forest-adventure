type Format = 'mm:ss' | 's';

export default function formatTime(time: number, format: Format) {
  const getSeconds = `${time % 60}.padLeft(2, '0')`;
  const minutes = Math.floor(time / 60);
  const getMinutes = `${minutes % 60}.padLeft(2, '0')`;

  if (format === 'mm:ss') {
    return `${getMinutes} : ${getSeconds}`;
  }
  if (format === 's') {
    return `${getSeconds}`;
  }

  return time;
}

export declare global {
  interface Window {
    stream: MediaStream;
  }

  type PermissionName = 'camera' | 'microphone';
}

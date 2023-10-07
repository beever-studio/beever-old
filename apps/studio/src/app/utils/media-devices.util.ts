export function getDevices(): Promise<MediaDeviceInfo[]> {
  return navigator.mediaDevices.enumerateDevices();
}

export function getAudioInputDevices(): Promise<MediaDeviceInfo[]> {
  return getDevices().then((devices) =>
    devices.filter((device) => device.kind === 'audioinput')
  );
}

export function getVideoDevices(): Promise<MediaDeviceInfo[]> {
  return getDevices().then((devices) =>
    devices.filter((device) => device.kind === 'videoinput')
  );
}

export function getAudioOutputDevices(): Promise<MediaDeviceInfo[]> {
  return getDevices().then((devices) =>
    devices.filter((device) => device.kind === 'audiooutput')
  );
}

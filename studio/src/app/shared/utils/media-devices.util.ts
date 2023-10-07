import {defer, map, Observable} from "rxjs";

export function getDevices(): Observable<MediaDeviceInfo[]> {
  return defer(() => navigator.mediaDevices.enumerateDevices());
}

export function getAudioInputDevices(): Observable<MediaDeviceInfo[]> {
  return getDevices().pipe(map((devices) =>
    devices.filter((device) => device.kind === 'audioinput')
  ));
}

export function getVideoDevices(): Observable<MediaDeviceInfo[]> {
  return getDevices().pipe(map((devices) =>
    devices.filter((device) => device.kind === 'videoinput')
  ));
}

export function getAudioOutputDevices(): Observable<MediaDeviceInfo[]> {
  return getDevices().pipe(map((devices) =>
    devices.filter((device) => device.kind === 'audiooutput')
  ));
}

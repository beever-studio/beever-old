import playIcon from '../../assets/icons/play_arrow.svg';
import pauseIcon from '../../assets/icons/pause.svg';
import stopIcon from '../../assets/icons/stop.svg';
import downloadIcon from '../../assets/icons/download.svg';
import videocamIcon from '../../assets/icons/videocam.svg';
import videocamOffIcon from '../../assets/icons/videocam_off.svg';
import micIcon from '../../assets/icons/mic.svg';
import micOffIcon from '../../assets/icons/mic_off.svg';
import settingsIcon from '../../assets/icons/settings.svg';
import { useContext, useState } from 'react';
import { getSupportedMimeTypes } from '../utils/mime-type.util';
import { SettingsContext } from '../context/settings.context';

export function RecordPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | undefined>(
    undefined
  );
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const supportedMimeTypes = getSupportedMimeTypes();

  const { openSettings } = useContext(SettingsContext);

  async function startCamera(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
        },
        audio: !isMuted,
      });

      window.stream = stream;
      const video: HTMLVideoElement = document.getElementById(
        'video'
      ) as HTMLVideoElement;
      video.srcObject = stream;
      setIsCapturing(true);
    } catch (e) {
      console.error('Error accessing media devices.', e);
    }
  }

  function stopCamera(): void {
    window.stream.getTracks().forEach((track) => track.stop());
    setIsCapturing(false);
  }

  function mute(): void {
    window.stream.getAudioTracks().forEach((track) => (track.enabled = false));
    setIsMuted(true);
  }

  function unmute(): void {
    window.stream.getAudioTracks().forEach((track) => (track.enabled = true));
    setIsMuted(false);
  }

  function startRecording(): void {
    setRecordedBlobs([]);
    const options = { mimeType: supportedMimeTypes[0] };
    const recorder = new MediaRecorder(window.stream, options);

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        setRecordedBlobs((blobs) => [...blobs, event.data]);
      }
    };

    recorder.start();
    setIsRecording(true);
    setMediaRecorder(recorder);
  }

  function pauseRecording(): void {
    if (mediaRecorder) {
      mediaRecorder.pause();
      setIsPaused(true);
    }
  }

  function resumeRecording(): void {
    if (mediaRecorder) {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  }

  function stopRecording(): void {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }

  function downloadRecording(): void {
    const blob = new Blob(recordedBlobs, {
      type: supportedMimeTypes[0].split(';')[0],
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  return (
    <>
      <video
        className="rounded-lg border-2 border-primary p-2 bg-black"
        id="video"
        width="640"
        height="480"
        playsInline
        autoPlay
        muted
      ></video>
      <section className="flex items-center justify-center gap-4 p-2">
        <button
          className="border-2 border-gray-500 rounded-xl px-2 py-2"
          onClick={isCapturing ? stopCamera : startCamera}
          title={isCapturing ? 'Stop camera' : 'Start camera'}
        >
          <img src={isCapturing ? videocamOffIcon : videocamIcon} alt="" />
        </button>

        <button
          className="border-2 border-gray-500 rounded-xl px-2 py-2"
          onClick={isMuted ? unmute : mute}
          title={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          <img src={isMuted ? micIcon : micOffIcon} alt="" />
        </button>

        <button
          className="border-2 border-gray-500 rounded-xl px-2 py-2"
          onClick={
            !isRecording
              ? startRecording
              : isPaused
              ? resumeRecording
              : pauseRecording
          }
          title={
            isRecording && !isPaused ? 'Pause recording' : 'Start recording'
          }
        >
          <img src={isRecording && !isPaused ? pauseIcon : playIcon} alt="" />
        </button>
        <button
          className="border-2 border-gray-500 rounded-xl px-2 py-2"
          onClick={stopRecording}
          title="Stop recording"
        >
          <img src={stopIcon} alt="" />
        </button>
        <button
          className="border-2 border-gray-500 rounded-xl px-2 py-2"
          onClick={downloadRecording}
          title="Download recording"
        >
          <img src={downloadIcon} alt="" />
        </button>
        <button
          className="border-2 border-gray-500 rounded-xl px-2 py-2"
          onClick={openSettings}
          title="Download recording"
        >
          <img src={settingsIcon} alt="" />
        </button>
      </section>
    </>
  );
}

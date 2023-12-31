import {AfterViewInit, Component, computed, ElementRef, Input, signal, ViewChild} from "@angular/core";
import {getSupportedMimeTypes} from "../../shared/utils/mime-type.util";
import {defer} from "rxjs";
import {getAudioInputDevices, getVideoDevices} from "../../shared/utils/media-devices.util";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'beever-record',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    AsyncPipe,
    NgForOf,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  template: `
    <video
      *ngIf="source === 'camera' || source === 'screen'"
      #video
      class="rounded-lg border-2 border-primary p-2 bg-black"
      width="640"
      height="480"
      playsInline
      autoPlay
      muted>
    </video>
    <audio *ngIf="source === 'audio'" #audio controls autoplay></audio>
    <section class="flex items-center justify-center gap-4 p-2">
      <button
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Start recording"
        (click)="startRecording()"
      >
        <img src="assets/icons/play_arrow.svg" alt=""/>
      </button>
      <button
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Stop recording"
        (click)="stopRecording()"
      >
        <img src="assets/icons/stop.svg" alt=""/>
      </button>
      <button
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Download recording"
        (click)="downloadRecording()"
      >
        <img src="assets/icons/download.svg" alt=""/>
      </button>
      <button
        *ngIf="source === 'camera'"
        class="border-2 border-gray-500 rounded-xl px-2 py-2"
        title="Take a snapshot"
        (click)="captureSnapshot()"
      >
        <img src="assets/icons/capture.svg" alt=""/>
      </button>
    </section>
    <form class="flex flex-col">
      <div class="flex gap-2" *ngIf="source === 'camera'">
        <mat-form-field class="flex-grow">
          <mat-label>Video device</mat-label>
          <mat-select>
            <mat-option *ngFor="let device of videoDevices$ | async" [value]="device.deviceId">
              {{device.label}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-icon-button type="button" (click)="toggleCam()">
          <mat-icon [svgIcon]="camIcon()"></mat-icon>
        </button>
      </div>

      <div class="flex gap-2" *ngIf="source !== 'screen'">
        <mat-form-field class="flex-grow">
          <mat-label>Audio device</mat-label>
          <mat-select>
            <mat-option *ngFor="let device of audioInputDevices$ | async" [value]="device.deviceId">
              {{device.label}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-icon-button type="button" (click)="toggleAudio()">
          <mat-icon [svgIcon]="audioIcon()"></mat-icon>
        </button>
      </div>

      <mat-form-field class="flex-grow">
        <mat-label>Screen sharing preference</mat-label>
        <mat-select>
          <mat-option value="default">Show default sharing options</mat-option>
          <mat-option value="screen">Share entire screen</mat-option>
          <mat-option value="window">Share application window</mat-option>
          <mat-option value="browser">Share tab</mat-option>
        </mat-select>
      </mat-form-field>
    </form>
  `
})
export default class RecordComponent implements AfterViewInit {
  isAudioOn = signal<boolean>(true);
  isCamOn = signal<boolean>(true);
  mediaRecorder = signal<MediaRecorder | undefined>(undefined);
  recordedBlobs = signal<Blob[]>([]);
  supportedMimeTypes = getSupportedMimeTypes();

  videoDevices$ = getVideoDevices();
  audioInputDevices$ = getAudioInputDevices();

  audioIcon = computed(() => this.isAudioOn() ? 'volume' : 'volume_off');
  camIcon = computed(() => this.isCamOn() ? 'videocam' : 'videocam_off');

  @Input() source: 'camera' | 'audio' | 'screen' = 'camera';

  @ViewChild('video', {read: ElementRef}) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('audio', {read: ElementRef}) audio!: ElementRef<HTMLAudioElement>;

  ngAfterViewInit() {
    switch (this.source) {
      case 'camera':
        this.initCamera();
        break;
      case 'audio':
        this.initAudio();
        break;
      case 'screen':
        this.initScreen();
        break;
    }
  }

  initCamera(): void {
    defer(() => navigator.mediaDevices.getUserMedia({
      video: {
        width: 1280,
        height: 720,
      },
      audio: true,
    })).subscribe({
      next: (stream) => {
        window.stream = stream;
        this.video.nativeElement.srcObject = stream;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  initAudio(): void {
    defer(() => navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    })).subscribe({
      next: (stream) => {
        window.stream = stream;
        this.audio.nativeElement.srcObject = stream;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  initScreen(): void {
    defer(() => navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 1280,
        height: 720,
        displaySurface: 'default',
      },
      audio: true,
    })).subscribe({
      next: (stream) => {
        window.stream = stream;
        this.video.nativeElement.srcObject = stream;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  startRecording(): void {
    this.recordedBlobs.set([]);
    const options = {mimeType: this.supportedMimeTypes[0]};
    const recorder = new MediaRecorder(window.stream, options);

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.update((blobs) => [...blobs, event.data]);
      }
    };

    recorder.start();
    this.mediaRecorder.set(recorder);
  }

  stopRecording(): void {
    if (this.mediaRecorder()) {
      this.mediaRecorder()?.stop();
    }
  }

  downloadRecording(): void {
    const blob = new Blob(this.recordedBlobs(), {
      type: this.supportedMimeTypes[0].split(';')[0],
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

  toggleAudio(): void {
    window.stream.getAudioTracks().forEach((track) => (track.enabled = !this.isAudioOn()));
    this.isAudioOn.update(isMuted => !isMuted);
  }

  toggleCam(): void {
    window.stream.getVideoTracks().forEach((track) => (track.enabled = !this.isCamOn()));
    this.isCamOn.update(isMuted => !isMuted);
  }

  captureSnapshot(): void {
    const canvas = document.createElement('canvas');
    canvas.width = this.video.nativeElement.videoWidth;
    canvas.height = this.video.nativeElement.videoHeight;
    canvas.getContext('2d')?.drawImage(this.video.nativeElement, 0, 0);
    const image = canvas.toDataURL('image/png');

    // download image
    const a = document.createElement('a');
    a.href = image;
    a.download = 'snapshot.png';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    });
  }
}

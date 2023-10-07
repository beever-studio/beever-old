import {AfterViewInit, Component, ElementRef, signal, ViewChild} from "@angular/core";
import {getSupportedMimeTypes} from "../../shared/utils/mime-type.util";
import {defer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {getAudioInputDevices, getVideoDevices} from "../../shared/utils/media-devices.util";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'beever-record',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    AsyncPipe,
    NgForOf
  ],
  template: `
    <video
      #video
      class="rounded-lg border-2 border-primary p-2 bg-black"
      width="640"
      height="480"
      playsInline
      autoPlay
      muted>
    </video>
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
    </section>
    <form class="flex flex-col">
      <mat-form-field>
        <mat-label>Video device</mat-label>
        <mat-select>
          <mat-option *ngFor="let device of videoDevices$ | async" [value]="device.deviceId">
            {{device.label}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Audio device</mat-label>
        <mat-select>
          <mat-option *ngFor="let device of audioInputDevices$ | async" [value]="device.deviceId">
            {{device.label}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </form>
  `
})
export default class RecordComponent implements AfterViewInit {
  mediaRecorder = signal<MediaRecorder | undefined>(undefined);
  recordedBlobs = signal<Blob[]>([]);
  supportedMimeTypes = getSupportedMimeTypes();

  videoDevices$ = getVideoDevices();
  audioInputDevices$ = getAudioInputDevices();

  @ViewChild('video', {read: ElementRef}) video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.initCamera();
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
}

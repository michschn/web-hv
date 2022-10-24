/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SeekableVideoSource } from './video-source';
import { Disposable, Disposer } from '../../utils/disposer';
import { Deferred } from '../../utils/utils';
import { BlobStorage } from '../../storage/blob-storage';
import { BLOB_SCREENRECORDING_NAME } from '../recording/constants';
import { loadVideoMetadata } from '../recording/mp4parser';
import { checkNotNull } from '../../utils/preconditions';

export class RecordedViewSource extends EventTarget implements SeekableVideoSource, Disposable {
  readonly seekable = true;
  private _videoElement: HTMLVideoElement | null = null;

  private constructor(
    recordingUrl: string,
    readonly width: number,
    readonly height: number,
    readonly duration: number
  ) {
    super();
    const videoElement = document.createElement('video');
    videoElement.muted = true;
    videoElement.src = recordingUrl;
    this._videoElement = videoElement;
  }

  static async createVideoSource(storage: BlobStorage): Promise<RecordedViewSource> {
    const { width, height, duration_nanos } = await loadVideoMetadata(storage);
    return new RecordedViewSource(
      await storage.objectUrl(BLOB_SCREENRECORDING_NAME),
      width,
      height,
      Number(duration_nanos) / 1_000_000_000
    );
  }

  drawCurrentFrame(ctx: CanvasRenderingContext2D): void {
    if (!this._videoElement) return;
    ctx.drawImage(this._videoElement, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  get loop(): boolean {
    return this._videoElement?.loop ?? false;
  }

  set loop(value: boolean) {
    checkNotNull(this._videoElement).loop = value;
  }

  get playbackRate(): number {
    return this._videoElement?.playbackRate ?? 1;
  }

  set playbackRate(value: number) {
    checkNotNull(this._videoElement).playbackRate = value;
  }

  get state() {
    if (!this._videoElement) return 'stop';
    if (this._currentSeekPromise) return 'seek';
    if (this._videoElement.paused) return 'stop';
    if (this._videoElement.ended) return 'stop';

    return 'play';
  }

  async play(): Promise<void> {
    this._videoElement?.play();
  }

  async stop(): Promise<void> {
    this._videoElement?.pause();
    this._cancelSeek();
  }

  dispose(): void {
    this._cancelSeek();
    if (this._videoElement) {
      this._videoElement.pause();
      URL.revokeObjectURL(this._videoElement.src);
      this._videoElement.src = '';
    }
  }

  get currentTime() {
     return  this._videoElement?.currentTime ?? 0;
  }

  _currentSeekPromise: Deferred<boolean> | null = null;


  async seek(time: number): Promise<boolean> {
    if (!this._videoElement) return false;

    this._cancelSeek();

    if (this._videoElement.currentTime == time) return true;

    const currentSeekPromise = new Deferred<boolean>();
    this._currentSeekPromise = currentSeekPromise;

    const seekSetup = new Disposer();
    seekSetup.addListener(this._videoElement, 'seeked', () => currentSeekPromise.resolve(true));
    this._videoElement.currentTime = time;

    try {
      return await currentSeekPromise;
    } finally {
      seekSetup.dispose();
      if (this._currentSeekPromise == currentSeekPromise) {
        this._currentSeekPromise = null;
      }
    }
  }

  private _cancelSeek() {
    this._currentSeekPromise?.resolve(false);
    this._currentSeekPromise = null;
  }
}

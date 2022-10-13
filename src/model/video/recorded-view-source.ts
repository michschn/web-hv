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

export class RecordedViewSource extends EventTarget implements SeekableVideoSource, Disposable {
  private _videoElement: HTMLVideoElement | null = null;

  get width() {
    return 1080;
  }

  get height() {
    return 2400;
  }

  get duration() {
    return this._videoElement?.duration ?? 0;
  }

  private constructor(recordingUrl: string) {
    super();
    const videoElement = document.createElement('video');
    videoElement.muted = true;
    videoElement.src = recordingUrl;
    videoElement.loop = true;

    this._videoElement = videoElement;
  }

  static async createVideoSource(recordingId: string): Promise<RecordedViewSource> {
    const rootDir = await navigator.storage.getDirectory();
    const recordingDir = await rootDir.getDirectoryHandle(recordingId);
    const movieHandle = await recordingDir.getFileHandle('screenrecord.mp4');
    const movieFile = await movieHandle.getFile();

    const recordingUrl = URL.createObjectURL(movieFile);
    return new RecordedViewSource(recordingUrl);
  }

  drawCurrentFrame(ctx: CanvasRenderingContext2D): void {
    if (!this._videoElement) return;
    ctx.drawImage(this._videoElement, 0, 0, ctx.canvas.width, ctx.canvas.height);
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

  _currentSeekPromise: Deferred<boolean> | null = null;
  async seek(time: number): Promise<boolean> {
    if (!this._videoElement) return false;

    this._cancelSeek();

    if (this._videoElement.currentTime == time) return true;

    const currentSeekPromise = new Deferred<boolean>();
    this._currentSeekPromise = currentSeekPromise;

    const seekSetup = new Disposer();
    seekSetup.addListener(this._videoElement, 'seeked', () => currentSeekPromise.resolve(true));

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

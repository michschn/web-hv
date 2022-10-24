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
import { VideoSource } from './video-source';
import * as JMuxer from 'jmuxer';
import { Disposable } from '../../utils/disposer';

/**
 * Mirrors the device display in realtime.
 *
 * Uses the `screenrecord` utility to stream an H.264 encoded video frame-by-frame over ADB.
 * The H.264 stream is remuxed to an MP4 container, to eventually stream it into a HTMLVideoElement
 * using the Media Source API.
 */
export class LiveViewSource extends EventTarget implements VideoSource, Disposable {
  private scale = 0.5;
  private _playState: PlayState | null = null;
  private _width?: number;
  private _height?: number;

  get currentFrame() {
    return this._playState?.currentFrame ?? 0;
  }

  get width() {
    return this._width ?? 0;
  }

  get height() {
    return this._height ?? 0;
  }

  get state() {
    return this._playState ? 'play' : 'stop';
  }

  constructor(private readonly device: AdbDevice) {
    super();
  }

  drawCurrentFrame(ctx: CanvasRenderingContext2D): void {
    if (!this._playState) return;
    ctx.drawImage(this._playState?.videoElement, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  async play(): Promise<void> {
    if (this._playState !== null) return;

    const videoElement = document.createElement('video');
    videoElement.muted = true;
    const jMuxer = new JMuxer({
      node: videoElement,
      mode: 'video',
      flushingTime: 0,
      fps: 120,
      clearBuffer: true,
    });

    const sizeQueryResult = await this.device.shellCommand('wm size');
    const matchedSize = sizeQueryResult.match(/\b(?<width>\d+)x(?<height>\d+)\b/);
    if (!matchedSize) {
      throw new Error('Unable to determine screen size');
    }

    this._width = parseInt(matchedSize.groups!['width']) * this.scale;
    this._height = parseInt(matchedSize.groups!['height']) * this.scale;

    const stream = this.device.openStream(
      `shell:screenrecord --size=${this._width}x${this._height} --output-format=h264 - `
    );
    this._playState = new PlayState(stream, jMuxer, videoElement);

    videoElement.addEventListener('loadedmetadata', () => {
      console.log('metadata changed');
      this._width = videoElement.videoWidth;
      this._height = videoElement.videoHeight;
      this.dispatchEvent(new CustomEvent('metadata-changed', {}));
    });

    return videoElement.play();
  }

  async stop(): Promise<void> {
    this._playState?.dispose();
    this._playState = null;
  }

  dispose(): void {
    this._playState?.dispose();
    this._playState = null;
  }
}

class PlayState implements Disposable {
  currentFrame = 0;

  constructor(
    public stream: AdbStream,
    public remuxer: JMuxer,
    public videoElement: HTMLVideoElement
  ) {
    stream.onReceiveWrite = data => {
      // need to ack to ADB the data received.
      stream.sendReady();
      remuxer.feed({ video: data });
    };
  }

  dispose(): void {
    this.stream.close();
    this.videoElement.pause();
    this.remuxer.destroy();
  }
}

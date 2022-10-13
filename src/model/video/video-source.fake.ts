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

export class FakeVideoSource extends EventTarget implements SeekableVideoSource {
  private _currentFrame = 0;
  private _totalFrames: number;

  constructor(
    public readonly width: number,
    public readonly height: number,
    options?: {
      framerate: number;
      duration: number;
    }
  ) {
    super();
    this.duration = options?.duration ?? 2;
    this.framerate = options?.framerate ?? 60;
    this._totalFrames = Math.round(this.duration * this.framerate);
  }

  readonly duration: number;
  readonly framerate: number;

  get currentFrame() {
    return this._currentFrame;
  }

  drawCurrentFrame(ctx: CanvasRenderingContext2D): void {
    const { width, height } = ctx.canvas;

    ctx.save();
    try {
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width, 0);
      ctx.lineTo(0, height);
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, 50, 50, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = '30px serif';
      ctx.fillStyle = 'black';

      ctx.textAlign = 'center';
      ctx.fillText(`${this._currentFrame}`, width / 2, height / 2 + 15);
    } finally {
      ctx.restore();
    }
  }

  play(): Promise<void> {
    return Promise.resolve(undefined);
  }

  seek(time: number): Promise<boolean> {
    return Promise.resolve(true);
  }

  stop(): Promise<void> {
    return Promise.resolve(undefined);
  }

  dispose(): void {}
}

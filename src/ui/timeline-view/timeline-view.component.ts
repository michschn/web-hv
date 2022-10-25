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

import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, NgZone, ViewChild, ViewContainerRef, } from '@angular/core';
import { checkNotNull } from '../../utils/preconditions';
import { Recording } from '../../model/recording/recording';
import { CdkDragRelease, CdkDragStart, DragRef, Point } from '@angular/cdk/drag-drop';
import { SeekableVideoSource } from '../../model/video/video-source';
import { motion } from '../../proto/storage';
import { ViewConfig } from '../../model/view-config/view-config';

@Component({
  selector: 'ui-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.scss'],
})
export class TimelineViewComponent implements AfterViewInit, AfterViewChecked {
  constructor(private readonly viewRef: ViewContainerRef, private zone: NgZone) {}

  private _observer = new ResizeObserver(() => {
    this.zone.run(() => {
      this._updateCanvasSize();
    });
  });

  @ViewChild('canvas', { read: ElementRef })
  canvas?: ElementRef<HTMLCanvasElement>;

  private get _checkedCanvas() {
    return checkNotNull(this.canvas?.nativeElement);
  }

  private _recording?: Recording;
  videoSource?: SeekableVideoSource;

  @Input()
  set recording(value: Recording | undefined) {
    if (value === this.recording) return;
    this._recording = value;
    this.videoSource = value?.videoSource.seekable ? value?.videoSource : undefined;

    this._scheduleRender();
  }

  @Input()
  viewConfig!: ViewConfig;

  ngAfterViewInit() {
    this._observer.observe(this.viewRef.element.nativeElement);
    this._updateCanvasSize();
  }

  timeHandlePosition = { x: 0, y: 0 };

  _isPlaying = false;

  ngAfterViewChecked() {
    const isPlaying = this.videoSource?.state === 'play';
    if (isPlaying == this._isPlaying) return;
    console.log('play state changes');

    this._isPlaying = isPlaying;
    if (isPlaying) {
      const self = this;
      function updatePlayHead() {
        const canvas = self._checkedCanvas;
        const boundingClientRect = canvas.getBoundingClientRect();

        if (!self._recording || !self.videoSource) return;

        const currentTime = self.videoSource.currentTime;

        const timeline = self._recording.timeline;
        const currentFrame = timeline.getFrameFromTime(currentTime);

        if (isFinite(currentTime)) {
          const range = canvas.width;

          self.timeHandlePosition = {
            x: (range / frames.length) * currentFrame,
            y: 0,
          };
        }
        if (!self._isPlaying) return;

        requestAnimationFrame(updatePlayHead);
      }

      requestAnimationFrame(updatePlayHead);
    }
  }

  private _wasPlayingBeforeDrag = false;
  onDragTimeHandleStart(event: CdkDragStart) {
    this._wasPlayingBeforeDrag = this.videoSource?.state == 'play';
    if (this._wasPlayingBeforeDrag) {
      this.videoSource?.stop();
    }
  }

  computeTimeHandleSnap = (
    pos: Point,
    dragRef: DragRef,
    dimensions: ClientRect,
    pickupPositionInElement: Point
  ) => {
    const canvas = this._checkedCanvas;
    const boundingClientRect = canvas.getBoundingClientRect();

    if (!this._recording) return { x: 0, y: 0 };
    const frames = this._recording.timeline;

    const range = canvas.width;

    const x = Math.min(Math.max(0, pos.x - boundingClientRect.x), range);

    const progress = x / range;
    const frameNumber = Math.round(frames.frameCount * progress);

    const videoTimeSeconds = frames.getTimeFromFrame(frameNumber);
    if (this.videoSource && videoTimeSeconds) {
      this.videoSource.seek(videoTimeSeconds);
    }

    return {
      x: boundingClientRect.x + (range / frames.frameCount) * frameNumber - 5,
      y: dimensions.y,
    };
  };

  onDragTimeHandleEnd(event: CdkDragRelease) {
    if (this._wasPlayingBeforeDrag) {
      this.videoSource?.play();
    }
  }

  private _updateCanvasSize() {
    if (!this.canvas) return;

    const canvasElement = this.canvas.nativeElement;
    const parentElement = checkNotNull(this.canvas.nativeElement.parentElement);
    const height = parentElement.clientHeight;
    const width = parentElement.clientWidth;
    if (canvasElement.width == width && canvasElement.height == height) {
      return;
    }

    canvasElement.width = width;
    canvasElement.height = height;
    this._render();
  }

  private _scheduledRender?: number;
  private _scheduleRender() {
    if (this._scheduledRender) return;

    this._scheduledRender = requestAnimationFrame(() => {
      this._render();
      this._scheduledRender = undefined;
    });
  }

  private _render() {
    if (!this.canvas) return;

    const ctx = checkNotNull(this.canvas.nativeElement.getContext('2d'));
    const { width, height } = ctx.canvas;

    const minMinorGap = 10;
    const minMajorGap = 50;

    ctx.clearRect(0, 0, width, height);
    if (!this._recording) return;

    const timeline = this._recording.timeline;
    const framesCount = timeline.frameCount;

    const maxMinorTicks = Math.min(Math.floor(width / minMinorGap), framesCount);

    const minorGap = width / maxMinorTicks;

    ctx.beginPath();
    for (let x = 0.5 + minorGap; x <= width; x += minorGap) {
      // Adding the gap skips the initial line at 0
      const xr = Math.round(x);
      let nx;

      if (xr >= x) {
        nx = xr - 0.5;
      } else {
        nx = xr + 0.5;
      }
      ctx.moveTo(nx, 0);
      ctx.lineTo(nx, height - 20);
    }

    ctx.strokeStyle = '#EEEEEE';
    ctx.lineWidth = 1;
    ctx.stroke();

    const majorGap = Math.max(2, Math.floor(minMajorGap / minorGap)) * minorGap;

    ctx.strokeStyle = '#DDDDDD';
    ctx.fillStyle = '#222222';
    ctx.lineWidth = 2;

    ctx.beginPath();
    for (let x = majorGap; x < width; x += majorGap) {
      // Adding the gap skips the initial line at 0
      const xr = Math.round(x);

      ctx.moveTo(xr, 0);
      ctx.lineTo(xr, height - 15);

      const frameNo = Math.floor((x / width) * framesCount);

      ctx.textAlign = 'center';
      ctx.fillText(`${frameNo + 1}`, xr, height - 5);
    }

    // Always draw start
    ctx.moveTo(1, 0);
    ctx.lineTo(1, height - 15);

    // Always draw end
    ctx.moveTo(width - 1, 0);
    ctx.lineTo(width - 1, height - 15);

    ctx.stroke();
  }
}

interface ViewData {
  label: string;
  min: number;
  max: number;
  timeseries: number[];
}
//
// function computeGraphs(recording: Recording | undefined) {
//   if (!recording) return [];
//
//   const flatMap = new Map<string, ViewData>();
//
//
//   // const frames = recording.trace.frames;
//   // for (let i = 0; i < frames.length; i++) {
//   //   const frame = frames[i];
//   //
//   //   function collectSamples(node: IViewNode | undefined | null) {
//   //     if (!node )return;
//   //
//   //     const name = `${node.classname}@${node.hashcode}`;
//   //     let entry = flatMap.get(name);
//   //     if (!entry) {
//   //       entry =  {
//   //         label
//   //
//   //       }
//   //     }
//   //
//   //
//   //   }
//   //
//   //   collectSamples(frame.viewHierarchy);
//   //
//   //
//   //
//   // }
//   //
//   //
//   //
//   //   throw new Error('Function not implemented.');
// }
//

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

import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { GraphConfig } from '../../../model/view-config/view-config';
import { checkNotNull } from '../../../utils/preconditions';
import { VisualTimeline } from '../../../model/timeline/visual-timeline';

@Component({
  selector: 'ui-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnChanges {
  constructor() {}

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;

  @Input()
  graphConfig?: GraphConfig;

  @Input()
  timeline?: VisualTimeline;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.canvas) return;
    this._renderGraph();
  }

  updateCanvasSize(width: number) {
    if (!this.canvas) return;

    const canvasElement = this.canvas.nativeElement;

    if (canvasElement.width == width) {
      return;
    }

    canvasElement.width = width;
    canvasElement.height = 64;
    this._renderGraph();
  }

  get labelLeft() {
    const ranges = this.graphConfig?.property?.series?.activeRanges;
    return ranges && ranges.length && this.timeline
      ? `${this.timeline.frameToPx(ranges[0].start)}px`
      : 0;
  }

  private _renderGraph() {
    const property = this.graphConfig?.property;
    const timeline = this.timeline;

    const canvas = this.canvas.nativeElement;
    const cw = canvas.width;
    const ch = 30;

    const ctx = checkNotNull(canvas.getContext('2d'));
    ctx.clearRect(0, 0, cw, canvas.height);

    if (!property || !timeline) return;

    const series = property.series;
    const color = this.graphConfig?.color!;

    let min = series.min ?? 0;
    let max = series.max ?? 1;
    if (min >= 0 && max <= 1) {
      min = 0;
      max = 1;
    }
    if (min === max) {
      max += 1;
    }

    const { start, end } = series.activeRanges[0] ?? { start: 0, end: series.length };

    const bottomLineWidth = 2;
    // solid bottom line
    ctx.fillStyle = color;
    ctx.arc(timeline.frameToPx(start), ch - bottomLineWidth / 2, 5, 0, 2 * Math.PI);
    ctx.arc(timeline.frameToPx(end - 1), ch - bottomLineWidth / 2, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.save();
    try {
      ctx.fillStyle = this._lighten(color);
      ctx.beginPath();
      ctx.moveTo(timeline.frameToPx(start), ch - bottomLineWidth);
      for (let i = start; i < end; i++) {
        const value = series.at(i);
        if (typeof value !== 'number') {
          continue;
        }
        ctx.lineTo(timeline.frameToPx(i), (1 - (value - min) / (max - min)) * ch);
      }
      ctx.lineTo(timeline.frameToPx(end - 1), ch - bottomLineWidth);
      ctx.fill();
    } finally {
      ctx.restore();
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = bottomLineWidth;

    ctx.moveTo(timeline.frameToPx(start), ch - bottomLineWidth / 2);
    ctx.lineTo(timeline.frameToPx(end - 1), ch - bottomLineWidth / 2);

    ctx.stroke();
  }

  private _lighten(hex: string) {
    hex = hex.replace(/[^0-9A-F]/gi, '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return 'rgba(' + r + ',' + g + ',' + b + ',0.15)';
  }
}

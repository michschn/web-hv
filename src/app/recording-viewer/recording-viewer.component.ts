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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recording } from '../../model/recording/recording';
import { ActivatedRoute, Router } from '@angular/router';
import { RecorderService } from '../../model/recording/recorder.service';
import { ProgressTracker } from '../../utils/progress';
import { ViewConfig } from '../../model/view-config/view-config';
import { Property } from '../../model/recording/properties';

@Component({
  selector: 'app-recording-viewer',
  templateUrl: './recording-viewer.component.html',
  styleUrls: ['./recording-viewer.component.scss'],
})
export class RecordingViewerComponent implements OnInit, OnDestroy {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _recordingService: RecorderService,
    private _progressTracker: ProgressTracker
  ) {
    this.viewConfig = { graphs: [] };
  }

  recording?: Recording;

  viewConfig: ViewConfig;

  ngOnInit(): void {
    this._route.params.subscribe(async routeParams => {
      const recordingId = routeParams['id'];
      const recordingPromise = this._recordingService.loadRecoring(recordingId);
      this._progressTracker.trackPromise(recordingPromise);

      const recording = await recordingPromise;
      if (recordingId == this._route.snapshot.params['id']) {
        this.recording?.dispose();
        this.recording = recording;
        this.viewConfig.graphs =
          recording?.properties?.properties
            ?.filter(property => property.series.hasChangesInRange(0, 1))
            // ?.filter(property => property.label.indexOf('Brightness') != -1)
            // ?.slice(0, 10)
            ?.map((property, index) => ({
              color: PROBE_COLORS[index % PROBE_COLORS.length],
              property: property as Property<number>,
            })) ?? [];
      } else {
        recording.dispose();
      }
    });
  }

  ngOnDestroy() {
    this.recording?.dispose();
  }
}

const PROBE_COLORS = [
  '#E51C23',
  '#9C27B0',
  '#5677FC',
  '#00BCD4',
  '#259B24',
  '#CDDC39',
  '#FFC107',
  '#795548',
  '#737373',
];

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
import { MotionConnection } from '../../model/motion_connection';
import { LiveViewSource } from '../../model/video/live-view-source';

@Component({
  selector: 'app-motion-viewer',
  templateUrl: './motion-viewer.component.html',
  styleUrls: ['./motion-viewer.component.scss'],
})
export class MotionViewerComponent implements OnInit, OnDestroy {
  constructor(private _motionConnection: MotionConnection) {
    this.liveVideo = this._motionConnection.createLiveViewSource();
  }

  liveVideo: LiveViewSource;

  ngOnInit(): void {
    this.liveVideo.play();
  }

  ngOnDestroy(): void {
    this.liveVideo.dispose();
  }
}

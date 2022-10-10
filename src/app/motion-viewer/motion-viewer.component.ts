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

import { Component, OnInit } from '@angular/core';
import { MotionConnection } from '../../model/motion_connection';
import { VideoSource } from '../../model/video/video-source';

@Component({
  selector: 'app-motion-viewer',
  templateUrl: './motion-viewer.component.html',
  styleUrls: ['./motion-viewer.component.scss'],
})
export class MotionViewerComponent implements OnInit {
  constructor(private _motionConnection: MotionConnection) {}

  videoSource: VideoSource | null = null;

  ngOnInit(): void {
    this._motionConnection.createLiveViewSource().then(result => {
      this.videoSource = result;
      result.play()
    });
  }
}

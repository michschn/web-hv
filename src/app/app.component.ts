// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Disposer } from '../utils/disposer';
import { MotionConnection, State } from '../model/motion_connection';
import { ProgressTracker } from '../utils/progress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private _motionConnection: MotionConnection,
    private _progressTracker: ProgressTracker
  ) {}

  private readonly _disposer = new Disposer();

  ngOnInit(): void {
    this._motionConnection.connect();
  }

  ngOnDestroy() {
    this._motionConnection.disconnect();
  }

  get connectionStateIcon(): string {
    return ConnectionStateIndicator[this._motionConnection.state.type].icon;
  }

  get connectionStateLabel(): string {
    return ConnectionStateIndicator[this._motionConnection.state.type].label;
  }

  get showProgress() {
    return this._progressTracker.isActive;
  }
}

const ConnectionStateIndicator: Record<State['type'], { label: string; icon: string }> = {
  disconnected: { label: 'Disconnected', icon: 'usb_off' },
  connecting: { label: 'Connecting...', icon: 'usb' },
  connected: { label: 'Connected', icon: 'usb' },
  error: { label: 'Error', icon: 'error_outline' },
  unauthorized: { label: 'Unauthorized', icon: 'warning_amber' },
};

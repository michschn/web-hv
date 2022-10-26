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
import { MotionConnection, State } from '../../model/motion_connection';
import { LiveViewSource } from '../../model/video/live-view-source';
import { Disposer } from '../../utils/disposer';

@Component({
  selector: 'app-motion-viewer',
  templateUrl: './motion-viewer.component.html',
  styleUrls: ['./motion-viewer.component.scss'],
})
export class MotionViewerComponent implements OnInit, OnDestroy {
  private readonly _disposer = new Disposer();
  constructor(private _motionConnection: MotionConnection) {}

  liveVideo?: LiveViewSource;

  ngOnInit(): void {
    this._disposer.addListener(this._motionConnection, 'state-changed', event => {
      this.isConnected = ((event as CustomEvent).detail as State).type == 'connected';
    });
    this.isConnected = this._motionConnection.state.type == 'connected';
  }

  ngOnDestroy(): void {
    this._disposer.dispose();
    this.isConnected = false;
  }

  get connectionState() : State {
    return this._motionConnection.state;
  }



  private _isConnected = false;
  get isConnected(): boolean {
    return this._isConnected;
  }

  private set isConnected(value: boolean) {
    if (this._isConnected == value) return;
    this._isConnected = value;
    if (this.isConnected) {
      this._onConnect();
    } else {
      this._onDisconnect();
    }
  }

  private _onConnect() {
    this.liveVideo = this._motionConnection.createLiveViewSource();
  }

  private _onDisconnect() {
    this.liveVideo?.dispose();
  }

  get errorTitle(): string {
    if (this._motionConnection.state.type !== 'error')  return '';

    switch (this._motionConnection.state.detail) {
      case 'deviceNotFound': return 'Device not found';
      case 'processNotFound':  return 'Process not found';
      case 'windowNotFound': return 'Window not found';
      default: 'Unknown error'
    }

    return this._motionConnection.state.message ?? 'Unknwon error';
  }

}

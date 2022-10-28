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

import { Component, Input, OnDestroy } from '@angular/core';
import { SeekableVideoSource } from '../../model/video/video-source';
import { Disposer } from '../../utils/disposer';
import { checkNotNull } from '../../utils/preconditions';
import { Preferences } from '../../storage/preferences';
import { ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { frameBinarySearch } from '../../utils/video';

@Component({
  selector: 'ui-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss'],
})
export class VideoControlsComponent implements OnDestroy {
  private _disposer = new Disposer();

  private _source?: SeekableVideoSource;
  private _sourceDisposer = new Disposer(true);

  constructor(private _preferences: Preferences) {}

  @Input()
  set videoSource(newSource: SeekableVideoSource | undefined) {
    if (this._source === newSource) return;

    this._sourceDisposer.dispose();
    this._source = newSource;
    if (this._source) {
      this._source.loop = this._preferences.loopVideo;
      this._source.playbackRate = this._preferences.playbackRate;
    }
  }

  ngOnDestroy(): void {
    this._disposer.dispose();
  }

  get playStateIcon() {
    return this._source?.state == 'play' ? 'pause' : 'play_arrow';
  }

  moveFrame(framesOffset: number) {
    const videoSource = checkNotNull(this._source);
    videoSource.stop();

    const currentTime = videoSource.currentTime;
    const frameTimes = videoSource.frameTimes;
    const thisFrame = frameBinarySearch(currentTime, frameTimes);
    const nextFrame = thisFrame + framesOffset;
    const targetTime = frameTimes[Math.min(Math.max(nextFrame, 0), frameTimes.length - 1)];

    return videoSource.seek(targetTime);
  }

  togglePlay() {
    const videoSource = checkNotNull(this._source);
    if (videoSource.state == 'play') {
      videoSource.stop();
    } else {
      videoSource.play();
    }
  }

  get repeatStateIcon() {
    return this._preferences.loopVideo ? 'repeat_on' : 'repeat';
  }

  toggleRepeat() {
    const loopVideo = !this._preferences.loopVideo;
    this._preferences.loopVideo = loopVideo;
    checkNotNull(this._source).loop = loopVideo;
  }

  playbackRateOptions: number[] = [1, 0.5, 0.25, 0.125];

  get playbackRate() {
    return this._preferences.playbackRate;
  }

  formatPlaybackRateLabel(rate: number): string {
    return `${rate}x`;
  }

  setPlaybackRate(rate: number) {
    this._preferences.playbackRate = rate;
    checkNotNull(this._source).playbackRate = rate;
  }

  shortcuts: ShortcutInput[] = [
    {
      key: ['left'],
      label: 'Previous frame',
      command: (output: ShortcutEventOutput) => this.moveFrame(-1),
    },

    {
      key: ['right'],
      label: 'Next frame',
      command: (output: ShortcutEventOutput) => this.moveFrame(+1),
    },

    {
      key: ['space'],
      label: 'play/pause',
      command: (output: ShortcutEventOutput) => this.togglePlay(),
    },
  ];
}

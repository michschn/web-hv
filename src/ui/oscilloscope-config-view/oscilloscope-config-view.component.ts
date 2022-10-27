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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Preferences } from '../../storage/preferences';
import { delay } from 'rxjs';
import { Error, Parser, Result } from '../../model/script/parser';
import { ScriptRunner } from '../../model/script/script-runner';
import { MotionConnection } from '../../model/motion_connection';

@Component({
  selector: 'ui-oscilloscope-config-view',
  templateUrl: './oscilloscope-config-view.component.html',
  styleUrls: ['./oscilloscope-config-view.component.scss'],
})
export class OscilloscopeConfigViewComponent implements OnInit {
  readonly _scriptTestRunner: ScriptRunner;
  readonly _parser = new Parser();

  constructor(motionConnection: MotionConnection, private _preferences: Preferences) {
    this._scriptTestRunner = new ScriptRunner(motionConnection, {
      beginRecording: () => {
        this.testIsRecording = true;
        return Promise.resolve();
      },
      endRecording: () => {
        this.testIsRecording = true;
        return Promise.resolve();
      },
    });
    this.script = _preferences.gestureScript;
    this.parsedScript = this._parser.parse(this.script);
  }

  @ViewChild('scriptInput') scriptInput!: ElementRef;

  ngOnInit(): void {}

  script: string;

  parsedScript: Result;
  scriptErrorMessage?: string;

  get triggerName(): String {
    return 'none';
  }

  get gestureSummary(): String {
    switch (this.parsedScript.status) {
      case 'empty':
        return 'none';
      case 'success':
        return `${this.parsedScript.script.length} steps`;
    }
    return '?';
  }

  get gestureName(): String {
    return 'none';
  }

  get useGestureScript() {
    return this._preferences.useGestureScript;
  }

  set useGestureScript(value) {
    this._preferences.useGestureScript = value;
  }

  async scriptChanged() {
    const updatedScript = this.scriptInput.nativeElement.value;
    this.script = updatedScript;

    await delay(500);
    if (updatedScript != this.script) return;

    this.parsedScript = this._parser.parse(this.script);
    this.scriptErrorMessage = undefined;
    if (this.parsedScript.status == 'error') {
      this.scriptErrorMessage = this.parsedScript.message;
    } else if (this.parsedScript.status == 'success') {
      try {
        this._scriptTestRunner.validate(this.parsedScript.script);
      } catch (e) {
        this.scriptErrorMessage = (e as Error).message;
        return;
      }
      this._preferences.gestureScript = this.script;
    }
  }

  testIsRecording = false;

  testScript() {
    this._scriptTestRunner.run(this.script);
  }
}

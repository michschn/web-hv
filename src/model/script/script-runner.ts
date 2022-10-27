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

import { MotionConnection } from '../motion_connection';
import { Sleep, Step, StepType, Swipe, Tap } from './definition';
import { Parser } from './parser';
import { delay } from '../../utils/utils';

export class ScriptRunner {
  private readonly _parser = new Parser();

  constructor(
    private readonly _motionConnection: MotionConnection,
    private readonly _callbacks: {
      beginRecording: () => Promise<void>;
      endRecording: () => Promise<void>;
    }
  ) {}

  async run(script: string): Promise<void> {
    const validatedScript = this.parseAndValidate(script);

    const handlers: Record<StepType, (step: Step) => Promise<void>> = {
      begin: this._callbacks.beginRecording,
      end: this._callbacks.endRecording,
      sleep: step => this._handleSleep(step as Sleep),
      swipe: step => this._handleSwipe(step as Swipe),
      tap: step => this._handleTap(step as Tap),
    };

    for (const step of validatedScript) {
      await handlers[step.type](step);
    }
  }

  parseAndValidate(script: string): ReadonlyArray<Step> {
    {
      const parserResult = this._parser.parse(script);
      if (parserResult.status == 'error') {
        throw new Error(parserResult.message);
      }

      const parsedScript = [];
      if (parserResult.status == 'success') {
        parsedScript.push(...parserResult.script);
      }

      return this.validate(parsedScript);
    }
  }

  validate(script: ReadonlyArray<Step>): ReadonlyArray<Step> {
    let beginRecordingIndex = -1;
    let endRecordingIndex = -1;

    for (let i = 0; i < script.length; i++) {
      if (script[i].type == 'begin') {
        if (beginRecordingIndex != -1) {
          throw new Error(`Validation error: duplicate 'begin'`);
        }
        if (endRecordingIndex != -1) {
          throw new Error(`Validation error: 'begin' after 'end'`);
        }
        beginRecordingIndex = i;
      } else if (script[i].type == 'end') {
        if (endRecordingIndex != -1) {
          throw new Error(`Validation error: duplicate 'end'`);
        }
        endRecordingIndex = i;
      }
    }

    const result = [...script];
    if (beginRecordingIndex == -1) {
      result.unshift({ type: 'begin' });
    }
    if (endRecordingIndex == -1) {
      result.push({ type: 'end' });
    }
    return result;
  }

  private async _handleSwipe(step: Swipe) {
    await this._motionConnection.shellCommand(
      `input swipe ${step.start.x} ${step.start.y} ${step.end.x} ${step.end.y} ${step.durationMillis}`
    );
  }

  private async _handleTap(step: Tap) {
    await this._motionConnection.shellCommand(`input tap ${step.at.x} ${step.at.y}`);
  }

  private async _handleSleep(step: Sleep) {
    await delay(step.durationMillis);
  }
}

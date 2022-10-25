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

import { VisualTimeline } from './visual-timeline';
import { Timeline } from '../recording/timeline';

describe('VisualTimeline', () => {
  const timeline = new Timeline([0, 0.5, 1, 1.5], 2);

  describe('translation functions', () => {
    let subject: VisualTimeline;
    beforeEach(() => {
      subject = new VisualTimeline(10, timeline);
    });

    it('px to time interpolates', () => {
      expect(subject.pxToTime(0)).toBe(0);
      expect(subject.pxToTime(1.25)).toBe(0.25);
      expect(subject.pxToTime(2.5)).toBe(0.5);
    });

    it('px to frame rounds to frame', () => {
      expect(subject.pxToFrame(0)).toBe(0);
      expect(subject.pxToFrame(0.1)).toBe(0);
      expect(subject.pxToFrame(2.4)).toBe(0);
      expect(subject.pxToFrame(2.5)).toBe(1);
      expect(subject.pxToFrame(2.6)).toBe(1);
      // ...
      expect(subject.pxToFrame(9.9)).toBe(3);
      expect(subject.pxToFrame(10)).toBe(Number.POSITIVE_INFINITY);
    });

    it('time to px interpolates', () => {
      expect(subject.timeToPx(0)).toBe(0);
      expect(subject.timeToPx(0.25)).toBe(1.25);
      expect(subject.timeToPx(0.5)).toBe(2.5);
    });

    it('frame to px returns frame begin position', () => {
      expect(subject.frameToPx(0)).toBe(0);
      expect(subject.frameToPx(1)).toBe(2.5);
      expect(subject.frameToPx(2)).toBe(5);
      expect(subject.frameToPx(3)).toBe(7.5);
    });
  });
});

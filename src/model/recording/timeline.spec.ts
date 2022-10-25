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

import { Timeline } from './timeline';

describe('Timeline', () => {
  describe('basic properties', () => {
    it('works for empty timeline', () => {
      const subject = new Timeline([], 0);

      expect(subject.duration).toBe(0);
      expect(subject.frameCount).toBe(0);
      expect(subject.frameTimes).toEqual([]);
    });
    it('basic properties work', () => {
      const subject = new Timeline([0, 1, 2, 3], 4);

      expect(subject.duration).toBe(4);
      expect(subject.frameCount).toBe(4);
      expect(subject.frameTimes).toEqual([0, 1, 2, 3]);
    });
  });

  describe('getFrameTime', () => {
    let subject: Timeline;
    beforeEach(() => {
      subject = new Timeline([0, 1, 2, 3], 4);
    });

    it('returns first frame for times in range of first frame', () => {
      expect(subject.getFrameFromTime(0.1)).toBe(0);
      expect(subject.getFrameFromTime(0.5)).toBe(0);
      expect(subject.getFrameFromTime(0.9)).toBe(0);
    });

    it('returns second frame for times in range of second frame', () => {
      expect(subject.getFrameFromTime(1.1)).toBe(1);
      expect(subject.getFrameFromTime(1.5)).toBe(1);
      expect(subject.getFrameFromTime(1.9)).toBe(1);
    });

    it('returns second last for times in range of last frame', () => {
      expect(subject.getFrameFromTime(3.1)).toBe(3);
      expect(subject.getFrameFromTime(3.5)).toBe(3);
      expect(subject.getFrameFromTime(3.9)).toBe(3);
    });

    it('returns frame exactly at frame time', () => {
      expect(subject.getFrameFromTime(0)).toBe(0);
      expect(subject.getFrameFromTime(1)).toBe(1);
      expect(subject.getFrameFromTime(2)).toBe(2);
      expect(subject.getFrameFromTime(3)).toBe(3);
    });

    it('returns positive infinity for times after duration', () => {
      expect(subject.getFrameFromTime(4)).toBePositiveInfinity();
      expect(subject.getFrameFromTime(100)).toBePositiveInfinity();
    });

    it('returns negative infinity for times before 0', () => {
      expect(subject.getFrameFromTime(-1)).toBeNegativeInfinity();
    });

    it('on empty timelines returns infinity', () => {
      const subject = new Timeline([], 0);
      expect(subject.getFrameFromTime(0)).toBePositiveInfinity();
      expect(subject.getFrameFromTime(0.1)).toBePositiveInfinity();
      expect(subject.getFrameFromTime(-0.1)).toBeNegativeInfinity();
    });
  });

  describe('getFrameFromTime', () => {
    let subject: Timeline;
    beforeEach(() => {
      subject = new Timeline([0, 1, 2, 3], 4);
    });

    it('returns first frame for times in range of first frame', () => {
      expect(subject.getFrameFromTime(0.1)).toBe(0);
      expect(subject.getFrameFromTime(0.5)).toBe(0);
      expect(subject.getFrameFromTime(0.9)).toBe(0);
    });

    it('returns second frame for times in range of second frame', () => {
      expect(subject.getFrameFromTime(1.1)).toBe(1);
      expect(subject.getFrameFromTime(1.5)).toBe(1);
      expect(subject.getFrameFromTime(1.9)).toBe(1);
    });

    it('returns second last for times in range of last frame', () => {
      expect(subject.getFrameFromTime(3.1)).toBe(3);
      expect(subject.getFrameFromTime(3.5)).toBe(3);
      expect(subject.getFrameFromTime(3.9)).toBe(3);
    });

    it('returns frame exactly at frame time', () => {
      expect(subject.getFrameFromTime(0)).toBe(0);
      expect(subject.getFrameFromTime(1)).toBe(1);
      expect(subject.getFrameFromTime(2)).toBe(2);
      expect(subject.getFrameFromTime(3)).toBe(3);
    });

    it('returns positive infinity for times after duration', () => {
      expect(subject.getFrameFromTime(4)).toBePositiveInfinity();
      expect(subject.getFrameFromTime(100)).toBePositiveInfinity();
    });

    it('returns negative infinity for times before 0', () => {
      expect(subject.getFrameFromTime(-1)).toBeNegativeInfinity();
    });

    it('on empty timelines returns infinity', () => {
      const subject = new Timeline([], 0);
      expect(subject.getFrameFromTime(0)).toBePositiveInfinity();
      expect(subject.getFrameFromTime(0.1)).toBePositiveInfinity();
      expect(subject.getFrameFromTime(-0.1)).toBeNegativeInfinity();
    });
  });

  describe('getTimeFromFrame', () => {
    let subject: Timeline;
    beforeEach(() => {
      subject = new Timeline([0, 0.2, 0.4, 0.6], 4);
    });

    it('returns frame times', () => {
      expect(subject.getTimeFromFrame(0)).toBe(0);
      expect(subject.getTimeFromFrame(1)).toBe(0.2);
      expect(subject.getTimeFromFrame(2)).toBe(0.4);
      expect(subject.getTimeFromFrame(3)).toBe(0.6);
    });

    it('returns positive infinity for frame number past end', () => {
      expect(subject.getTimeFromFrame(4)).toBePositiveInfinity();
    });

    it('ignores frame fractions ', () => {
      expect(subject.getTimeFromFrame(0.1)).toBe(0);
      expect(subject.getTimeFromFrame(1.9)).toBe(0.2);
    });

    it('returns negative infinity for frame number before 0', () => {
      expect(subject.getTimeFromFrame(-1)).toBeNegativeInfinity();
    });
  });
});

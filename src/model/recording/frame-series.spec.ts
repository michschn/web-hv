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

import { FrameSeries, FrameSeriesBuilder, TEST_ONLY } from './frame-series';

describe('FrameSeries', () => {
  it('can create 0 length builder', () => {
    expect(FrameSeriesBuilder.createNumber(0)).toBeTruthy();
  });

  it('can build 0 length series', () => {
    const subject = FrameSeriesBuilder.createNumber(0).build();
    expect(subject.length).toBe(0);
    expect([...subject]).toEqual([]);
  });

  it('stores values', () => {
    const builder = FrameSeriesBuilder.createNumber(10);
    for (let i = 0; i < 10; i++) builder.setValue(i, i);

    const subject = builder.build();
    expect(subject.length).toBe(10);
    expect([...subject]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('can random access with at()', () => {
    const builder = FrameSeriesBuilder.createNumber(10);
    for (let i = 0; i < 10; i++) builder.setValue(i, i + 5);

    const subject = builder.build();
    expect(subject.at(0)).toEqual(5);
    expect(subject.at(9)).toEqual(14);
    expect(subject.at(2)).toEqual(7);
  });

  it('stores same values efficiently', () => {
    const builder = FrameSeriesBuilder.createNumber(10);
    for (let i = 0; i < 10; i++) builder.setValue(i, 42);

    const subject = builder.build();
    expect(subject.length).toBe(10);
    expect([...subject]).toEqual([42, 42, 42, 42, 42, 42, 42, 42, 42, 42]);
    expect(TEST_ONLY.getActualValueCount(subject)).toBe(1);
  });

  it('stores different values independently', () => {
    const builder = FrameSeriesBuilder.createNumber(10);
    for (let i = 0; i < 10; i++) builder.setValue(i, i);

    const subject = builder.build();
    expect(subject.length).toBe(10);
    expect([...subject]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(TEST_ONLY.getActualValueCount(subject)).toBe(10);
  });

  it('stores range of same values', () => {
    const subject = FrameSeriesBuilder.createNumber(5).setValue(0, 42).setValue(4, 43).build();
    expect(subject.length).toBe(5);
    expect([...subject]).toEqual([42, 42, 42, 42, 43]);
    expect(TEST_ONLY.getActualValueCount(subject)).toBe(2);
  });
});

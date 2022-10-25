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

import { checkArgument, checkState } from '../../utils/preconditions';

/**
 * Array-like structure to store a values per frame.
 */
export interface FrameSeries<T> extends Iterable<T | undefined> {
  /** Length of the array-like structure. */
  readonly length: number;
  /** Value at the specified frame number. */
  at(index: number): T | undefined;
  /** Minimal value of the time series, `undefined` for non-comparable series values. */
  readonly min?: T;
  /** Maximal value of the time series, `undefined` for non-comparable series values. */
  readonly max?: T;
}

type MinMaxFn<T> = (values: (T | undefined)[]) => T | undefined;

export class FrameSeriesBuilder<T> {
  readonly _bitset: DataView;
  private _data: Array<T | undefined> = [];

  private constructor(
    private readonly _length: number,
    private readonly _min: MinMaxFn<T>,
    private readonly _max: MinMaxFn<T>
  ) {
    this._bitset = new DataView(new ArrayBuffer(Math.ceil(_length / 8)));
  }

  static createNumber(
    length: number,
    min?: MinMaxFn<number>,
    max?: MinMaxFn<number>
  ): FrameSeriesBuilder<number> {
    return new FrameSeriesBuilder(length, min ?? minNumberValue, max ?? maxNumberValue);
  }

  private _lastSetIndex = -1;
  setValue(index: number, value: T): this {
    checkArgument(index > this._lastSetIndex);
    this._lastSetIndex = index;

    checkArgument(index < this._length);

    const dataIndex = index > 0 ? dataIndexFromIndex(index - 1, this._bitset) : -1;
    if (dataIndex < 0 || this._data[dataIndex] !== value) {
      this._data.push(value);
      const bitChunkAddress = index / 8;
      this._bitset.setUint8(
        bitChunkAddress,
        this._bitset.getUint8(bitChunkAddress) | (1 << index % 8)
      );
    }
    return this;
  }

  build(): FrameSeries<T> {
    const min = this._min(this._data);
    const max = this._max(this._data);

    if (this._data.length <= 1) {
      return new ConstantValueFrameSeries(this._length, this._data[0], min, max);
    }

    return new CoalescedFrameSeries(this._length, min, max, this._bitset, this._data);
  }
}

export function fixedMinMaxValue<T>(value: T): MinMaxFn<T> {
  return _ => value;
}

export function minNumberValue(values: (number | undefined)[]): number | undefined {
  let result: number | undefined = undefined;
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (value === undefined) continue;
    if (result === undefined || result > value) {
      result = value;
    }
  }
  return result;
}

export function maxNumberValue(values: (number | undefined)[]): number | undefined {
  let result: number | undefined = undefined;
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (value === undefined) continue;
    if (result === undefined || result < value) {
      result = value;
    }
  }
  return result;
}

const UNDEFINED_MIN_MAX: MinMaxFn<any> = fixedMinMaxValue(undefined);

/** A FrameSeries where the value is constant over the whole time series. */
class ConstantValueFrameSeries<T> implements FrameSeries<T> {
  constructor(
    readonly length: number,
    private readonly value: T | undefined,
    readonly min: T | undefined,
    readonly max: T | undefined
  ) {}

  at(index: number): T | undefined {
    return this.value;
  }

  *[Symbol.iterator](): Iterator<T | undefined> {
    for (let i = 0; i < this.length; i++) {
      yield this.value;
    }
  }
}

/** This implementation coalesces subsequent equal values to save memory. */
class CoalescedFrameSeries<T> implements FrameSeries<T> {
  constructor(
    readonly length: number,
    readonly min: T | undefined,
    readonly max: T | undefined,
    /**
     * Whether the value is different from the previous one.
     *
     * Bits are indexed from least to most significant bit, that is for index 0,
     * the least significant bit of the first byte holds the information.
     *
     * Note that currently the bit for index 0 is always expected to be set.
     */
    private readonly _bitset: DataView,
    /**
     * The actual unique values, stored in
     * [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) objects.
     */
    private readonly _data: Array<T | undefined>
  ) {}

  at(index: number): T | undefined {
    const dataIndex = dataIndexFromIndex(index, this._bitset);
    return this._data[dataIndex];
  }

  *[Symbol.iterator](): Iterator<T | undefined> {
    let dataIndex = -1;
    for (let i = 0; i < this.length; i++) {
      const hasValue = this._bitset.getUint8(i / 8) & (1 << i % 8);
      if (hasValue) dataIndex++;

      checkState(dataIndex >= 0);
      checkState(dataIndex < this._data.length);

      yield this._data[dataIndex];
    }
  }

  get testOnlyActualValueCount() {
    return this._data.length;
  }
}

function dataIndexFromIndex(index: number, bitset: DataView) {
  let result = 0;
  let bitsetByteIndex = 0;

  const full32BitChunks = Math.floor(index / 32);
  for (let i = 0; i < full32BitChunks; i++) {
    result += countBitsSet(bitset.getUint32(bitsetByteIndex));
    bitsetByteIndex += 4;
  }

  const full8BitChunks = Math.floor(index / 8);
  for (let i = bitsetByteIndex; i < full8BitChunks; i++) {
    result += countBitsSet(bitset.getUint8(bitsetByteIndex));
    bitsetByteIndex++;
  }

  const remainderBitmask = 0xff >> (7 - (index % 8));
  result += countBitsSet(bitset.getUint8(bitsetByteIndex) & remainderBitmask);
  return result - 1;
}

function countBitsSet(int32: number) {
  //https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel
  int32 = int32 - ((int32 >> 1) & 0x55555555);
  int32 = (int32 & 0x33333333) + ((int32 >> 2) & 0x33333333);
  return (((int32 + (int32 >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}

export const TEST_ONLY = {
  getActualValueCount(timeseries: FrameSeries<unknown>) {
    if (timeseries instanceof CoalescedFrameSeries) {
      return timeseries.testOnlyActualValueCount;
    } else if (timeseries instanceof ConstantValueFrameSeries) {
      return 1;
    }
    throw new Error('Unexpected FrameSeries type');
  },
};

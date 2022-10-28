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

import { arrayBufferEquals, asciiStringToBytes, Deferred, longToBigInt } from './utils';
import Long from 'long';

describe('DeferredPromise', () => {
  it('can be created', () => {
    const subject = new Deferred<string>();
    expect(subject).not.toBeFalsy();
  });

  it('is initially unresolved', async () => {
    const subject = new Deferred<string>();
    await expectAsync(subject).toBePending();
  });

  it('can be resolved', async () => {
    const subject = new Deferred<string>();
    subject.resolve('deferred');
    await expectAsync(subject).toBeResolved('deferred');
  });

  it('can be rejected', async () => {
    const subject = new Deferred<string>();
    subject.reject('deferred');

    await expectAsync(subject).toBeRejectedWith('deferred');
  });
});

describe('arrayBufferEquals', () => {
  it('returns true for empty buffers', () => {
    const left = new Uint8Array(0);
    const right = new Uint8Array(0);

    expect(arrayBufferEquals(left, right)).toBeTrue();
  });

  it('returns false for different length buffers', () => {
    const left = new Uint8Array(0);
    const right = new Uint8Array(1);

    expect(arrayBufferEquals(left, right)).toBeFalse();
  });

  it('returns false for buffer with different contents', () => {
    const left = new Uint8Array([1, 2]);
    const right = new Uint8Array([1, 3]);

    expect(arrayBufferEquals(left, right)).toBeFalse();
  });

  it('returns true for buffer with same contents', () => {
    const left = new Uint8Array([1, 2]);
    const right = new Uint8Array([1, 2]);

    expect(arrayBufferEquals(left, right)).toBeTrue();
  });

  it('returns true for same subarray view', () => {
    const large = new Uint8Array([0, 1, 2, 3]);
    const left = large.subarray(1, 3);
    const right = new Uint8Array([1, 2]);

    expect(arrayBufferEquals(left, right)).toBeTrue();
  });
});

describe('asciiStringToBytes', () => {
  it('returns empty buffer for empty string', () => {
    const actual = asciiStringToBytes('');
    const expected = new Uint8Array(0);

    expect(arrayBufferEquals(actual, expected)).toBeTrue();
  });

  it('returns buffer with ascii bytes', () => {
    const actual = asciiStringToBytes('foo');
    const expected = new Uint8Array([102, 111, 111]);

    expect(arrayBufferEquals(actual, expected)).toBeTrue();
  });

  it('throws on non-ascii characters', () => {
    expect(() => asciiStringToBytes('🤯')).toThrow();
  });
});

describe('longToBigInt', () => {
  it('zero', () => {
    expect(longToBigInt(Long.UZERO)).toBe(0n);
  });

  it('one', () => {
    expect(longToBigInt(Long.ONE)).toBe(1n);
  });

  it('minus one', () => {
    expect(longToBigInt(Long.NEG_ONE)).toBe(-1n);
  });

  it('max unsigned', () => {
    expect(longToBigInt(Long.MAX_UNSIGNED_VALUE)).toBe((1n << 64n) - 1n);
  });

  it('max signed', () => {
    expect(longToBigInt(Long.MAX_VALUE)).toBe((1n << 63n) - 1n);
  });

  it('min signed', () => {
    expect(longToBigInt(Long.MIN_VALUE)).toBe(-1n << 63n);
  });
});

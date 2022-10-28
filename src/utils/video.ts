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

/** Performs a binary search for the frame in frameTimes that is closest to the timestamp `time`. */
export function frameBinarySearch<T extends number|bigint>(time: T, frameTimes: T[]): number {
  let start = 0;
  let end = frameTimes.length - 1;

  while (start <= end) {
    let mid = (start + end) >> 1;

    if (frameTimes[mid] === time) {
      return mid;
    }

    if (time < frameTimes[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  if (end < 0) return 0;

  if (end < frameTimes.length - 1) {
    if (Math.abs(Number(frameTimes[end + 1] - time)) < Math.abs(Number(frameTimes[end] - time))) {
      return end + 1;
    }
  }

  return end;
}

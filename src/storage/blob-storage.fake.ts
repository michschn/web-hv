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

import { BlobStorage } from './blob-storage';

export class FakeBlobStorage implements BlobStorage {
  private constructor(public readonly recordingId: string) {}

  /** Creates a `BlobStorage` for accessing data blobs related to `recordingId`. */
  public static async createStorage(recordingId: string): Promise<FakeBlobStorage> {
    return new FakeBlobStorage(recordingId);
  }

  writeable(name: string): Promise<WritableStream<Uint8Array>> {
    return Promise.reject('Not implemented');
  }

  readable(name: string): Promise<ReadableStream<Uint8Array>> {
    return Promise.reject('Not implemented');
  }
}

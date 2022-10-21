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

import { InjectionToken } from '@angular/core';

/**
 * Stores large binary blobs, such as videos and serialized data.
 */
export interface BlobStorage {
  writeable(name: string): Promise<WritableStream<Uint8Array>>;
  readable(name: string): Promise<ReadableStream<Uint8Array>>;
}

export type BlobStorageFactory = (recordingId: string) => Promise<BlobStorage>;

/** DI token for the [BlobStorageFactory] */
export const BLOB_STORAGE_FACTORY = new InjectionToken<BlobStorageFactory>('BlobStorageFactory');

/**
 * Implementation of `BlobStorage` building on top of the Origin Private File System
 * https://wicg.github.io/file-system-access/#wellknowndirectory-origin-private-file-system
 */
export class OpfsBlobStorage implements BlobStorage {
  private constructor(private readonly rootDirectory: FileSystemDirectoryHandle) {}

  /** Creates a `BlobStorage` for accessing data blobs related to `recordingId`. */
  public static async createStorage(recordingId: string): Promise<OpfsBlobStorage> {
    return new OpfsBlobStorage(await getRecordingDirectory(recordingId));
  }

  async writeable(name: string): Promise<WritableStream<Uint8Array>> {
    const fileHandle = await this.rootDirectory.getFileHandle(name, { create: true });
    return fileHandle.createWritable();
  }

  async readable(name: string): Promise<ReadableStream<Uint8Array>> {
    const fileHandle = await this.rootDirectory.getFileHandle(name);
    // NodeJS stream types seem to interfere here - explicitly cast to the DOM stream type.
    return (await fileHandle.getFile()).stream() as unknown as ReadableStream<Uint8Array>;
  }
}

async function getRecordingDirectory(recordingId: string) {
  const root = await navigator.storage.getDirectory();
  try {
    return await root.getDirectoryHandle(recordingId);
  } catch {
    return await root.getDirectoryHandle(recordingId, { create: true });
  }
}

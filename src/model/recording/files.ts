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

export const FILENAME_SCREENRECORDING = 'screenrecord.mp4';
export const FILENAME_TRRACE = 'trace.pb.bin';

export async function getRecordingDirectory(recordingId: string) {
  const root = await navigator.storage.getDirectory();
  try {
    return await root.getDirectoryHandle(recordingId);
  } catch {
    return await root.getDirectoryHandle(recordingId, { create: true });
  }
}

export async function getOrCreateFileHandle(name: string, recordingId: string) {
  const directory = await getRecordingDirectory(recordingId);
  try {
    return await directory.getFileHandle(name);
  } catch {
    return await directory.getFileHandle(name, { create: true });
  }
}

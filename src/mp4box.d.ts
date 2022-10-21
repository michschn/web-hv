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

/** Minimal typings for https://github.com/gpac/mp4box.js */
declare module 'mp4box' {
  export interface MediaTrack {
    id: number;
    created: Date;
    modified: Date;
    movie_duration: number;
    movie_timescale: number;
    layer: number;
    alternate_group: number;
    volume: number;
    track_width: number;
    track_height: number;
    timescale: number;
    duration: number;
    bitrate: number;
    codec: string;
    language: string;
    nb_samples: number;
  }

  interface VideoData {
    width: number;
    height: number;
  }

  export interface VideoTrack extends MediaTrack {
    video: VideoData;
  }

  export interface FileInfo {
    duration: number;
    timescale: number;
    fragment_duration: number;
    isFragmented: boolean;
    isProgressive: boolean;
    hasIOD: boolean;
    brands: string[];
    created: Date;
    modified: Date;
    tracks: MediaTrack[];
    videoTracks: VideoTrack[];
    metadataTracks: MediaTrack[];
  }

  export interface Sample {
    alreadyRead: number;
    chunk_index: number;
    chunk_run_index: number;
    cts: number;
    data: Uint8Array;
    degradation_priority: number;
    depends_on: number;
    description: any;
    description_index: number;
    dts: number;
    duration: number;
    has_redundancy: number;
    is_depended_on: number;
    is_leading: number;
    is_sync: boolean;
    number: number;
    offset: number;
    size: number;
    timescale: number;
    track_id: number;
  }

  export type Buffer = ArrayBuffer & { fileStart: number };

  export interface Parser {
    onMoovStart?: () => void;
    onReady?: (info: FileInfo) => void;
    onError?: (e: string) => void;
    onSamples?: (id: number, user: any, samples: Sample[]) => any;

    appendBuffer(data: Buffer): number;
    start(): void;
    stop(): void;
    flush(): void;
    releaseUsedSamples(trackId: number, sampleNumber: number): void;
    setExtractionOptions(
      trackId: number,
      user?: any,
      options?: { nbSamples?: number; rapAlignment?: number }
    ): void;
  }

  export function createFile(): Parser;

  export {};
}

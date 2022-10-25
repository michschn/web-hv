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

import { SeekableVideoSource } from '../video/video-source';
import { Disposable } from '../../utils/disposer';
import { RecordedViewSource } from '../video/recorded-view-source';
import { BlobStorage } from '../../storage/blob-storage';
import { BLOB_TRACE_NAME } from './constants';
import { motion } from '../../proto/storage.js';
import { Properties, transposeTrace } from './properties';
import { ViewIdFactory } from './view-id';
import { Timeline } from './timeline';
import { checkNotNull } from '../../utils/preconditions';
import Long from 'long';

export class Recording implements Disposable {
  constructor(
    readonly viewIdFactory: ViewIdFactory,
    readonly properties: Properties,
    readonly timeline: Timeline,
    public readonly videoSource: SeekableVideoSource
  ) {}

  static async load(storage: BlobStorage): Promise<Recording> {
    const trace = motion.Trace.decode(await storage.read(BLOB_TRACE_NAME));

    const viewIdFactory = new ViewIdFactory();

    const duration =
      Long.fromValue(checkNotNull(trace.duration?.seconds)).toNumber() +
      (trace.duration?.nanos ?? 0) / 1_000_000_000;

    const timeline = new Timeline(
      trace.frames?.map(frame => checkNotNull(frame.videoTimeSeconds)) ?? [],
      duration
    );
    const properties = transposeTrace(trace, viewIdFactory);
    const videoSource = await RecordedViewSource.createVideoSource(storage);

    return new Recording(viewIdFactory, properties, timeline, videoSource);
  }

  dispose(): void {
    this.videoSource.dispose();
    this.viewIdFactory.dispose();
  }
}

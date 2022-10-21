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

import { TestBed } from '@angular/core/testing';

import { RecorderService } from './recorder.service';
import { MotionConnection } from '../motion_connection';
import { BLOB_STORAGE_FACTORY } from '../../storage/blob-storage';
import { FakeBlobStorage } from '../../storage/blob-storage.fake';

describe('RecorderService', () => {
  let service: RecorderService;

  beforeEach(() => {
    const motionConnection = jasmine.createSpyObj('MotionConnection', ['createVideoCapture']);

    TestBed.configureTestingModule({
      providers: [
        RecorderService,
        {
          provide: MotionConnection,
          useValue: motionConnection,
        },
        {
          provide: BLOB_STORAGE_FACTORY,
          useValue: FakeBlobStorage.createStorage,
        },
      ],
    });
    service = TestBed.inject(RecorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

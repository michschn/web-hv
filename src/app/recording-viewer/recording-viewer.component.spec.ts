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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingViewerComponent } from './recording-viewer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RecorderService } from '../../model/recording/recorder.service';
import { MotionConnection } from '../../model/motion_connection';
import { BLOB_STORAGE_FACTORY } from '../../storage/blob-storage';
import { FakeBlobStorage } from '../../storage/blob-storage.fake';
import { ProgressTracker } from '../../utils/progress';

describe('RecordingViewerComponent', () => {
  let component: RecordingViewerComponent;
  let fixture: ComponentFixture<RecordingViewerComponent>;

  beforeEach(async () => {
    const motionConnection = jasmine.createSpyObj('MotionConnection', ['']);

    await TestBed.configureTestingModule({
      declarations: [RecordingViewerComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        RecorderService,
        ProgressTracker,
        {
          provide: MotionConnection,
          useValue: motionConnection,
        },
        {
          provide: BLOB_STORAGE_FACTORY,
          useValue: FakeBlobStorage.createStorage,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordingViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

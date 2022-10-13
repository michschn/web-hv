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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MotionConnection } from '../model/motion_connection';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressTracker } from '../utils/progress';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MotionViewerComponent } from './motion-viewer/motion-viewer.component';
import { UiModule } from '../ui/ui.module';
import { RecorderService } from '../model/recording/recorder.service';
import { RecordingViewerComponent } from './recording-viewer/recording-viewer.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, MotionViewerComponent, RecordingViewerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    UiModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: MotionConnection,
      useFactory: () =>
        MotionConnection.createFromUrlParams(new URLSearchParams(window.location.search)),
    },
    RecorderService,
    ProgressTracker,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

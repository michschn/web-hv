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
import { VideoViewComponent } from './video-view/video-view.component';
import { TimelineViewComponent } from './timeline-view/timeline-view.component';
import { OscilloscopeConfigViewComponent } from './oscilloscope-config-view/oscilloscope-config-view.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VideoControlsComponent } from './video-controls/video-controls.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GraphComponent } from './timeline-view/graph/graph.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VideoViewComponent, TimelineViewComponent, OscilloscopeConfigViewComponent, VideoControlsComponent, GraphComponent],
  imports: [MatExpansionModule, CommonModule, DragDropModule, MatButtonModule, MatIconModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, ScrollingModule, MatCheckboxModule, MatInputModule, FormsModule],
  exports: [VideoViewComponent, OscilloscopeConfigViewComponent, TimelineViewComponent],
})
export class UiModule {}

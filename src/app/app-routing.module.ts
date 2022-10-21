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
import { RouterModule, Routes, UrlHandlingStrategy, UrlTree } from '@angular/router';
import { RecordingViewerComponent } from './recording-viewer/recording-viewer.component';
import { MotionViewerComponent } from './motion-viewer/motion-viewer.component';
import { HashLocationStrategy, LocationStrategy, PlatformLocation } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'live',
    pathMatch: 'full',
  },
  {
    path: 'live',
    component: MotionViewerComponent,
  },
  {
    path: 'recording',
    component: RecordingViewerComponent,
  },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [
    {
      provide: LocationStrategy,
      useFactory: (platformLocation: PlatformLocation) => {
        return new MotionToolsLocationStrategy(platformLocation);
      },
      deps: [PlatformLocation],
    },
    {
      provide: UrlHandlingStrategy,
      useFactory: (platformLocation: PlatformLocation) =>
        new PreserveConnectionParametersStrategy(platformLocation),
      deps: [PlatformLocation],
    },
  ],
})
export class AppRoutingModule {}

/**
 * The default HashLocationStrategy uses '/' for the path, which redirects to index.html.
 * Also, the query parameters are written after the #, which causes the MotionConnection to abort.
 *
 */
class MotionToolsLocationStrategy extends HashLocationStrategy {
  constructor(platformLocation: PlatformLocation) {
    super(platformLocation, '');
  }

  override prepareExternalUrl(internal: string): string {
    const prepared = super.prepareExternalUrl(internal);
    const match = prepared.match(/([^?]*)(\?.*)?/);

    const url = match ? (match[2] ?? '') + (match[1] ?? '') : prepared;

    return 'motion.html' + url;
  }
}

class PreserveConnectionParametersStrategy implements UrlHandlingStrategy {
  static queryParameters = ['serial', 'pid', 'pname', 'wid'];

  constructor(private platformLocation: PlatformLocation) {}

  private get currentQueryParams(): string {
    return this.platformLocation?.search ?? '';
  }

  shouldProcessUrl(url: UrlTree): boolean {
    return true;
  }

  extract(url: UrlTree): UrlTree {
    return this.preserveSearch(url);
  }

  merge(newUrlPart: UrlTree, wholeUrl: UrlTree): UrlTree {
    return newUrlPart;
  }

  private preserveSearch(newUrl: UrlTree): UrlTree {
    const currentQueryParams = new URLSearchParams(this.currentQueryParams);
    for (const queryParameter of PreserveConnectionParametersStrategy.queryParameters) {
      const existingValue = currentQueryParams.get(queryParameter);
      const newValue = newUrl.queryParams[queryParameter];
      if (existingValue && !newValue) {
        newUrl.queryParams[queryParameter] = existingValue;
      }
    }

    return newUrl;
  }
}

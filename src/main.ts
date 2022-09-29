// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import 'reflect-metadata';
import './motion-app';

import { container } from 'tsyringe';
import { MotionConnection } from './model/motion_connection';

(function main() {
  let motionConnection: MotionConnection;
  try {
    motionConnection = MotionConnection.createFromUrlParams(
      new URLSearchParams(window.location.search)
    );
  } catch (e) {
    // Basic validation of the URL parmeters failed.
    // Redirect back to web-hv to select an activity.
    const webHvURL = new URL(window.location.toString());
    webHvURL.pathname = webHvURL.pathname.replace('motion.html', 'index.html');
    window.location.replace(webHvURL);
    return;
  }

  container.register<MotionConnection>(MotionConnection, {
    useValue: motionConnection,
  });

  document.body.append(document.createElement('motion-app'));
})();

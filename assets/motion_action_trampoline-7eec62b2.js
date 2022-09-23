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

/**
 * Loads the source code for the motion viewer and bootstraps it.
 *
 * This is currently needed as the rest of web-hv does not yet use es6 modules.
 */
async function motionViewerActionTrampoline(activityInfo) {
    $("#main-progress").show();
    $("#device-list-content").empty().hide();
    $("#darkThemeSwitch").remove();

    // TODO(michschn): make both github deployment and local dev work.
    // Was unable to get rollup-replace to work, working around this for now.
    let githubDeploymentPrefix = '';
    if (window.location.pathname.startsWith('/web-hv/')) {
        githubDeploymentPrefix = '/web-hv';
    }

    const {
        motionViewerAction,
    } = await import(`${githubDeploymentPrefix}/motion/motion_action.js`)

    $("#main-progress").hide();
    await motionViewerAction(activityInfo);
}

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

import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';


import {css, html, LitElement} from 'lit';

/**
 * Root element of the motion viewer
 */
export class MotionViewerElement extends LitElement {
    static get styles() {
        return css`
      :host {
        display: flex;
        flex-direction: column;
      }`;
    }

    static get properties() {
        return {
            /**
             * @type {Object}
             */
            viewController: {type: Object, attribute: false},
        };
    }

    constructor() {
        super();
    }

    render() {
        return html`
          <mwc-top-app-bar-fixed>
            <mwc-icon-button icon="arrow_back" slot="navigationIcon"></mwc-icon-button>
            <span slot="title">Motion Viewer</span>
            <mwc-icon-button icon="pause_circle" slot="actionItems"></mwc-icon-button>
          <div id="contents">
            <video-view>
            </video-view>
            <timeline-view>
            </timeline-view>
          </div>
          </mwc-top-app-bar-fixed>
          `;
    }
}

window.customElements.define('motion-viewer', MotionViewerElement);
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

import {css, html, LitElement, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {MotionConnection, State} from './model/motion_connection';

import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';
import '@material/mwc-linear-progress';

import {container} from 'tsyringe';
import {ProgressTracker} from './utils/progress';
import {Disposer} from './utils/disposer';

/**
 *
 */
@customElement('motion-app')
export class MotionAppElement extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
  `;

  constructor() {
    super();
  }

  private readonly _disposer = new Disposer();
  private readonly _connection = container.resolve(MotionConnection);
  private readonly _progressTracker = container.resolve(ProgressTracker);

  @state() private _showProgress = false;
  @state() private _connectionState: State = 'disconnected';

  override connectedCallback() {
    super.connectedCallback();

    this._disposer.addListener(
      this._connection,
      'state-changed',
      e => (this._connectionState = (e as CustomEvent).detail)
    );
    this._disposer.addListener(
      this._progressTracker,
      'progress-started',
      () => (this._showProgress = true)
    );
    this._disposer.addListener(
      this._progressTracker,
      'progress-ended',
      () => (this._showProgress = true)
    );

    this._connection.connect();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._disposer.dispose();
    this._connection.disconnect();
  }

  override render() {
    const isConnected = this._connectionState === 'connected';
    return html`
      <mwc-top-app-bar-fixed>
        <span slot="title">Motion</span>
        ${isConnected
          ? html` <mwc-icon-button
              icon="pause_circle"
              slot="actionItems"
            ></mwc-icon-button>`
          : nothing}
        ${this.connectionMenu()}

        <div id="contents" connected>
          <mwc-linear-progress></mwc-linear-progress>
        </div>
      </mwc-top-app-bar-fixed>
    `;
  }

  private connectionMenu() {
    const stateIncicator = ConnectionStateIndicator[this._connectionState];
    return html`
      <mwc-icon-button
        icon="${stateIncicator.icon}"
        title="${stateIncicator.label}"
        slot="actionItems"
      >
      </mwc-icon-button>
      <mwc-menu absolute multi></mwc-menu>
    `;
  }
}

const ConnectionStateIndicator: Record<State, { label: string; icon: string }> =
  {
    disconnected: { label: 'Disconnected', icon: 'usb_off' },
    connecting: { label: 'Connecting...', icon: 'usb' },
    connected: { label: 'Connected', icon: 'usb' },
    error: { label: 'Error', icon: 'error_outline' },
    unauthorized: { label: 'Unauthorized', icon: 'warning_amber' },
  };

declare global {
  interface HTMLElementTagNameMap {
    'motion-app': MotionAppElement;
  }
}

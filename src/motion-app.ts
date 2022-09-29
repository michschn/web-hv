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

import { css, html, LitElement, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { choose } from 'lit/directives/choose.js';

import { MotionConnection, State } from './model/motion_connection';

import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon-button';
import '@material/mwc-icon';
import '@material/mwc-linear-progress';

import { container } from 'tsyringe';
import { ProgressTracker } from './utils/progress';
import { Disposer } from './utils/disposer';

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

    #contents {
      position: relative;
    }

    .overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 3;
      background: rgba(0, 0, 0, 0.06);
      display: flex;
      flex-direction: column;
      align-items: center;
      place-content: center;
    }

    .message {
      display: flex;
      flex-direction: row;
    }

    .message mwc-icon {
      align-self: center;
      justify-self: center;
      --mdc-icon-size: 64px;
    }

    .message.error mwc-icon {
      color: var(--error-color);
      margin-right: 16px;
    }

    .message .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .message .title {
      font-size: 24px;
    }

    .message .subtitle {
      margin-top: 4px;
    }
  `;

  constructor() {
    super();
  }

  private readonly _disposer = new Disposer();
  private readonly _connection = container.resolve(MotionConnection);
  private readonly _progressTracker = container.resolve(ProgressTracker);

  @state() private _showProgress = false;
  @state() private _connectionState: State = { type: 'disconnected' };
  @query('#contents', true) private _content!: HTMLDivElement;

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

  firstUpdated() {
    const updateHeight = () => (this._content.style.height = `${window.innerHeight - 64}px`);
    this._disposer.addListener(window, 'resize', updateHeight);
    updateHeight();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._disposer.dispose();
    this._connection.disconnect();
  }

  override render() {
    return html`
      <mwc-top-app-bar-fixed>
        <span slot="title">Motion</span>
        ${when(
          this._connectionState.type === 'connected',
          () => html` <mwc-icon-button icon="pause_circle" slot="actionItems"></mwc-icon-button>`
        )}
        ${this.connectionMenu()}
        <div id="contents">
          ${when(this._showProgress, () => html` <mwc-linear-progress></mwc-linear-progress>`)}
          ${this.errorContainer()}
        </div>
      </mwc-top-app-bar-fixed>
    `;
  }

  private connectionMenu() {
    const stateIncicator = ConnectionStateIndicator[this._connectionState.type];
    return html`
      <mwc-icon-button
        state=""
        icon="${stateIncicator.icon}"
        title="${stateIncicator.label}"
        slot="actionItems"
      >
      </mwc-icon-button>
      <mwc-menu absolute multi></mwc-menu>
    `;
  }

  private errorContainer() {
    switch (this._connectionState.type) {
      case 'error':
        return html` <div class="overlay">
          <div class="message error">
            <mwc-icon>error_outline</mwc-icon>
            <div class="content">
              <div class="title">
                ${choose(this._connectionState.detail, [
                  ['deviceNotFound', () => html`Device not found.`],
                  ['processNotFound', () => html`Process not found.`],
                  ['windowNotFound', () => html`Window not found`],
                  ['unknown', () => html`An error happened. `],
                ])}
              </div>
              <div class="subtitle">${this._connectionState.message}</div>
            </div>
          </div>
        </div>`;
      case 'unauthorized':
        return html` <div class="overlay">
          <div class="message warning">
            <mwc-icon>warning_amber</mwc-icon>
            <div class="content">
              <div class="title">Not authorized.</div>
              <div class="subtitle">Authorize USB debugging on the device.</div>
            </div>
          </div>
        </div>`;
      default:
        return nothing;
    }
  }
}

const ConnectionStateIndicator: Record<State['type'], { label: string; icon: string }> = {
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

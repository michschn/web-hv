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

import { Deferred } from './utils';

describe('DeferredPromise', () => {
  it('can be created', () => {
    const subject = new Deferred<string>();
    expect(subject).not.toBeFalsy();
  });

  it('is initially unresolved', async () => {
    const subject = new Deferred<string>();
    await expectAsync(subject).toBePending();
  });

  it('can be resolved', async () => {
    const subject = new Deferred<string>();
    subject.resolve('deferred');
    await expectAsync(subject).toBeResolved('deferred');
  });

  it('can be rejected', async () => {
    const subject = new Deferred<string>();
    subject.reject('deferred');

    await expectAsync(subject).toBeRejectedWith('deferred');
  });
});


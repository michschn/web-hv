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

import { ViewId, ViewIdFactory } from './view-id';

describe('ViewId', () => {
  let factory: ViewIdFactory;

  beforeEach(() => {
    factory = new ViewIdFactory();
  });

  it('create from parts with resource id', () => {
    const viewId = factory.viewId('foo', 255, 'SCRIM');

    expect(viewId).toBeTruthy();
  });

  it('view to match itself', () => {
    const viewId = factory.viewId('foo', 255, 'SCRIM');

    expect(viewId.matches(viewId)).toBeTrue();
  });
  it('create twice returns same instance', () => {
    const viewId1 = factory.viewId('foo', 255, 'SCRIM');
    const viewId2 = factory.viewId('foo', 255, 'SCRIM');

    expect(viewId2).toBe(viewId1);
  });

  it('create twice with different hash returns different instance', () => {
    const viewId1 = factory.viewId('foo', 255, 'SCRIM');
    const viewId2 = factory.viewId('foo', 127, 'SCRIM');

    expect(viewId2).not.toBe(viewId1);
  });

  it('same view with different hash matches', () => {
    const viewId1 = factory.viewId('foo', 255, 'SCRIM');
    const viewId2 = factory.viewId('foo', 127, 'SCRIM');

    expect(viewId1.matches(viewId2)).toBeTrue();
    expect(viewId2.matches(viewId1)).toBeTrue();
  });

  it('view with different class does not match', () => {
    const viewId1 = factory.viewId('foo', 255, 'SCRIM');
    const viewId2 = factory.viewId('bar', 255, 'SCRIM');

    expect(viewId1.matches(viewId2)).toBeFalse();
    expect(viewId2.matches(viewId1)).toBeFalse();
  });

  it('view with different resource id does not match', () => {
    const viewId1 = factory.viewId('foo', 255, 'SCRIM');
    const viewId2 = factory.viewId('foo', 127, 'BACKDROP');

    expect(viewId1.matches(viewId2)).toBeFalse();
    expect(viewId2.matches(viewId1)).toBeFalse();
  });

  it('instanceKey encodes classname and hashcode', () => {
    const viewId = factory.viewId('foo', 255, 'SCRIM');
    expect(viewId.instanceKey).toBe('foo@ff');
  });
});

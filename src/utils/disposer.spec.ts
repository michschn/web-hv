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

import { Disposable, Disposer } from './disposer';

describe('Disposer', () => {
  it('disposes function', () => {
    const subject = new Disposer(true);
    const callback = jasmine.createSpy();

    subject.addFunction(callback);
    expect(callback).not.toHaveBeenCalled();

    subject.dispose();
    expect(callback).toHaveBeenCalled();
  });

  it('disposes Disposable', () => {
    const subject = new Disposer(true);
    const disposable: Disposable = {
      dispose: jasmine.createSpy(),
    };

    subject.addDisposable(disposable);
    expect(disposable.dispose).not.toHaveBeenCalled();

    subject.dispose();
    expect(disposable.dispose).toHaveBeenCalled();
  });

  it('addListener registers event listener n event target', () => {
    const subject = new Disposer();
    const eventTarget = new EventTarget();
    const listener = jasmine.createSpy();
    const addListener = spyOn(eventTarget, 'addEventListener');

    subject.addListener(eventTarget, 'foo', listener);
    expect(addListener).toHaveBeenCalledOnceWith('foo', listener, undefined);
  });

  it('addListener unregisters listener on dispose', () => {
    const subject = new Disposer();

    const eventTarget = new EventTarget();
    const listener = jasmine.createSpy();
    const removeListener = spyOn(eventTarget, 'removeEventListener').and.callThrough();
    subject.addListener(eventTarget, 'foo', listener);

    expect(removeListener).not.toHaveBeenCalled();
    subject.dispose();

    expect(removeListener).toHaveBeenCalledOnceWith('foo', listener, undefined);
  });

  describe('oneShot', () => {
    it('cannot be disposed twice', () => {
      const subject = new Disposer(false);

      subject.dispose();
      expect(() => subject.dispose()).toThrow();
    });

    it('cannot add disposable after dispose', () => {
      const subject = new Disposer(false);

      subject.dispose();
      expect(() => subject.addFunction(() => undefined)).toThrow();
    });
  });

  describe('multiShot', () => {
    it('can disposed twice', () => {
      const subject = new Disposer(true);

      subject.dispose();
      expect(() => subject.dispose()).not.toThrow();
    });

    it('disposes each function exactly once', () => {
      const subject = new Disposer(true);

      const callback = jasmine.createSpy();
      subject.addFunction(callback);

      subject.dispose();
      expect(callback).toHaveBeenCalledTimes(1);

      subject.dispose();
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});

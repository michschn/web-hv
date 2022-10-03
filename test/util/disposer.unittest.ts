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

import { Disposable, Disposer } from '../../src/utils/disposer';
import { expect, use } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

describe('Disposer', () => {
  it('disposes function', () => {
    const subject = new Disposer(true);
    const callback = sinon.fake();

    subject.addFunction(callback);
    expect(callback).to.not.have.been.called;

    subject.dispose();
    expect(callback).to.have.been.called;
  });

  it('disposes Disposable', () => {
    const subject = new Disposer(true);
    const disposable: Disposable = {
      dispose: sinon.fake(),
    };

    subject.addDisposable(disposable);
    expect(disposable.dispose).to.not.have.been.called;

    subject.dispose();
    expect(disposable.dispose).to.have.been.called;
  });

  it('addListener registers event listener n event target', () => {
    const subject = new Disposer();
    const eventTarget = new EventTarget();
    const listener = sinon.fake();
    const addListener = sinon.spy(eventTarget, 'addEventListener');

    subject.addListener(eventTarget, 'foo', listener);
    expect(addListener).to.have.been.calledOnce;
    expect(addListener).to.have.been.calledWith('foo', listener);
    expect(addListener).to.have.been.calledOn(eventTarget);
  });

  it('addListener unregisters listener on dispose', () => {
    const subject = new Disposer();

    const eventTarget = new EventTarget();
    const listener = sinon.fake();
    const removeListener = sinon.spy(eventTarget, 'removeEventListener');
    subject.addListener(eventTarget, 'foo', listener);

    expect(removeListener).to.not.have.been.called;
    subject.dispose();

    expect(removeListener).to.have.been.calledOnce;
    expect(removeListener).to.have.been.calledWith('foo', listener);
    expect(removeListener).to.have.been.calledOn(eventTarget);
  });

  describe('oneShot', () => {
    it('cannot be disposed twice', () => {
      const subject = new Disposer(false);

      subject.dispose();
      expect(() => subject.dispose()).to.throw();
    });

    it('cannot add disposable after dispose', () => {
      const subject = new Disposer(false);

      subject.dispose();
      expect(() => subject.addFunction(() => undefined)).to.throw();
    });
  });

  describe('multiShot', () => {
    it('can disposed twice', () => {
      const subject = new Disposer(true);

      subject.dispose();
      expect(() => subject.dispose()).to.not.throw();
    });

    it('disposes each function exactly once', () => {
      const subject = new Disposer(true);

      const callback = sinon.fake();
      subject.addFunction(callback);

      subject.dispose();
      expect(callback).to.have.been.calledOnce;

      subject.dispose();
      expect(callback).to.have.been.calledOnce;
    });
  });
});

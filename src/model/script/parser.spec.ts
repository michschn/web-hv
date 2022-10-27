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

import { Parser } from './parser';

describe('Parser', () => {
  let subject: Parser;
  beforeEach(() => {
    subject = new Parser();
  });

  it('skips comments', () => {
    const result = subject.parse('#foo');
    expect(result).toEqual({ status: 'empty' });
  });

  it('skips comments at end of line', () => {
    const result = subject.parse('begin #foo');
    expect(result).toEqual({ status: 'success', script: [{ type: 'begin' }] });
  });

  it('trims whitespace', () => {
    const result = subject.parse(' \t   begin  \t ');
    expect(result).toEqual({ status: 'success', script: [{ type: 'begin' }] });
  });

  it('skips empty lines', () => {
    const result = subject.parse(`
    begin

end
    `);

    expect(result).toEqual({ status: 'success', script: [{ type: 'begin' }, { type: 'end' }] });
  });

  it('reports error on unknown verb', () => {
    const result = subject.parse('unknown');
    expect(result.status).toBe('error');
  });

  describe('swipe', () => {
    it('parses with omited duration', () => {
      const result = subject.parse('swipe 1 2 3 4');
      expect(result).toEqual({
        status: 'success',
        script: [
          { type: 'swipe', start: { x: 1, y: 2 }, end: { x: 3, y: 4 }, durationMillis: 300 },
        ],
      });
    });

    it('parses with specified duration', () => {
      const result = subject.parse('swipe 1 2 3 4 5');
      expect(result).toEqual({
        status: 'success',
        script: [{ type: 'swipe', start: { x: 1, y: 2 }, end: { x: 3, y: 4 }, durationMillis: 5 }],
      });
    });
  });

  describe('tap', () => {
    it('reads coordinates', () => {
      const result = subject.parse('tap 1 2');
      expect(result).toEqual({
        status: 'success',
        script: [{ type: 'tap', at: { x: 1, y: 2 } }],
      });
    });
  });
});

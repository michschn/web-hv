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

import { Step } from './definition';

export type Result = Success | Empty | Error;

export interface Success {
  status: 'success';
  script: ReadonlyArray<Step>;
}

export interface Empty {
  status: 'empty';
}

export interface Error {
  status: 'error';
  message: string;
}

export class Parser {
  parse(spec: string): Result {
    const lines = spec
      .split('\n')
      .map(line => {
        const commentStart = line.indexOf('#');
        const lineEnd = commentStart != -1 ? commentStart : line.length;
        return line.substring(0, lineEnd).replace(/\s+/, ' ').trim();
      })
      .filter(line => line.length > 0);

    const script = [];
    for (const line of lines) {
      const parts = line.split(' ');
      const verb = parts[0];
      const args = parts.slice(1);

      try {
        script.push(parseCommand(verb, args));
      } catch (e: unknown) {
        return { status: 'error', message: (e as Error).message };
      }
    }

    if (script.length == 0) return { status: 'empty' };

    return { status: 'success', script };
  }
}
function parseCommand(verb: string, args: string[]): Step {
  function intArg(index: number) {
    const arg = args[index];
    if (!arg.match(/\d+/)) {
      throw new Error(`[${verb}] Expected int argument but got '${arg}'`);
    }

    return parseInt(arg);
  }

  switch (verb) {
    case 'begin':
      return { type: 'begin' };
    case 'end':
      return { type: 'end' };
    case 'sleep':
      if (args.length != 1) {
        throw new Error(`[${verb}] wrong number of arguments - expected 1 but got ${args.length}`);
      }
      return { type: 'sleep', durationMillis: intArg(0) };
    case 'swipe':
      if (args.length < 4) {
        throw new Error(`[${verb}] too few arguments - expected 4 but got ${args.length}`);
      }
      if (args.length > 5) {
        throw new Error(`[${verb}] too many arguments`);
      }
      const durationMillis = args.length > 4 ? intArg(4) : 300;
      return {
        type: 'swipe',
        start: { x: intArg(0), y: intArg(1) },
        end: { x: intArg(2), y: intArg(3) },
        durationMillis,
      };
    case 'tap':
      if (args.length != 2) {
        throw new Error(`[${verb}] wrong number of arguments - expected 2 but got ${args.length}`);
      }
      return {
        type: 'tap',
        at: { x: intArg(0), y: intArg(1) },
      };

    default:
      throw new Error(`unknown command "${verb}"`);
  }

  throw new Error('Function not implemented.');
}

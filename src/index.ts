// Copyright (c) 2019 Siddharth Doshi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import randombytes from 'randombytes';

import { charsets } from './charset';
export { charsets } from './charset';

interface OptionsObject {
  length?: number;
  characters?: string;
}

type Options = OptionsObject | number;

const MAX_CHARSET_SIZE = 0x10000;

const defaultOptions = {
  length: 32,
  characters: charsets.alphanumeric,
};

export function randomstring(options?: number): string;
export function randomstring(options?: Options): string;
export function randomstring(options: Options | number = 32): string {
  if (typeof options === 'number') {
    options = {
      length: options,
    };
  }

  const result: string[] = [];
  const opts = {
    ...defaultOptions,
    ...options,
  };

  if (opts.characters.length >= MAX_CHARSET_SIZE) {
    throw new Error(
      `Character set size should not increase ${MAX_CHARSET_SIZE}`
    );
  }

  // Let c be `characters.length`.
  // The closest number to MAX_CHARSET_SIZE that is divisible by `c`.
  // We take the number that is a multiple of `c` so that each character from
  // the set has an equal chance of being choosen.
  const max = MAX_CHARSET_SIZE - (MAX_CHARSET_SIZE % opts.characters.length);

  // Most of the time, the randomstring would be built in first inner loop.
  // But on cases when multiple invalid selectors are found and we can't build
  // the compelete string in first loop, we continue looping.
  while (result.length < opts.length) {
    // Ensure that the size of entropy is even because we are using 2 bytes
    // for getting selectors. We use 16bit selectors so that it would allow
    // generating random strings from bigger character sets.
    // The size of entropy is also set to be a little longer than the requested
    // length so that we have higher chances of generating the compelete string
    // in one loop.
    const entropy = randombytes(Math.ceil(1.1 * opts.length) * 2);

    for (let i = 0; i < entropy.length && result.length < opts.length; i += 2) {
      const selector = entropy.readUInt16BE(i);
      if (selector > max) {
        continue;
      }
      result.push(opts.characters[selector % opts.characters.length]);
    }
  }

  return result.join('');
}

export default randomstring;

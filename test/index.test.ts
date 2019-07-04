// Copyright (c) 2019 Siddharth Doshi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import randomstr, { charsets, randomstring } from '../src';

test('proper exports', () => {
  expect(randomstr).toBeInstanceOf(Function);
  expect(randomstring).toBeInstanceOf(Function);
  expect(randomstring).toBe(randomstr);
  expect(charsets).toBeDefined();
});

test('with odd length', () => {
  expect(randomstr(1).length).toEqual(1);
  expect(randomstr(9).length).toEqual(9);
  expect(randomstr(999).length).toEqual(999);
});

test('with even length', () => {
  expect(randomstr(2).length).toEqual(2);
  expect(randomstr(10).length).toEqual(10);
  expect(randomstr(1020).length).toEqual(1020);
});

test('throws when charset exceeds max allowed', () => {
  expect(() =>
    randomstr({ characters: charsets.alphanumeric.repeat(1200) })
  ).toThrow('Character set size should not increase 65536');
});

test('numeric', () => {
  expect(randomstr({ characters: charsets.numeric, length: 10 })).toMatch(
    /^\d{10}$/
  );
});

test('alphanumeric', () => {
  expect(randomstr({ characters: charsets.alphanumeric, length: 10 })).toMatch(
    /^[0-9a-zA-Z]{10}$/
  );
});

test('alphabetic', () => {
  expect(randomstr({ characters: charsets.alphabetic, length: 10 })).toMatch(
    /^[a-zA-Z]{10}$/
  );
});

test('loweralpha', () => {
  expect(randomstr({ characters: charsets.loweralpha, length: 10 })).toMatch(
    /^[a-z]{10}$/
  );
});

test('upperalpha', () => {
  expect(randomstr({ characters: charsets.upperalpha, length: 10 })).toMatch(
    /^[A-Z]{10}$/
  );
});

test('symbols', () => {
  expect(randomstr({ characters: charsets.symbols, length: 10 })).toMatch(
    new RegExp(`^[\\${charsets.symbols.split('').join('\\')}]{10}$`)
  );
});

test('hex', () => {
  expect(randomstr({ characters: charsets.hex, length: 10 })).toMatch(
    /^[A-F0-9]{10}$/
  );
});

test('custom', () => {
  const symbols = charsets.symbols.split('').join('\\');
  expect(
    randomstr({
      characters: charsets.alphanumeric + charsets.symbols,
      length: 20,
    })
  ).toMatch(new RegExp(`^[\\${symbols}0-9a-zA-Z]{20}$`));
});

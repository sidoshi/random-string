// Copyright (c) 2019 Siddharth Doshi
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

type Charset =
  | 'alphanumeric'
  | 'alphabetic'
  | 'loweralpha'
  | 'upperalpha'
  | 'numeric'
  | 'hex'
  | 'symbols';

type Charsets = {
  [key in Charset]: string;
};

const numbers = '0123456789';
const charsLower = 'abcdefghijklmnopqrstuvwxyz';
const charsUpper = charsLower.toUpperCase();
const hexChars = 'ABCDEF';
const symbols = '!@#$%^&*()<>?/[]{},.:;';

export const charsets: Charsets = {
  alphanumeric: charsLower + charsUpper + numbers,
  alphabetic: charsLower + charsUpper,
  loweralpha: charsLower,
  upperalpha: charsUpper,
  numeric: numbers,
  hex: hexChars + numbers,
  symbols,
};

# Cryptographic Random String

[![Build Status](https://travis-ci.org/sidoshi/random-string.svg?branch=master)](https://travis-ci.org/sidoshi/random-string)

Library to create cryptographically random strings.

## Install

```bash
npm i @sidoshi/random-string
```

## Usage

```js
import { randomstring, charsets } from '@sidoshi/random-string';

// => Alphanumeric string of length 32
console.log(randomstring());

// => Alphanumeric string of length 10
console.log(randomstring(10));

// => Alphabetic string of length 32
console.log(randomstring({ characters: charsets.alphabetic }));

// => Numeric string of length 10
console.log(randomstring({ characters: charsets.numeric, length: 10 }));

// => String of length 50 with custom character set
console.log(
  randomstring({ characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', length: 50 })
);

// => Composing predefined charsets
console.log(
  randomstring({ characters: charsets.numeric + charsets.symbols, length: 50 })
);
```

## API

- `charsets` - Predefined character sets
  - `alphanumeric`
  - `alphabetic`
  - `loweralpha`
  - `upperalpha`
  - `numeric`
  - `hex`
  - `symbols`

* `randomstring(size?)` - Generate a random string of given size. (default: 30)

- `randomstring(options?)` - Generate a random string using given options
  - `length` - Length of the specified string. (default: 30)
  - `characters` - Character set to use to generate string (default: `charsets.alphanumeric`). Can be one of the predifined `charsets` or a custom
    string. Throws if `characters.length` > 65536.

## Licence

MIT © [Siddharth Doshi](https://sid.sh)

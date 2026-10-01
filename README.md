# Leet Speak Converter

A tiny zero-dependency ESM library that translates text to and from classic
single-character leetspeak.

```js
import { toLeet, fromLeet } from './src/index.js';

toLeet('leet');      // -> '1337'
fromLeet('1337');    // -> 'leet'
```

## Why this exists

There are plenty of leet converters online, but they tend to be either
non-deterministic (random symbol selection per call) or full of multi-character
sequences that make round-tripping impossible. This library picks one fixed,
unambiguous, *single-character* substitution per letter so that `fromLeet(toLeet(x))`
is a reliable, testable inverse — at the cost of not supporting the richer,
context-dependent dialects of leetspeak. If you need `(|` for `a` or `ph` for
`f`, this is not the right tool.

## The awkward edge you will hit

`toLeet` is case-insensitive: it lowercases every character before lookup, so
information about the original casing is discarded. That means
`fromLeet(toLeet('LeEt'))` returns `'leet'`, not `'LeEt'`. This is a deliberate
trade-off — the alternative (preserving case) would require case-sensitive
symbols in the reverse map, and classic leet symbols are conventionally written
without case distinctions. If you need to preserve casing, keep your original
string and use the leet form only for display.

## API

- `toLeet(input: string): string` — encode plain text as leet. Throws
  `TypeError` on non-string input.
- `fromLeet(input: string): string` — decode leet back to plain text. Throws
  `TypeError` on non-string input.
- `leetMap` — frozen `Record<string, string>` of the letter → symbol table
  the library uses, exposed for callers who want to build on the same mapping.

## Mapped letters

`a→4`, `b→8`, `e→3`, `g→6`, `l→1`, `o→0`, `s→5`, `t→7`, `z→2`. Every other
character passes through unchanged in both directions.

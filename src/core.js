/**
 * @fileoverview Core substitution logic for the leet converter.
 *
 * Design choice: the substitution tables are *static and lowercase-normalised*.
 * The brief says "character-level symbol substitution rules" — we implement exactly
 * that, one symbol per letter. We deliberately do not support word-level leet
 * patterns (e.g. "M0RG4N" being a unit) because that requires contextual
 * lookups and would explode the API. The trade-off is a predictable, round-trippable
 * mapping that is easy to reason about and test.
 */

/**
 * The canonical letter -> leet mapping. Lowercase keys only.
 *
 * Why these particular symbols: they are the unambiguous, single-character
 * substitutions that a human reader of classic leetspeak recognises instantly
 * (a=4, e=3, etc.). Symbols like `(|` for `a` are multi-character and would
 * break the contract of "character-level" substitution, so they are excluded.
 *
 * @type {Readonly<Record<string, string>>}
 */
const LEET_MAP = Object.freeze({
  a: '4',
  b: '8',
  e: '3',
  g: '6',
  l: '1',
  o: '0',
  s: '5',
  t: '7',
  z: '2',
});

/**
 * Reverse mapping, built once at module load. We freeze it so callers cannot
 * mutate the lookup table and cause non-deterministic results later.
 *
 * @type {Readonly<Record<string, string>>}
 */
const REVERSE_MAP = Object.freeze(
  Object.fromEntries(
    Object.entries(LEET_MAP).map(([letter, symbol]) => [symbol, letter]),
  ),
);

/**
 * @param {string} input
 * @returns {string} Leet-encoded text.
 */
export function toLeet(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`toLeet expects a string, got ${typeof input}`);
  }
  if (input.length === 0) {
    return '';
  }

  let out = '';
  for (let i = 0; i < input.length; i++) {
    const lower = input[i].toLowerCase();
    out += LEET_MAP[lower] ?? input[i];
  }
  return out;
}

/**
 * @param {string} input
 * @returns {string} Decoded plain text.
 */
export function fromLeet(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`fromLeet expects a string, got ${typeof input}`);
  }
  if (input.length === 0) {
    return '';
  }

  let out = '';
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    out += REVERSE_MAP[ch] ?? ch;
  }
  return out;
}

/**
 * The mapping used internally. Exposed for callers who want to build their
 * own higher-level behaviour on top of the same table without re-deriving it.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const leetMap = LEET_MAP;

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toLeet, fromLeet, leetMap } from '../src/index.js';

test('toLeet substitutes the basic mapped letters', () => {
  assert.strictEqual(toLeet('leet'), '1337');
});

test('toLeet substitutes mixed-case letters case-insensitively', () => {
  assert.strictEqual(toLeet('LeEt'), '1337');
});

test('toLeet passes through unmapped characters unchanged', () => {
  assert.strictEqual(toLeet('Hello, World!'), 'H3110, W0r1d!');
});

test('toLeet returns empty string for empty input', () => {
  assert.strictEqual(toLeet(''), '');
});

test('toLeet throws on non-string input', () => {
  assert.throws(() => toLeet(42), TypeError);
});

test('fromLeet reverses the basic symbols back to letters', () => {
  assert.strictEqual(fromLeet('1337'), 'leet');
});

test('fromLeet is idempotent for unmapped characters', () => {
  assert.strictEqual(fromLeet('Hello, World!'), 'Hello, World!');
});

test('fromLeet returns empty string for empty input', () => {
  assert.strictEqual(fromLeet(''), '');
});

test('fromLeet throws on non-string input', () => {
  assert.throws(() => fromLeet(null), TypeError);
});

test('round-trip via fromLeet(toLeet(x)) recovers lowercase content', () => {
  // Note: toLeet is case-insensitive, so casing is lost on the round trip.
  // We document and test that known limitation rather than pretending it works.
  const original = 'Leet Speak';
  const roundTrip = fromLeet(toLeet(original));
  assert.strictEqual(roundTrip, 'leet speak');
});

test('fromLeet decodes symbols that appear without surrounding letters', () => {
  assert.strictEqual(fromLeet('0 1 2 3 4 5 6 7 8'), 'o l z e a s g t b');
});

test('leetMap exposes the full substitution table as a frozen object', () => {
  assert.deepStrictEqual(leetMap, {
    a: '4', b: '8', e: '3', g: '6',
    l: '1', o: '0', s: '5', t: '7', z: '2',
  });
  assert.strictEqual(Object.isFrozen(leetMap), true);
});

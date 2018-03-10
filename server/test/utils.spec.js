const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

const {
  countOccurrence,
  handleStreamError,
  normalizeWords,
} = require('../src/utils');

const runUtilsTests = () => {
  // UTILS
  const wordsFixture = ['dude', 'jane', 'harry', 'dude'];

  test('countOccurrence counts correct occurences', (t) => {
    const expectedCounts = { dude: 2, jane: 1, harry: 1 };
    t.same(countOccurrence(wordsFixture), expectedCounts);
    t.end();
  });

  test('normalizeWords provides an array of separated words', (t) => {
    const needsCleaning = 'dude ^^*&^* jane harry dude ()*&)(&() hello-there NZD1,234';
    const expected = ['dude', 'jane', 'harry', 'dude', 'hello-there', 'nzd1,234'];
    t.same(normalizeWords(needsCleaning), expected);
    t.end();
  });

  test('handleStreamError ends response in development mode', (t) => {
    let errorMessage;

    const fakeRes = function fake() {
      return {
        end() { return this; },
        json({ error }) {
          errorMessage = error;
          return this;
        },
        status() { return this; },
      };
    };

    const err = Error('Ouch.');

    handleStreamError(err, fakeRes(), path.resolve('../tmp/'));
    t.equal(errorMessage, 'Ouch.');

    t.end();
  });

  test('handleStreamError ends response in development mode', (t) => {
    let errorMessage;

    const fakeRes = function fake() {
      return {
        end() { return this; },
        json({ error }) {
          errorMessage = error;
          return this;
        },
        status() { return this; },
      };
    };

    const err = Error('Ouch.');
    const envOriginal = process.env.NODE_ENV;

    process.env.NODE_ENV = 'production';

    handleStreamError(err, fakeRes(), path.resolve('../tmp/'));
    t.equal(errorMessage, 'Internal Server Error');

    process.env.NODE_ENV = envOriginal;
    t.end();
  });
};

module.exports = { runUtilsTests };

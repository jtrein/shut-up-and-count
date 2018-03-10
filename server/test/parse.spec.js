const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');
const concat = require('concat-stream');

const {
  parseEachWordCount,
  parseTotalWordCount,
} = require('../src/parse');

const fakeFilePath = `${__dirname}/mocks/fake.txt`;

const runParseTests = () => {
  test('parseEachWordCount sends back each count of parsed words', (t) => {
    const concatCallback = (theBuffer) => {
      t.same(parseEachWordCount(theBuffer), { hello: 1, 'i\'m': 1, fake: 1 });
      t.end();
    };

    const stream = fs.createReadStream(fakeFilePath);
    const concatStream = concat(concatCallback);

    stream.pipe(concatStream);
  });

  test('parseTotalWordCount Stream sends back total count of parsed words', (t) => {
    const concatCallback = (theBuffer) => {
      t.same(parseTotalWordCount(theBuffer), 3);
      t.end();
    };

    const stream = fs.createReadStream(fakeFilePath);
    const concatStream = concat(concatCallback);

    stream.pipe(concatStream);
  });
};

module.exports = { runParseTests };

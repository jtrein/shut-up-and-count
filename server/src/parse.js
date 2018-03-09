const { Transform } = require('stream');
const util = require('util');

const { eachWordCount, normalizeWords } = require('./utils');

function ParseTotalWordCount(options = {}) {
  // use without `new`
  if (!(this instanceof ParseTotalWordCount)) {
    return new ParseTotalWordCount(options);
  }

  Transform.call(this, options);
}

util.inherits(ParseTotalWordCount, Transform);

// eslint-disable-next-line no-underscore-dangle
ParseTotalWordCount.prototype._transform = function _transform(chunk, encoding, callback) {
  // try to parse our structure as stringified JSON (e.g. from ParseTotalWordCount)
  // else parse as a string
  // NOTE: this assumes normal ASCII, or characters safe for JSON parsing.
  try {
    const wordsFromJSON = JSON.parse(chunk.toString());
    const keyCount = Object.keys(wordsFromJSON);
    const sumOfWords = keyCount.reduce((acc, next) => acc + wordsFromJSON[next], 0);

    this.push(JSON.stringify({ wordCount: sumOfWords, eachWordCount: wordsFromJSON }));
  } catch (e) {
    const onlyWordsArray = normalizeWords(chunk.toString());
    const wordCount = onlyWordsArray.length;

    this.push(JSON.stringify({ wordCount }));
  }

  callback();
};

function ParseEachWordCount(options = {}) {
  // use without `new`
  if (!(this instanceof ParseEachWordCount)) {
    return new ParseEachWordCount(options);
  }

  Transform.call(this, options);
}

util.inherits(ParseEachWordCount, Transform);

// eslint-disable-next-line no-underscore-dangle
ParseEachWordCount.prototype._transform = function _transform(chunk, encoding, callback) {
  const onlyWordsArray = normalizeWords(chunk.toString());
  this.push(JSON.stringify(eachWordCount(onlyWordsArray)));

  callback();
};

module.exports = {
  ParseTotalWordCount,
  ParseEachWordCount,
};

const fs = require('fs');
const { IS_DEV } = require('./settings');

/**
 * eachWordCount
 *
 * @param  {arr}      words - array of strings
 * @return {obj}      object with words as keys and occurrences as value
 */
const countOccurrence = (words) => {
  const wordCountObject = {};
  const wordsLength = words.length;
  for (let i = 0; i < wordsLength; i += 1) {
    const word = words[i];
    if (wordCountObject[word]) {
      wordCountObject[word] += 1;
    } else {
      wordCountObject[word] = 1;
    }
  }
  return wordCountObject;
};

/**
 * normalizeWords
 *
 * Covers basic sentences where puctuation, hyphens and numbers may be mixed in.
 * e.g. "NZD1,000" "hyphenated-so-much" "I'm".
 *
 * @param  {str}      wordString - string of words
 * @return {arr}      array of matched words
 */
const normalizeWords = wordString => (
  wordString.toLowerCase().match(/(([\w'])+?([0-9],[0-9])?([A-z]-[A-z])?)+/g)
);

const handleOkResponse = (data, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
};

const handleStreamError = (err, res, fileLocation) => {
  if (IS_DEV()) {
    res.status(500).json({ error: err.message }).end();
    // eslint-disable-next-line no-console
    console.error(err);
  } else {
    res.status(500).json({ error: 'Internal Server Error' }).end();
  }
  fs.unlink(fileLocation, () => {});
};

module.exports = {
  countOccurrence,
  handleOkResponse,
  handleStreamError,
  normalizeWords,
};

const { countOccurrence, normalizeWords } = require('./utils');

const parseEachWordCount = (chunk) => {
  const onlyWordsArray = normalizeWords(chunk.toString());
  return countOccurrence(onlyWordsArray);
};

const parseTotalWordCount = (chunk) => {
  const onlyWordsArray = normalizeWords(chunk.toString());
  const wordCount = onlyWordsArray.length;
  return wordCount;
};

module.exports = {
  parseEachWordCount,
  parseTotalWordCount,
};

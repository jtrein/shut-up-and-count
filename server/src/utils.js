const eachWordCount = words => (
  words.reduce((acc, next) => {
    const intoObject = Object.keys(acc).length ? acc : {};
    const value = (intoObject[next] ? intoObject[next] += 1 : 1);

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

    return intoObject;
  }, {})
);

const normalizeWords = wordString => wordString.match(/\w+/g);

module.exports = {
  eachWordCount,
  normalizeWords,
};

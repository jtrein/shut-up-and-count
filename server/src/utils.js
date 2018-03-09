const eachWordCount = words => (
  words.reduce((acc, next) => {
    const intoObject = Object.keys(acc).length ? acc : {};
    const value = (intoObject[next] ? intoObject[next] += 1 : 1);

    // set value
    intoObject[next] = value;

    return intoObject;
  }, {})
);

const normalizeWords = wordString => wordString.match(/\w+/g);

module.exports = {
  eachWordCount,
  normalizeWords,
};

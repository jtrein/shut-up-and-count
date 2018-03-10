module.exports = {
  ALLOWED_FILE_MIME: 'text/plain',
  IS_DEV: () => process.env.NODE_ENV === 'development',
  FILE_KEY: 'textFile',
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  QUERY_EACH: 'each',
  QUERY_TOTAL: 'total',
};

const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const {
  ParseEachWordCount,
  ParseTotalWordCount,
} = require('./parse');

const {
  ACCEPTED_CONTENT_TYPES,
  IS_DEV,
  FILE_KEY,
  MAX_FILE_SIZE,
  QUERY_EACH,
  QUERY_TOTAL,
} = require('./settings');

// SETUP
const app = express();
const upload = multer({
  dest: './tmp/',
  limits: { fileSize: MAX_FILE_SIZE },
}).single(FILE_KEY);

// PARSE!
app.post('/parse', upload, (req, res) => {
  const fileLocation = path.resolve(req.file.path);

  const stream = fs.createReadStream(fileLocation);
  const parseEachWord = new ParseEachWordCount();
  const parseTotalWord = new ParseTotalWordCount();

  stream.on('error', () => {
    res.status(500, 'Data read error. Really sorry.');
    res.end();
  });

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  // process data & send response
  switch (req.query.type) {
    case QUERY_EACH:
      stream
        .pipe(parseEachWord)
        .pipe(res);
      break;
    case QUERY_TOTAL:
      stream
        .pipe(parseTotalWord)
        .pipe(res);
      break;
    default:
      stream
        .pipe(parseEachWord)
        .pipe(parseTotalWord)
        .pipe(res);
  }

  stream.on('end', () => {
    // remove file
    fs.unlink(fileLocation, () => {});
  });
});

// ERROR: just wanna log and pass it on.
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  if (IS_DEV) { console.error(err.stack); }
  next(err);
});

// ERROR: accept multer's errors
app.use('/parse', (err, req, res, next) => {
  // no message!? send it on.
  if (!err.message) {
    next(err);
    return;
  }

  res.status(err.status || 400);

  res.send({
    error: err.message,
    // send a status back in JSON to be nice to front-end dev - wait that's me.
    status: err.status || 400,
  });
});

// ERROR: well, something went off.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).send({ error: err.message });
});

module.exports = app;

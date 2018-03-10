const path = require('path');
const fs = require('fs');
const express = require('express');
const concat = require('concat-stream');
const eos = require('end-of-stream');

const {
  parseEachWordCount,
  parseTotalWordCount,
} = require('./parse');

const {
  IS_DEV,
  QUERY_EACH,
  QUERY_TOTAL,
} = require('./settings');

const {
  handleStreamError,
  handleOkResponse,
} = require('./utils');
const multerSetup = require('./multerSetup').default;

// SETUP
const app = express();

// PARSE!
app.post('/parse', multerSetup, (req, res) => {
  const parseStreamDataAsJSON = (dataBuffer) => {
    let dataToSend;
    switch (req.query.type) {
      case QUERY_EACH:
        dataToSend = { eachWordCount: parseEachWordCount(dataBuffer) };
        break;
      case QUERY_TOTAL:
        dataToSend = { totalWordCount: parseTotalWordCount(dataBuffer) };
        break;
      default:
        dataToSend = {
          eachWordCount: parseEachWordCount(dataBuffer),
          totalWordCount: parseTotalWordCount(dataBuffer),
        };
    }

    handleOkResponse(dataToSend, res);
  };

  const fileLocation = path.resolve(req.file.path);
  const stream = fs.createReadStream(fileLocation);
  // concat Buffers, then let garbage collection handle those departed...
  const concatStream = concat(parseStreamDataAsJSON);

  stream.on('error', err => handleStreamError(err, res, fileLocation));
  // go!
  stream.pipe(concatStream);

  // end-of-stream helper instead of using .on('end')
  eos(concatStream, (err) => {
    fs.unlink(fileLocation, () => {});
    if (err) handleStreamError(err, res, fileLocation);
  });
});

// ERROR: just wanna log and pass it on.
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  if (IS_DEV()) { console.error(err.stack); }
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

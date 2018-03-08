const express = require('express');
const multer = require('multer');

const { IS_DEV, fileKey } = require('./settings');

const app = express();
const upload = multer({ dest: './tmp/' }).single(fileKey);

app.post('/parse', upload, (req, res) => {
  res.send({ filePath: req.file.path });
});

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  if (IS_DEV) { console.error(err.stack); }
  next(err);
});

app.use('/parse', (err, req, res, next) => {
  // not multer, so send it on.
  if (!err.message) {
    next(err);
    return;
  }

  res.status(err.status || 400);

  res.send({
    error: err.message,
    // send a status back in JSON, to be nice.
    status: err.status || 400,
  });
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).send({ error: err.message });
});

module.exports = app;

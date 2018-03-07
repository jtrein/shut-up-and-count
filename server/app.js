'use strict';
var express = require('express');
var multer = require('multer');

var app = express();

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/tmp');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

app.post('/parse', upload.single('textfile'), function(req, res, next) {
  // req.file is the `textfile` file
  // req.body will hold the text fields, if there were any
});

exports.default = app;

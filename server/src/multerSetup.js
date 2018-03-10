const path = require('path');
const multer = require('multer');

const { IS_DEV } = require('./settings');

const {
  ALLOWED_FILE_MIME,
  FILE_KEY,
  MAX_FILE_SIZE,
} = require('./settings');

const fileFilter = (_, file, callback) => {
  const filetypesRegex = new RegExp(`${ALLOWED_FILE_MIME}|txt`);
  const mimetypeOK = filetypesRegex.test(file.mimetype);
  const extnameOK = filetypesRegex.test(path.extname(file.originalname).toLowerCase());

  if (mimetypeOK && extnameOK) {
    callback(null, true);
    return;
  }

  // don't process it
  callback(null, false);

  // also send along an error
  callback(Error(`File upload only supports the following filetype: '${ALLOWED_FILE_MIME}'`));
};

const multerSetup = multer({
  dest: './tmp/',
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
}).single(FILE_KEY);

exports.default = multerSetup;

/* testing only */
const TESTS = {};
exports.TESTS = TESTS;

if (IS_DEV()) {
  TESTS.fileFilter = fileFilter;
}

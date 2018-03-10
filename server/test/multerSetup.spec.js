const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies

const { TESTS } = require('../src/multerSetup');

const runMulterSetupTests = () => {
  test('multerSetup: fileFilter calls correct callback when file OK', (t) => {
    const fakeFileData = {
      mimetype: 'text/plain',
      originalname: 'hello.txt',
    };

    const callback = (err, shouldProcess) => {
      t.equal(err, null);
      t.equal(shouldProcess, true);
      t.end();
    };

    TESTS.fileFilter(null, fakeFileData, callback);
  });

  test('multerSetup: fileFilter calls correct callback when file OK', (t) => {
    const fakeFileData = {
      mimetype: 'application/javascript',
      originalname: 'hello.js',
    };

    const callback = (err, shouldProcess) => {
      if (err) {
        t.same(err.message, 'File upload only supports the following filetype: \'text/plain\'');
        t.end();
        return;
      }
      t.equal(shouldProcess, false);
    };

    TESTS.fileFilter(null, fakeFileData, callback);
  });
};

module.exports = { runMulterSetupTests };

const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('supertest'); // eslint-disable-line import/no-extraneous-dependencies

const app = require('../src/app');
const { fileKey } = require('../src/settings');

const fakeFilePath = `${__dirname}/mocks/fake.txt`;

test('File received on POST', (t) => {
  request(app)
    .post('/parse')
    .attach(fileKey, fakeFilePath)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'No error');
      t.equal(res.body.filePath.length, 36, 'File received');
      t.end();
    });
});

test('No file received on POST', (t) => {
  request(app)
    .post('/parse')
    .expect(200)
    .end((_, res) => {
      const parsedErrorText = JSON.parse(res.error.text);

      t.equal(res.status, 400, 'Response "status" 400 when no file received');

      t.equal(
        res.status,
        parsedErrorText.status,
        'Correct JSON "status" 400 when no file received',
      );

      t.equal(
        parsedErrorText.error,
        'Cannot read property \'path\' of undefined',
        'Correct JSON "error" when no file received',
      );

      t.end();
    });
});

test('Bad file key', (t) => {
  request(app)
    .post('/parse')
    .attach('textflezz', fakeFilePath)
    .expect(200)
    .end((_, res) => {
      const parsedErrorText = JSON.parse(res.error.text);

      t.equal(res.status, 400, 'Response "status" 400 when bad key received');

      t.equal(
        res.status,
        parsedErrorText.status,
        'Correct JSON "status" 400 when bad key received',
      );

      t.equal(
        parsedErrorText.error,
        'Unexpected field',
        'Correct JSON "error" when bad key received',
      );

      t.end();
    });
});

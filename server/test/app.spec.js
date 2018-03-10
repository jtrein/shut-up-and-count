const test = require('tape'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('supertest'); // eslint-disable-line import/no-extraneous-dependencies

const app = require('../src/app');
const { FILE_KEY } = require('../src/settings');

const fakeFilePath = `${__dirname}/mocks/fake.txt`;
const badFilePath = `${__dirname}/mocks/badfile.js`;

const runAppTests = () => {
  test('File received and parsed', (t) => {
    const expectedBody = { eachWordCount: { hello: 1, 'i\'m': 1, fake: 1 }, totalWordCount: 3 };

    request(app)
      .post('/parse')
      .attach(FILE_KEY, fakeFilePath)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        t.error(err, 'No error');
        t.same(res.body, expectedBody, 'File received');
        t.end();
      });
  });

  test('File received and parsed with type=each', (t) => {
    const expectedBody = { eachWordCount: { hello: 1, 'i\'m': 1, fake: 1 } };

    request(app)
      .post('/parse?type=each')
      .attach(FILE_KEY, fakeFilePath)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        t.error(err, 'No error');
        t.same(res.body, expectedBody, 'File received');
        t.end();
      });
  });

  test('File received and parsed with type=total', (t) => {
    const expectedBody = { totalWordCount: 3 };

    request(app)
      .post('/parse?type=total')
      .attach(FILE_KEY, fakeFilePath)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        t.error(err, 'No error');
        t.same(res.body, expectedBody, 'File received');
        t.end();
      });
  });

  test('File received and parsed to default with bad param type=hello', (t) => {
    const expectedBody = { eachWordCount: { hello: 1, 'i\'m': 1, fake: 1 }, totalWordCount: 3 };

    request(app)
      .post('/parse?type=hello')
      .attach(FILE_KEY, fakeFilePath)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        t.error(err, 'No error');
        t.same(res.body, expectedBody, 'File received');
        t.end();
      });
  });

  test('No file received on POST', (t) => {
    request(app)
      .post('/parse')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
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
      .expect('Content-Type', 'application/json; charset=utf-8')
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

  test('Bad file type', (t) => {
    request(app)
      .post('/parse')
      .attach('textFile', badFilePath)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((_, res) => {
        const parsedErrorText = JSON.parse(res.error.text);

        t.equal(res.status, 400, 'Response "status" 400 when bad filetype received');

        t.equal(
          res.status,
          parsedErrorText.status,
          'Correct JSON "status" 400 when bad filetype received',
        );

        t.equal(
          parsedErrorText.error,
          'File upload only supports the following filetype: \'text/plain\'',
          'Correct JSON "error" when bad key received',
        );

        t.end();
      });
  });
};

module.exports = { runAppTests };

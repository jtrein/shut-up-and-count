import postTextFile from '../api';
import MockFetch from '../__mocks__/fetch';

test('postTextFile returns correct data', async () => {
  const origFetch = global.fetch;
  const fakeRes = [{ eachWordCount: { hello: 1 }, totalWordCount: 1 }];
  global.fetch = MockFetch(fakeRes);

  const response = await postTextFile([{ filename: 'hello' }]);

  expect(response).toEqual(fakeRes);

  global.fetch = origFetch;
});

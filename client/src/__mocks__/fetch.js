const MockFetch = (responseJson, options) => (
  () => (
    new Promise((resolve, reject) => resolve({
      ...options,
      json: () => {
        try {
          return JSON.parse(JSON.stringify(responseJson) || []);
        } catch (e) {
          return reject(e);
        }
      },
    }))
  )
);

export default MockFetch;

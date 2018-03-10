import 'whatwg-fetch';

import { PARSE_ENDPOINT, UPLOAD_KEY } from './settings';

const postTextFile = (file) => {
  const data = new window.FormData();
  data.append(UPLOAD_KEY, file[0]);

  return fetch(PARSE_ENDPOINT, {
    method: 'POST',
    body: data,
  })
    .then(res => res.json());
};

export default postTextFile;

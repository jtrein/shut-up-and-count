import React, { Fragment } from 'react';
import { render } from 'react-dom';
// eslint-disable-next-line import/extensions
import 'typeface-montserrat';

import './styles/index.css';
import App from './components/App';

/* eslint-disable react/jsx-filename-extension */
const Root = () => (
  <Fragment>
    <App />
  </Fragment>
);

render(<Root />, document.getElementById('root'));

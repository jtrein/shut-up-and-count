import React from 'react';

import BigButton from './BigButton';
import FileDropzone from './FileDropzone';
import logo from './logo.svg';
import styles from './App.styles';
import commonStyles from './common.styles';

const App = () => (
  <div style={styles.wrap}>
    <header className="App-header">
      <img style={styles.logo} src={logo} className="App-logo" alt="logo" />
      <h1 style={commonStyles.hide}>Shut Up and Count</h1>
    </header>

    <FileDropzone />
    <BigButton disabled={false} onClick={() => {}} />
  </div>
);

export default App;

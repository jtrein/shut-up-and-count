import React from 'react';

import logo from './logo.svg';
import styles from './App.styles';
import commonStyles from './common.styles';
import BigButton from './BigButton';

const App = () => (
  <div style={styles.wrap}>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 style={commonStyles.hide}>Shut Up and Count</h1>
    </header>

    <BigButton disabled={false} onClick={() => {}} />
  </div>
);

export default App;

import React, { Component } from 'react';

import BigButton from './BigButton';
import FileDropzone from './FileDropzone';
import Header from './Header';
import styles from '../styles/App.styles';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isButtonActive: false,
    };
  }

  render() {
    const { isButtonActive } = this.state;

    return (
      <div style={styles.wrap}>
        <Header />

        <FileDropzone onDropAccepted={this.onDropAccepted} />

        {/* upload & parse */}
        <BigButton disabled={isButtonActive} onClick={() => {}} />

      </div>
    );
  }
}

export default App;

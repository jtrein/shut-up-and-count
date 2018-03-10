import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import { Column, Table } from 'react-virtualized';
import Snackbar from 'material-ui/Snackbar';
import 'react-virtualized/styles.css';

import { MSG_SERVER_ERR } from '../settings';
import postTextFile from '../api';
import BigButton from './BigButton';
import FileDropzone from './FileDropzone';
import Header from './Header';
import styles from '../styles/App.styles';

const rowGetter = (index, wordsList) => ({
  word: wordsList[index][0],
  occurrences: wordsList[index][1],
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      error: '',
      fileToSend: null,
      isButtonDisabled: true,
      progress: false,
    };
  }

  handleDropAccepted(file) {
    this.setState({ isButtonDisabled: false, fileToSend: file });
  }

  handleHideError() {
    this.setState({ error: '' });
  }

  handlePostFile() {
    if (!this.state.fileToSend) return;

    this.setState({ progress: true });

    postTextFile(this.state.fileToSend)
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        }

        this.setState({ data: data || {}, progress: false });
      })
      .catch((e) => {
        this.setState({ error: e.message || MSG_SERVER_ERR, progress: false });
      });
  }

  render() {
    const {
      data,
      error,
      isButtonDisabled,
      progress,
    } = this.state;
    const { eachWordCount } = data;
    const wordsList = eachWordCount ? Object.entries(eachWordCount) : [];

    return (
      <div style={styles.wrap}>
        <Header />

        <FileDropzone onDropAccepted={file => this.handleDropAccepted(file)} />

        {/* upload & parse */}
        <BigButton disabled={isButtonDisabled} onClick={() => this.handlePostFile()} />

        {/* progress */}
        { progress && !error && <Spinner name="triangle-skew-spin" color="#662e91" /> }

        {
          wordsList.length ? (
            <div style={styles.tableWrap}>
              <p style={styles.totalWordCount}>
                Total word count: <b>{data.totalWordCount}</b>
              </p>

              <Table
                width={500}
                height={500}
                headerHeight={20}
                rowHeight={30}
                rowCount={wordsList.length}
                rowGetter={({ index }) => rowGetter(index, wordsList)}
                rowStyle={styles.tableRow}
              >
                <Column
                  label="Word"
                  dataKey="word"
                  width={450}
                />
                <Column
                  width={200}
                  label="Occurrences"
                  dataKey="occurrences"
                />
              </Table>
            </div>
          ) : null
        }

        {/* server error notify */}
        <Snackbar
          autoHideDuration={3000}
          open={Boolean(this.state.error)}
          onClose={() => this.handleHideError()}
          message={this.state.error}
        />
      </div>
    );
  }
}

export default App;

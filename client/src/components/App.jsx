import React, { Component, Fragment } from 'react';
import Spinner from 'react-spinkit';
import { Column, Table } from 'react-virtualized';
import Snackbar from 'material-ui/Snackbar';
import 'react-virtualized/styles.css';

import { ERR_FILE_SIZE, ERR_FILE_TYPE, MSG_SERVER_ERR } from '../settings';
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

  getTable(ref) {
    this.table = ref;
  }

  handleDropAccepted(file) {
    this.setState({ isButtonDisabled: false, fileToSend: file });
  }

  handleDropRejected(reason) {
    const error = reason === 'size' ? ERR_FILE_SIZE : ERR_FILE_TYPE;
    this.setState({ error, data: {}, isButtonDisabled: true });
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

        this.setState({ data, progress: false });

        // scroll results into view
        this.scrollToTable();
      })
      .catch((e) => {
        this.setState({
          error: e.message || MSG_SERVER_ERR,
          isButtonDisabled: true,
          progress: false,
        });
      });
  }

  scrollToTable() {
    if (this.table) {
      const element = document.getElementById(this.table.props.id);
      if (element) element.scrollIntoView();
    }
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

        <FileDropzone
          onDropAccepted={file => this.handleDropAccepted(file)}
          onDropRejected={reason => this.handleDropRejected(reason)}
        />

        {/* upload & parse */}
        <BigButton disabled={isButtonDisabled} onClick={() => this.handlePostFile()} />

        {/* progress */}
        { progress && !error && <Spinner name="triangle-skew-spin" color="#662e91" /> }

        <div id="table" style={styles.tableWrap}>
          {
            wordsList.length ? (
              <Fragment>
                <p style={styles.totalWordCount}>
                  Total word count: <b>{data.totalWordCount}</b>
                </p>

                <Table
                  id="table"
                  ref={table => this.getTable(table)}
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
              </Fragment>
            ) : null
          }
        </div>

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

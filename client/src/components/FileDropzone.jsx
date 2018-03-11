import React, { Component } from 'react';
import { func } from 'prop-types';
import Dropzone from 'react-dropzone';

import { ALLOWED_MIME, MAX_FILE_SIZE } from '../settings';
import dropzoneStyles from '../styles/FileDropzone.styles';

const getApproxFileSize = kb => (kb < 1 ? '~1' : kb);

class FileDropzone extends Component {
  constructor() {
    super();

    this.state = {
      file: [],
      dropzoneActive: false,
    };
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true,
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false,
    });
  }

  onDrop(acceptedFile) {
    this.setState({
      file: acceptedFile,
      dropzoneActive: false,
    }, () => {
      if (acceptedFile.length) this.props.onDropAccepted(acceptedFile);
    });
  }

  onDropRejected(rejectedFile) {
    const { size, type } = rejectedFile[0];
    if (size > MAX_FILE_SIZE) {
      this.props.onDropRejected('size');
    }
    if (type !== ALLOWED_MIME) {
      this.props.onDropRejected('type');
    }
  }

  render() {
    const { file, dropzoneActive } = this.state;
    const { name, size } = file.length ? file[0] : [];

    return (
      <Dropzone
        accept={ALLOWED_MIME}
        multiple={false}
        maxSize={MAX_FILE_SIZE}
        onDrop={acceptedFile => this.onDrop(acceptedFile)}
        onDropRejected={rejectedFile => this.onDropRejected(rejectedFile)}
        onDragEnter={() => this.onDragEnter()}
        onDragLeave={() => this.onDragLeave()}
        style={dropzoneStyles.dropzone}
      >
        {/* overlay */}
        { dropzoneActive && <div style={dropzoneStyles.overlay}>Go ahead, drop it!</div> }

        {/* file info */}
        {file.length ?
          (
            <p style={dropzoneStyles.textHighlight}>
              {name} &ndash; {getApproxFileSize(Math.floor(size / 1024))}kb
            </p>
          ) : null
        }

        <p>Click or drop .txt files.</p>
        <small>(max size is 10MB)</small>
      </Dropzone>
    );
  }
}

FileDropzone.propTypes = {
  onDropAccepted: func.isRequired,
  onDropRejected: func.isRequired,
};

export default FileDropzone;

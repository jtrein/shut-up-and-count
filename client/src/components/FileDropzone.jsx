import React, { Component } from 'react';
import { func } from 'prop-types';
import Dropzone from 'react-dropzone';

import { ALLOWED_MIME, MAX_FILE_SIZE } from '../settings';
import dropzoneStyles from '../styles/FileDropzone.styles';

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
    }, this.props.onDropAccepted(acceptedFile));
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
              {name} &ndash; {Math.floor(size / 1024)}kb
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
};

export default FileDropzone;
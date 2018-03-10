import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { ALLOWED_MIME, MAX_FILE_SIZE } from './settings';
import dropzoneStyles from './FileDropzone.styles';

class FileDropzone extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
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

  onDrop(acceptedFiles) {
    this.setState({
      files: acceptedFiles,
      dropzoneActive: false,
    });
  }

  render() {
    const { files, dropzoneActive } = this.state;

    return (
      <Dropzone
        accept={ALLOWED_MIME}
        multiple={false}
        maxSize={MAX_FILE_SIZE}
        onDrop={(acceptedFiles, rejectedFiles) => {
          this.onDrop(acceptedFiles, rejectedFiles);
        }}
        onDragEnter={() => this.onDragEnter()}
        onDragLeave={() => this.onDragLeave()}
        style={dropzoneStyles.dropzone}
      >
        {/* overlay */}
        { dropzoneActive && <div style={dropzoneStyles.overlay}>Go ahead, drop it!</div> }

        {/* list files */}
        {
          files.map(({ name, size }) => (
            <p key={`${name}-${size}`} style={dropzoneStyles.textHighlight}>
              {name}
            </p>
          ))
        }

        <p>Click or drop .txt files.</p>
        <small>(max size is 10MB)</small>
      </Dropzone>
    );
  }
}

export default FileDropzone;

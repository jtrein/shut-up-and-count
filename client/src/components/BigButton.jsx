import React from 'react';
import { bool, func } from 'prop-types';

import '../styles/button.css';
import styles from '../styles/BigButton.styles';

const BigButton = ({ disabled = false, onClick }) => (
  <div style={styles.wrap}>
    <button disabled={disabled} onClick={onClick}>Count the words.</button>
  </div>
);

BigButton.defaultProps = {
  disabled: false,
};

BigButton.propTypes = {
  disabled: bool,
  onClick: func.isRequired,
};

export default BigButton;

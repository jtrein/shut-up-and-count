import React from 'react';
import { bool, func, string } from 'prop-types';

import '../styles/button.css';
import styles from '../styles/BigButton.styles';

const BigButton = ({ disabled = false, onClick, text }) => (
  <div style={styles.wrap}>
    <button disabled={disabled} onClick={onClick}>{text}</button>
  </div>
);

BigButton.defaultProps = {
  disabled: false,
  text: 'Button',
};

BigButton.propTypes = {
  disabled: bool,
  onClick: func.isRequired,
  text: string,
};

export default BigButton;

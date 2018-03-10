import React from 'react';

import styles from '../styles/Header.styles';
import logo from '../img/logo.svg';

const Header = () => (
  <header>
    <img style={styles.logo} src={logo} alt="logo" />
    <h1 style={styles.hide}>Shut Up and Count</h1>
  </header>
);

export default Header;

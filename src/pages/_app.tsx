import React from 'react';
import type { AppProps } from 'next/app';

import Header from '../components/Header';
import Player from '../components/Player';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  );
};

export default MyApp;

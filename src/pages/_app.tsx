import React, { useCallback, useState } from 'react';
import type { AppProps } from 'next/app';

import Header from '../components/Header';
import Player from '../components/Player';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import PlayerContext from '../contexts/PlayerContext';

interface Episode {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  // description: string;
  durationAsString: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback((episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((old) => !old);
  }, []);

  const setPlayingState = useCallback((state: boolean) => {
    setIsPlaying(state);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState,
      }}
    >
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
};

export default MyApp;

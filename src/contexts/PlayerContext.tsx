import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

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

interface PlayerContextData {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayerState: () => void;
}

const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const play = useCallback((episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }, []);

  const playList = useCallback((list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((old) => !old);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffling((old) => !old);
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping((old) => !old);
  }, []);

  const setPlayingState = useCallback((state: boolean) => {
    setIsPlaying(state);
  }, []);

  const hasPrevious = useMemo(() => currentEpisodeIndex > 0, [
    currentEpisodeIndex,
  ]);

  const hasNext = useMemo(
    () => isShuffling || currentEpisodeIndex + 1 < episodeList.length,
    [currentEpisodeIndex, episodeList, isShuffling]
  );

  const playNext = useCallback(() => {
    const nextEpisodeIndex = currentEpisodeIndex + 1;

    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(nextEpisodeIndex);
    }
  }, [hasNext, currentEpisodeIndex, episodeList]);

  const playPrevious = useCallback(() => {
    const previousEpisodeIndex = currentEpisodeIndex - 1;

    if (hasPrevious) {
      setCurrentEpisodeIndex(previousEpisodeIndex);
    }
  }, [hasPrevious, currentEpisodeIndex, episodeList]);

  const clearPlayerState = useCallback(() => {
    setEpisodeList([]);
    setCurrentEpisodeIndex(-1);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        clearPlayerState,
        play,
        playList,
        isPlaying,
        isLooping,
        isShuffling,
        hasNext,
        hasPrevious,
        playNext,
        playPrevious,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer(): PlayerContextData {
  return useContext(PlayerContext);
}

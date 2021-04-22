import { createContext } from 'react';

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
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}

const PlayerContext = createContext({} as PlayerContextData);

export default PlayerContext;

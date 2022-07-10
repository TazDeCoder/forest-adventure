import { createContext } from 'react';

type Context = {
  isNight: boolean;
  isPaused: boolean;
  toggleIsNight: () => void;
  toggleIsPaused: () => void;
};

const GameContext = createContext<Context | null>(null);

export default GameContext;

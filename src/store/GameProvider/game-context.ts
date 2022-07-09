import { createContext } from 'react';

import { Feedback, PathNode } from '../../interfaces/index';

type Context = {
  isNight: boolean;
  isPaused: boolean;
  path: PathNode[];
  feedback: Feedback | null;
  toggleIsNight: () => void;
  toggleIsPaused: () => void;
  updatePath: (node: PathNode) => void;
  setFeedback: (feedback: Feedback) => void;
};

const GameContext = createContext<Context | null>(null);

export default GameContext;

import React, { useState, useMemo } from 'react';

import { Feedback, PathNode } from '../../interfaces';

import GameContext from './game-context';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function GameProvider({ children }: Props) {
  const [isNight, setIsNight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [path, setPath] = useState<PathNode[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const toggleIsNight = () => {
    setIsNight((prevState) => !prevState);
  };

  const toggleIsPaused = () => {
    setIsPaused((prevState) => !prevState);
  };

  const updatePath = (node: PathNode) => {
    setPath((prevPath) => [...prevPath, node]);
  };

  const gameContext = useMemo(
    () => ({
      isNight,
      isPaused,
      path,
      feedback,
      toggleIsNight,
      toggleIsPaused,
      updatePath,
      setFeedback,
    }),
    [isNight, isPaused, feedback, path]
  );

  return (
    <GameContext.Provider value={gameContext}>{children}</GameContext.Provider>
  );
}

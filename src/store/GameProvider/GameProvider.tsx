import React, { useState, useMemo } from 'react';

import GameContext from './game-context';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function GameProvider({ children }: Props) {
  const [isNight, setIsNight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const toggleIsNight = () => {
    setIsNight((prevState) => !prevState);
  };

  const toggleIsPaused = () => {
    setIsPaused((prevState) => !prevState);
  };

  const gameContext = useMemo(
    () => ({
      isNight,
      isPaused,
      toggleIsNight,
      toggleIsPaused,
    }),
    [isNight, isPaused]
  );

  return (
    <GameContext.Provider value={gameContext}>{children}</GameContext.Provider>
  );
}

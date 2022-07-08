import { useState, useEffect } from 'react';

type Options = {
  startAt?: number;
  immediateStart?: boolean;
};

export default function useTimer({
  startAt = 0,
  immediateStart = false,
}: Options) {
  const [timer, setTimer] = useState(startAt + 1);
  const [isActive, setIsActive] = useState(immediateStart);
  const [isPaused, setIsPaused] = useState(false);

  const isActiveHandler = () => {
    setIsActive(true);
  };

  const toggleIsPausedHandler = () => {
    setIsPaused((prevState) => !prevState);
  };

  const stopHandler = () => {
    setTimer(startAt);
    setIsActive(false);
    setIsPaused(false);
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  return {
    timer,
    isActive,
    isPaused,
    startTimer: isActiveHandler,
    pauseTimer: toggleIsPausedHandler,
    stopTimer: stopHandler,
  };
}

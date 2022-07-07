import { useMemo, useState, useEffect } from 'react';
import { Timer } from 'timer-node';

type Options = {
  format?: 'mm:ss';
};

export default function useTimer({ format }: Options) {
  const timer = useMemo(() => {
    const newTimer = new Timer();
    newTimer.start();
    return newTimer;
  }, []);

  const [time, setTime] = useState('');

  useEffect(() => {
    let interval: any = null;

    if (timer.isRunning()) {
      let formatedTime = String(timer.ms());

      if (format === 'mm:ss') {
        formatedTime = `${timer.format('%m').padStart(2, '0')} : ${timer
          .format('%s')
          .padStart(2, '0')}`;
      }

      interval = setInterval(() => {
        setTime(formatedTime);
      });
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, format]);

  return [time];
}

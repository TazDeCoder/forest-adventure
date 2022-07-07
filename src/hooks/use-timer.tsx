import { useMemo, useState, useEffect } from 'react';
import { Timer } from 'timer-node';

type Props = {
  options: {
    format?: 'mm:ss';
  };
};

export default function useTimer({ options }: Props) {
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

      if (options.format === 'mm:ss') {
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
  }, [timer, options.format]);

  return [time];
}

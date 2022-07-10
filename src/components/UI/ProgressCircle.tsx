import React, { useEffect } from 'react';
import { Typography, useTheme } from '@mui/material';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

type Props = {
  timer: number;
  duration: number;
};

export default function Circle({ timer, duration }: Props) {
  const theme = useTheme();
  const time = useMotionValue(0);
  const timeRange = useTransform(time, [0, duration], [0, 1]);
  const pathLength = useSpring(timeRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    time.set(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="108"
        height="108"
        fill="#000000"
        viewBox="0 0 60 60"
      >
        <motion.path
          fill="none"
          strokeWidth="2"
          stroke={
            theme.palette.mode === 'dark'
              ? theme.palette.primary.main
              : theme.palette.secondary.main
          }
          strokeDasharray="0 1"
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{
            pathLength,
            rotate: 90,
            translateX: 5,
            translateY: 5,
            scaleX: -1,
          }}
        />
      </svg>
      <Typography
        sx={{
          position: 'absolute',
          top: 35,
          left: 40,
        }}
      >
        {duration - timer}
      </Typography>
    </motion.div>
  );
}

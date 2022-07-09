import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { Pause as PauseIcon } from '@mui/icons-material';
import { FiMoon, FiSun } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { useTimer } from '../../hooks/index';
import { formatTime } from '../../lib/index';

type Props = {
  isNight?: boolean;
  isPause?: boolean;
};

export default function Header({ isNight, isPause }: Props) {
  const { timer, pauseTimer } = useTimer({ immediateStart: true });

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Box component="header">
      <AppBar
        component={motion.div}
        sx={{ cursor: 'pointer' }}
        position="fixed"
        animate={{ opacity: !isPause && trigger ? 0.2 : 1 }}
        whileHover={{ opacity: 1 }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            {formatTime(timer, 'mm:ss')}
          </Typography>
          <IconButton
            sx={{ mr: 2 }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="pause"
            onClick={pauseTimer}
          >
            <PauseIcon />
          </IconButton>
          {isNight ? <FiMoon /> : <FiSun />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Header.defaultProps = {
  isNight: false,
  isPause: false,
};

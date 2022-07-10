import React, { useContext, useEffect } from 'react';
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

import GameContext from '../../store/GameProvider/game-context';
import Modal from '../UI/Modal';

export default function Header() {
  const gameContext = useContext(GameContext);
  const { timer, pauseTimer: togglePauseTimer } = useTimer({
    immediateStart: true,
  });

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const closeModalHandler = () => {
    gameContext?.toggleIsPaused();
  };

  useEffect(() => {
    togglePauseTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameContext?.isPaused]);

  return (
    <Box component="header">
      <AppBar
        component={motion.div}
        sx={{ cursor: 'pointer' }}
        position="fixed"
        animate={{ opacity: !gameContext?.isPaused && trigger ? 0.2 : 1 }}
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
            onClick={gameContext?.toggleIsPaused}
          >
            <PauseIcon />
          </IconButton>
          {gameContext?.isNight ? <FiMoon /> : <FiSun />}
        </Toolbar>
      </AppBar>
      <Modal
        open={gameContext?.isPaused ?? false}
        title="Paused..."
        description="Don't worry no need to rush - I'll be here when your ready to go again :¬)"
        confirmText="Resume"
        onClose={closeModalHandler}
      />
    </Box>
  );
}

Header.defaultProps = {
  isNight: false,
  isPause: false,
};

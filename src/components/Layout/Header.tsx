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

type Props = {
  isNight?: boolean;
  isPause?: boolean;
  onPause?: () => void;
};

export default function Header({ isNight, isPause, onPause }: Props) {
  const [time] = useTimer({ format: 'mm:ss' });

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
            {time}
          </Typography>
          <IconButton
            sx={{ mr: 2 }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="pause"
          >
            <PauseIcon onClick={onPause} />
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
  onPause: () => {},
};

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { AnimatePresence, useAnimation } from 'framer-motion';

import { useTimer } from '../../hooks/index';
import { TextReveal, ProgressCircle } from '../UI/index';
import { Choice } from '../../interfaces';
import { ANSWER_RESPONSE_MS } from '../../constants';

import GameContext from '../../store/GameProvider/game-context';
import ButtonChoices from './ButtonChoices';

type Props = {
  text: string;
  prompt: string;
  choices: Choice[];
  inventory: string[];
  onChoice: (choiceId: number) => void;
};

export default function PromptBlock({
  text,
  prompt,
  choices,
  inventory,
  onChoice,
}: Props) {
  const theme = useTheme();
  const gameContext = useContext(GameContext);
  const [disabled, setDisabled] = useState(false);
  const {
    timer,
    isActive,
    startTimer,
    pauseTimer: togglePauseTimer,
    stopTimer,
  } = useTimer({});
  const sentenceControls = useAnimation();
  const promptControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await sentenceControls.start('visible');
      await promptControls.start('visible');
      buttonControls.start({ opacity: 1 });
      startTimer();
    };
    sequence();
  }, []);

  useEffect(() => {
    togglePauseTimer();
  }, [gameContext?.isPaused]);

  useEffect(() => {
    if (timer === ANSWER_RESPONSE_MS / 1000) {
      stopTimer();
      setDisabled(true);
    }
  }, [timer]);

  const blockStyles = {
    width: 'min(95%, 40rem)',
    p: 4,
    margin: '1rem auto',
    bgcolor: theme.palette.mode === 'dark' ? '#5c5d5d' : '#f7f7f7',
    borderRadius: 5,
  };

  return (
    <Box sx={blockStyles}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextReveal
          sx={{ mt: 1 }}
          variant="body1"
          text={text}
          controls={sentenceControls}
        />
        <TextReveal
          sx={{ my: 2 }}
          variant="h6"
          text={prompt}
          controls={promptControls}
        />
        <Box
          sx={{
            position: 'relative',
            height: '5rem',
            mt: 4,
            mb: 6,
            ml: 2,
          }}
        >
          <AnimatePresence>
            {isActive && (
              <ProgressCircle
                timer={timer}
                duration={ANSWER_RESPONSE_MS / 1000}
              />
            )}
          </AnimatePresence>
        </Box>
        <ButtonChoices
          inventory={inventory}
          choices={choices}
          controls={buttonControls}
          disabled={disabled}
          onChoice={onChoice}
        />
      </Box>
    </Box>
  );
}

import React, { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, useAnimation } from 'framer-motion';

import { useTimer } from '../../hooks/index';
import { TextReveal, ProgressCircle } from '../../animations/index';
import { Prompt } from '../../interfaces';

import ButtonChoices from './ButtonChoices';

type Props = {
  text: string;
  prompts: Prompt[];
};

const boxStyles = {
  width: 'min(95%, 40rem)',
  p: 4,
  margin: '0 auto',
  backgroundColor: '#f7f7f7',
  borderRadius: 5,
};

export default function TextBlock({ text, prompts }: Props) {
  const { timer, isActive, startTimer, stopTimer } = useTimer({});
  const sentenceControls = useAnimation();
  const buttonControls = useAnimation();

  const sequence = useCallback(async () => {
    await sentenceControls.start('visible');
    buttonControls.start({ opacity: 1 });
    startTimer();
    setTimeout(() => stopTimer(), 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sequence();
  }, [sequence]);

  return (
    <Box sx={boxStyles}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextReveal text={text} controls={sentenceControls} />
        <Box
          sx={{
            position: 'relative',
            height: '5rem',
            mt: 4,
            mb: 2,
            ml: 1,
            stroke: '#0000',
          }}
        >
          <AnimatePresence>
            {isActive && <ProgressCircle timer={timer} duration={3000} />}
          </AnimatePresence>
        </Box>
        <ButtonChoices
          choices={prompts}
          controls={buttonControls}
          disabled={!isActive}
        />
      </Box>
    </Box>
  );
}

import React, { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { motion, AnimationControls } from 'framer-motion';

import { Prompt } from '../../interfaces/index';

type Props = {
  choices: Prompt[];
  controls: AnimationControls;
  disabled: boolean;
};

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  mt: '2em',
};

export default function ButtonChoices({ choices, controls, disabled }: Props) {
  const [choice, setChoice] = useState('play');

  const choicesHandler = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: string
  ) => {
    setChoice(newChoice);
  };

  return (
    <Box
      component={motion.div}
      sx={buttonContainerStyles}
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ delay: 1.5 }}
    >
      <ToggleButtonGroup
        value={choice}
        aria-label="choice"
        exclusive
        onChange={choicesHandler}
      >
        {choices.map(({ id, value, title }, idx) => (
          <ToggleButton
            // eslint-disable-next-line react/no-array-index-key
            key={id}
            sx={{ mx: 2 }}
            value={value}
            aria-label={`choice ${idx + 1}`}
            disabled={disabled}
          >
            {title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

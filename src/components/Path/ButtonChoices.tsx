import React, { useState, useEffect } from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { motion, AnimationControls } from 'framer-motion';

import { Choice } from '../../interfaces/index';

type Props = {
  inventory: string[];
  choices: Choice[];
  controls: AnimationControls;
  disabled: boolean;
  onChoice: (choiceId: number) => void;
};

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  mt: '2em',
};

export default function ButtonChoices({
  inventory,
  choices,
  controls,
  disabled,
  onChoice,
}: Props) {
  const [choice, setChoice] = useState(0);

  const changeChoicesHandler = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: number
  ) => {
    setChoice(newChoice);
  };

  useEffect(() => {
    if (disabled) {
      onChoice(Number(choice));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

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
        disabled={disabled}
        onChange={changeChoicesHandler}
      >
        {choices.map(({ id, require, text }) => {
          const isAvalaible = require.every(
            (item) => inventory.indexOf(item) !== -1
          );
          return (
            <ToggleButton
              key={id}
              value={id}
              aria-label={`choice ${id}`}
              disabled={!isAvalaible}
            >
              {text}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
}

import React, { useState, useEffect } from 'react';
import { useTheme, Grid, Button } from '@mui/material';
import { motion, AnimationControls } from 'framer-motion';

import { Choice } from '../../interfaces/index';

type Props = {
  inventory: string[];
  choices: Choice[];
  controls: AnimationControls;
  disabled: boolean;
  onChoice: (choiceId: number) => void;
};

export default function ButtonChoices({
  inventory,
  choices,
  controls,
  disabled,
  onChoice,
}: Props) {
  const theme = useTheme();
  const [choice, setChoice] = useState(0);

  useEffect(() => {
    if (disabled) {
      onChoice(choice);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  return (
    <Grid
      container
      component={motion.div}
      rowSpacing={2}
      columnSpacing={2}
      alignItems="center"
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ delay: 1.5 }}
    >
      {choices.map(({ id, require, text }, idx) => {
        const isAvalaible = require.every(
          (item) => inventory.indexOf(item) !== -1
        );
        const isActive =
          choice === idx
            ? {
                boxShadow: 'none',
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'secondary.dark'
                    : 'primary.dark',
                border: '2px solid',
                borderColor:
                  theme.palette.mode === 'dark'
                    ? 'primary.light'
                    : 'secondary.light',
              }
            : {};

        return (
          <Grid key={id} item sx={{ textAlign: 'center' }} xs={6}>
            <Button
              sx={{ color: '#fff', ...isActive }}
              variant="contained"
              color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
              value={id}
              aria-label={`choice ${id}`}
              onClick={() => setChoice(idx)}
              disabled={disabled || !isAvalaible}
            >
              {text}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}

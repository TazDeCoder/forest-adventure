import React from 'react';
import { Typography } from '@mui/material';
import { motion, AnimationControls } from 'framer-motion';

import { TEXT_SPEED } from '../../constants';

type Props = {
  sx: any;
  variant: any;
  text: string;
  controls: AnimationControls;
};

const sentenceVariants = {
  hidden: {
    opacity: 0.8,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TEXT_SPEED,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function TextReveal({ sx, variant, text, controls }: Props) {
  return (
    <Typography
      component={motion.p}
      sx={{ ...sx }}
      variant={variant}
      variants={sentenceVariants}
      initial="hidden"
      animate={controls}
    >
      {text.split('').map((char, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <motion.span key={idx} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </Typography>
  );
}

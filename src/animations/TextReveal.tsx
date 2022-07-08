import React from 'react';
import { Typography } from '@mui/material';
import { motion, AnimationControls } from 'framer-motion';

type Props = {
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
      staggerChildren: 0,
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

export default function TextReveal({ text, controls }: Props) {
  return (
    <Typography
      component={motion.p}
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

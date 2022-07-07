import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

type Prompt = {
  title: string;
  callback: () => any;
};

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

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  mt: '2em',
};

const sentenceVariants = {
  hidden: {
    opacity: 0.8,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
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

export default function TextBlock({ text, prompts }: Props) {
  const sentenceControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await sentenceControls.start('visible');
      buttonControls.start({ opacity: 1 });
    };

    sequence();
  }, [sentenceControls, buttonControls]);

  return (
    <Box sx={boxStyles}>
      <Typography
        component={motion.p}
        variants={sentenceVariants}
        initial="hidden"
        animate={sentenceControls}
      >
        {text.split('').map((char, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <motion.span key={idx} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </Typography>
      <Box
        component={motion.div}
        sx={buttonContainerStyles}
        initial={{ opacity: 0 }}
        animate={buttonControls}
        transition={{ delay: 1.5 }}
      >
        {prompts.map((prompt, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Button key={idx} sx={{ mx: 2 }} onClick={prompt.callback}>
            {prompt.title}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

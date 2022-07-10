import React from 'react';
import { Container } from '@mui/material';

import { PathNode } from '../../interfaces/index';

import PromptBlock from './PromptBlock';

type Props = {
  path: PathNode[];
  inventory: string[];
  onUpdatePath: (choiceId: number) => void;
};

export default function Path({ path, inventory, onUpdatePath }: Props) {
  const selectedChoiceHandler = (choiceId: number) => {
    onUpdatePath(choiceId);
  };

  return (
    <Container sx={{ mt: 10 }}>
      {path.map(({ id, text, prompt, choices }) => (
        <PromptBlock
          key={id}
          text={text}
          prompt={prompt}
          choices={choices}
          inventory={inventory}
          onChoice={selectedChoiceHandler}
        />
      ))}
    </Container>
  );
}

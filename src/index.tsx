import React from 'react';
import ReactDOM from 'react-dom/client';

import GameProvider from './store/GameProvider/GameProvider';
import Game from './Game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GameProvider>
      <Game />
    </GameProvider>
  </React.StrictMode>
);

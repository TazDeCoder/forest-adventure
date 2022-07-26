import React, { useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { PathNode } from './interfaces';
import { generateData } from './lib/index';

import GameContext from './store/GameProvider/game-context';
import Modal from './components/UI/Modal';
import Layout from './components/Layout/Layout';
import Path from './components/Path/Path';

const pathNodes = generateData();

function Game() {
  const gameContext = useContext(GameContext);
  const [path, setPath] = useState<PathNode[]>([pathNodes[0]]);
  const [currNode, setCurrNode] = useState<PathNode>(pathNodes[0]);
  const [inventory, setInventory] = useState<string[]>([]);
  const [isDead, setIsDead] = useState(false);
  const [pathConfig, setPathConfig] = useState({ key: Math.random() });

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: gameContext?.isNight ? 'dark' : 'light',
        },
      }),
    [gameContext?.isNight]
  );

  const updatePathHandler = (choiceId: number) => {
    const choice = currNode.choices.find((el) => el.id === choiceId);
    if (!choice) return;
    const nextNode = pathNodes.find((node) => node.id === choice.next);
    if (!nextNode) return;
    // Logic for handling in-game day/night cycle
    if (nextNode.isNight && !gameContext?.isNight) {
      gameContext?.toggleIsNight();
    }
    if (!nextNode.isNight && gameContext?.isNight) {
      gameContext?.toggleIsNight();
    }
    // Update necessary states relation to nextNode
    setPath((prevPath) => [...prevPath, nextNode]);
    setCurrNode(nextNode);
    setInventory((prevInventory) => [...prevInventory, ...choice.items]);
  };

  const closeModalHandler = () => {
    setIsDead(false);
    setTimeout(() => {
      if (gameContext?.isNight) {
        gameContext?.toggleIsNight();
      }
      // Reset in-game states
      setPath([pathNodes[0]]);
      setCurrNode(pathNodes[0]);
      setInventory([]);
      setPathConfig({ key: Math.random() });
    }, 400);
  };

  useEffect(() => {
    if (!currNode.prompt && currNode.choices.length === 0) {
      setIsDead(true);
    }
  }, [currNode]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {React.cloneElement(
          <Path
            path={path}
            inventory={inventory}
            onUpdatePath={updatePathHandler}
          />,
          pathConfig
        )}
        <Modal
          open={isDead}
          title={currNode.text.split('.')[0]}
          description={currNode.text.split('.')[1]}
          confirmText="Restart"
          onClose={closeModalHandler}
        />
      </Layout>
    </ThemeProvider>
  );
}

export default Game;

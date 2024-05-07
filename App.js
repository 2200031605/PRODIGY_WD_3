import React, { useState } from 'react';
import './App.css';
import './style.css';

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [gameActive, setGameActive] = useState(true);
  const [message, setMessage] = useState('');

  const handleClick = (index) => {
    if (!gameActive || gameState[index] !== '') return;

    const updatedGameState = [...gameState];
    updatedGameState[index] = currentPlayer;
    setGameState(updatedGameState);

    if (checkWinner(updatedGameState)) {
      setGameActive(false);
      setMessage(`Player ${currentPlayer} wins!`);
      return;
    }

    if (!updatedGameState.includes('')) {
      setGameActive(false);
      setMessage("It's a draw!");
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (currentGameState) => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (currentGameState[a] && currentGameState[a] === currentGameState[b] && currentGameState[a] === currentGameState[c]) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setCurrentPlayer('X');
    setGameState(Array(9).fill(''));
    setGameActive(true);
    setMessage('');
  };

  return (
    <div className='container'>
      <div className='tic tac toe'></div>
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {gameState.map((value, index) => (
          <div className="cell" key={index} onClick={() => handleClick(index)}>
            {value}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset</button>
      <div className="message">{message}</div>
    </div>
  );
};

export default App;

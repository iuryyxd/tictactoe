import { useEffect, useState } from "react";
import styles from "./App.module.scss";

function App() {
  const [board, setBoard] = useState(Array(9).fill(0));
  const [gameOver, setGameOver] = useState(false);
  const [player, setPlayer] = useState<number | null>(1);
  const [winner, setWinner] = useState<number | null>(null);

  const winsPossibilities = [
    [board[0], board[1], board[2]],
    [board[3], board[4], board[5]],
    [board[6], board[7], board[8]],

    [board[0], board[3], board[6]],
    [board[1], board[4], board[7]],
    [board[2], board[5], board[8]],

    [board[0], board[4], board[8]],
    [board[6], board[4], board[2]],
  ];

  const handleBoardClick = (i: number) => {
    if (board[i] !== 0 || gameOver) return;

    const newBoard = [...board];
    newBoard[i] = player;

    setBoard(newBoard);
    setPlayer(player === 1 ? 2 : 1);
  };

  useEffect(() => {
    checkWinner();
    // checkDraw();
  }, board);

  const checkWinner = () => {
    winsPossibilities.forEach((cells) => {
      if (cells.every((cell) => cell === 1)) {
        setGameOver(true);
        setWinner(1);
      }

      if (cells.every((cell) => cell === 2)) {
        setGameOver(true);
        setWinner(2);
      }
    });

    if (board.every((item) => item !== 0)) {
      console.log("funfa ae");
    }
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(0));
    setGameOver(false);
    setPlayer(winner);
    setWinner(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Jogo da velha</h1>
      <p className={styles.container__turn}>
        {winner ? (
          <>
            {winner === 1 && "Jogador O venceu"}
            {winner === 2 && "Jogador X venceu"}
            {winner === 3 && "Deu velha!"}
          </>
        ) : (
          <>Vez do jogador: {player === 1 ? "O" : "X"}</>
        )}
      </p>
      <div className={styles.container__grid}>
        {board.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className={`${styles.grid__item} ${item === 1 && styles.o} ${
              item === 2 && styles.x
            }`}
            onClick={() => handleBoardClick(itemIndex)}
          >
            {item === 0 && ""}
            {item === 1 && "O"}
            {item === 2 && "X"}
          </div>
        ))}
      </div>
      {gameOver && (
        <button className={styles.container__button} onClick={handlePlayAgain}>
          Jogar novamente
        </button>
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

import { BoardType } from "../../../types/board.type";

import BoardSlot from "../../components/slots/BoardSlot";

export function GamePage(): JSX.Element {
  const [board, setBoard] = useState<BoardType[][]>([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length + 1; j++) {
        try {
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i][j + 1] &&
            board[i][j] === board[i][j + 2] &&
            board[i][j] === board[i][j + 3]
          ) {
            setGameOver(true);
          }
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i + 1][j] &&
            board[i][j] === board[i + 2][j] &&
            board[i][j] === board[i + 3][j]
          ) {
            setGameOver(true);
          }
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i + 1][j + 1] &&
            board[i][j] === board[i + 2][j + 2] &&
            board[i][j] === board[i + 3][j + 3]
          ) {
            setGameOver(true);
          }
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i + 1][j - 1] &&
            board[i][j] === board[i + 2][j - 2] &&
            board[i][j] === board[i + 3][j - 3]
          ) {
            setGameOver(true);
          }
        } catch (e: any) {
          // Silent skip
        }
      }
    }
  }, [board]);

  const updateBoard = (x: number, y: number, ch: "X" | "O") => {
    setBoard((prev) => {
      const boardCopy = [...prev];
      boardCopy[y][x] = ch;
      return boardCopy;
    });
    setCurrentPlayer(ch === "X" ? "O" : "X");
    return;
  };

  const handleOnClick = (x: number) => {
    let y = board.findIndex((rowArr, index) => {
      return rowArr[x] !== "" || index === board.length - 1;
    });
    if (y !== board.length - 1) y -= 1;
    if (board[y][x] !== "") y -= 1;
    if (!gameOver) updateBoard(x, y, currentPlayer);
  };

  return (
    <div className="flex flex-col gap-6 text-center ">
      <div className="grid grid-cols-7 gap-4 bg-white p-6 rounded-lg shadow-xl">
        {board.map((row, i) =>
          row.map((ch, j) => {
            return (
              <div key={i + "-" + j}>
                <BoardSlot
                  x={j}
                  y={i}
                  ch={ch}
                  onClickCallback={handleOnClick}
                />
              </div>
            );
          })
        )}
      </div>
      {gameOver ? (
        <h1 className="text-yellow text-4xl pt-4">{`Player ${
          currentPlayer === "X" ? "1" : "2"
        } win the game`}</h1>
      ) : (
        <h1 className="text-yellow text-4xl pt-4">{`Player ${
          currentPlayer === "X" ? "1" : "2"
        } is moving`}</h1>
      )}
    </div>
  );
}

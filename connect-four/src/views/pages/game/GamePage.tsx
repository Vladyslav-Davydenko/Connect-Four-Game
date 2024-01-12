import { useState } from "react";

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

    updateBoard(x, y, currentPlayer);
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
      <h1 className="text-yellow text-4xl pt-4">{`Player ${
        currentPlayer === "X" ? "1" : "2"
      } is moving`}</h1>
    </div>
  );
}

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

  const handleOnClick = (x: number, y: number) => {
    console.log("Received x:", x);
    console.log("Received y:", y);
  };

  return (
    <div className="grid grid-cols-7 gap-4 bg-white p-6 rounded-lg shadow-xl">
      {board.map((row, i) =>
        row.map((ch, j) => {
          return (
            <div key={i + "-" + j}>
              <BoardSlot x={j} y={i} ch={ch} onClickCallback={handleOnClick} />
            </div>
          );
        })
      )}
    </div>
  );
}

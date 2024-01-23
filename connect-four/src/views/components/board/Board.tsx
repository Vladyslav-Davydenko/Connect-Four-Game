import { BoardType } from "@/types/board/board.type";
import { BoardSlot } from "../slots/BoardSlot";

interface Props {
  board: BoardType[][];
  handleOnClick: (x: number, y: number) => void;
}

export function Board({ board, handleOnClick }: Props): JSX.Element {
  return (
    <div className="grid grid-cols-7 gap-4 bg-white p-6 rounded-3xl shadow-xl  animate-bg_fade_in border-black border-2">
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

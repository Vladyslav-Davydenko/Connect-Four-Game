import { useAppSelector } from "../../../redux/hooks";

import { selectBoardByID } from "../../../redux/board/BoardSlice";
import { RootState } from "../../../redux/store";

import SingleSlot from "./SingleSlot";

interface Props {
  id: string;
  index: number;
}

export default function SingleUnit({ id, index }: Props): JSX.Element {
  const game = useAppSelector((rootState: RootState) =>
    selectBoardByID(rootState, id)
  );

  return (
    <div className="flex justify-center items-center gap-6">
      <p className="text-4xl">{`${index}.`}</p>
      <div>
        <div className="grid grid-cols-7 gap-4 bg-white p-6 rounded-3xl shadow-xl  animate-bg_fade_in border-black border-2">
          {game.board.map((row, i) =>
            row.map((ch, j) => {
              return (
                <div key={`${game.id}-${i}-${j}`}>
                  <SingleSlot ch={ch} />
                </div>
              );
            })
          )}
        </div>
      </div>
      <p>{game.winner}</p>
    </div>
  );
}

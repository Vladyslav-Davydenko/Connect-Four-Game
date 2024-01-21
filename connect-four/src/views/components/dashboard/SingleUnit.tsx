import { useAppSelector, useAppDispatch } from "../../../redux/hooks";

import { refreshStatus } from "../../../redux/board/BoardSlice";

import { selectBoardByID } from "../../../redux/board/BoardSlice";
import { RootState } from "../../../redux/store";

import DeletePopUp from "../pop-up-windows/Delete";
import SingleSlot from "./SingleSlot";
import { useState } from "react";

interface Props {
  id: string;
  index: number;
}

export default function SingleUnit({ id, index }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const game = useAppSelector((rootState: RootState) =>
    selectBoardByID(rootState, id)
  );

  const handleDeleteButtonClicked = () => {
    dispatch(refreshStatus());
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && <DeletePopUp id={game.id} setIsOpen={setIsOpen} />}
      <div className="flex justify-center items-center gap-12 py-8 px-16 shadow-lg rounded-lg relative">
        <button
          className="p-3 rounded-full absolute top-2 right-2 cursor-pointer opacity-80 hover:opacity-100 hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md"
          onClick={handleDeleteButtonClicked}
        >
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Menu / Close_MD">
              <path
                id="Vector"
                d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                stroke="#B80000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
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
        <div className=" h-48 w-48 bg-white rounded-lg border-black border-2 shadow-xl relative flex justify-center items-center">
          <div className=" absolute -top-7 ">
            <div
              className={`size-16 rounded-full relative animate-drop_down ${
                game.winner === "X" ? "bg-red" : "bg-yellow"
              } flex items-center justify-center shadow-lg`}
            >
              <div
                className={`size-12 rounded-full absolute shadow-inner ${
                  game.winner === "X" ? "bg-red" : "bg-yellow"
                }`}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-dark-blue text-xl mt-2">{`Player ${
              game.winner === "X" ? "1" : "2"
            }`}</h1>
            <p className="text-dark-blue text-4xl mt-4">Win</p>
          </div>
        </div>
      </div>
    </>
  );
}

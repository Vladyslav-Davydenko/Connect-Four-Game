import { memo } from "react";

interface Props {
  playersCont: number;
  player: "X" | "O";
}

export const PlayerScoreMobile = memo(
  ({ playersCont, player }: Props): JSX.Element => {
    return (
      <div className=" h-24 w-24 bg-white rounded-lg border-black border-2 shadow-xl relative flex justify-center items-center">
        <div className=" absolute -top-4">
          <div
            className={`size-8 rounded-full relative animate-drop_down ${
              player === "X" ? "bg-red" : "bg-yellow"
            } flex items-center justify-center shadow-lg`}
          >
            <div
              className={`size-6 rounded-full absolute shadow-inner ${
                player === "X" ? "bg-red" : "bg-yellow"
              }`}
            ></div>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-dark-primary text-md mt-2">
            {player === "X" ? "Player 1" : "Player 2"}
          </h1>
          <p className="text-dark-primary text-xl">{playersCont}</p>
        </div>
      </div>
    );
  }
);

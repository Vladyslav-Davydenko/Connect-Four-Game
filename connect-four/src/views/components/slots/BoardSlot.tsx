import clsx from "clsx";

import { BoardType } from "../../../types/board.type";

type Props = {
  x: number;
  y: number;
  ch: BoardType;
  onClickCallback: (x: number, y: number) => void;
};

export default function BoardSlot({
  x,
  y,
  ch,
  onClickCallback,
}: Props): JSX.Element {
  const outerClasses = clsx({
    "size-16 rounded-full relative animate-drop_down": ch !== "",
    "bg-red": ch === "X",
    "bg-yellow": ch === "O",
  });
  const innerClasses = clsx({
    "size-12 rounded-full absolute inset-2 shadow-inner": ch !== "",
    "bg-red": ch === "X",
    "bg-yellow": ch === "O",
  });

  return (
    <div onClick={() => onClickCallback(x, y)}>
      <div className="size-16 rounded-full bg-dark-blue animate-bg_fade_in">
        <div className={outerClasses}>
          <div className={innerClasses}></div>
        </div>
      </div>
    </div>
  );
}

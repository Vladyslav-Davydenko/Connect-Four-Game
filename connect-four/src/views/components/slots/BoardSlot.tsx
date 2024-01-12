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
    "size-16 rounded-full relative shadow-xl": true,
    "bg-dark-blue": ch === "",
    "bg-red": ch === "X",
    "bg-yellow": ch === "O",
  });
  const innerClasses = clsx({
    "size-12 rounded-full absolute inset-2 shadow-inner": ch !== "",
    "bg-dark-blue": ch === "",
    "bg-red": ch === "X",
    "bg-yellow": ch === "O",
  });

  return (
    <div onClick={() => onClickCallback(x, y)}>
      <div className={outerClasses}>
        <div className={innerClasses}></div>
      </div>
    </div>
  );
}

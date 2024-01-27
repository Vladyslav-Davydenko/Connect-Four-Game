import clsx from "clsx";

import { BoardType } from "@/types/board/board.type";

type Props = {
  x: number;
  y: number;
  ch: BoardType;
  onClickCallback: (x: number, y: number) => void;
};

export function BoardSlot({ x, y, ch, onClickCallback }: Props): JSX.Element {
  const outerClasses = clsx({
    "size-8 md:size-16 rounded-full relative animate-drop_down flex items-center justify-center":
      ch !== "",
    "bg-red": ch === "X",
    "bg-yellow": ch === "O",
  });
  const innerClasses = clsx({
    "size-6 md:size-12 rounded-full absolute inset-1 md:inset-2 shadow-inner":
      ch !== "",
    "bg-red": ch === "X",
    "bg-yellow": ch === "O",
  });

  return (
    <div onClick={() => onClickCallback(x, y)}>
      <div className="size-8 md:size-16 rounded-full bg-dark-primary animate-bg_fade_in shadow-inner-slot">
        <div className={outerClasses}>
          <div className={innerClasses}></div>
        </div>
      </div>
    </div>
  );
}

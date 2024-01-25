import clsx from "clsx";

import { BoardType } from "@/types/board/board.type";

type Props = {
  ch: BoardType;
};

export function SingleSlot({ ch }: Props): JSX.Element {
  const outerClasses = clsx({
    "size-8 rounded-full relative animate-drop_down flex items-center justify-center":
      ch !== "",
    "bg-red": ch === "X",
    "bg-yellow": ch === "O",
  });
  const innerClasses = clsx({
    "size-6 rounded-full absolute inset-1 shadow-inner": ch !== "",
    "bg-red": ch === "X",
    "bg-yellow": ch === "O",
  });

  return (
    <div>
      <div className="size-8 rounded-full bg-dark-primary animate-bg_fade_in shadow-inner">
        <div className={outerClasses}>
          <div className={innerClasses}></div>
        </div>
      </div>
    </div>
  );
}

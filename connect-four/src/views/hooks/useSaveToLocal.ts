import { BoardType } from "@/types/board/board.type";
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "vilsivul_connect_four";

interface Props {
  board: BoardType[][];
  currentPlayer: "X" | "O";
  playerOneCount: number;
  playerTwoCount: number;
}

export const useSaveToLocal = ({
  board,
  currentPlayer,
  playerOneCount,
  playerTwoCount,
}: Props) => {
  useEffect(() => {
    const preparedData = {
      board,
      currentPlayer,
      playerOneCount,
      playerTwoCount,
    };
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preparedData));
      return;
    }
    const parsedData = JSON.parse(data);
    const { theme } = parsedData;
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ ...preparedData, theme })
    );
  }, [board, currentPlayer]);
};

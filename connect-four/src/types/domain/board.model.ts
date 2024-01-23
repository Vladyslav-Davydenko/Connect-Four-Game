import { BoardType } from "../board/board.type";

export type Connect4Game = {
  id: string;
  board: BoardType[][];
  winner: string | null;
  player1Score: number;
  player2Score: number;
  createdDate: string;
};

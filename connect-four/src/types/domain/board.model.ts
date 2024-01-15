export type Connect4Game = {
  id: number;
  board: string[][];
  winner: string | null;
  player1Score: number;
  player2Score: number;
};

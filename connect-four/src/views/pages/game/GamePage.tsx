import { useEffect, useState } from "react";

import { useAppDispatch } from "@/redux/hooks";
import { useSaveToLocal } from "@/views/hooks";

import { addBoard, refreshStatus } from "@/redux/board/BoardSlice";

import { BoardType } from "@/types/board/board.type";
import { Connect4Game } from "@/types/domain";

import { Icon } from "@/views/components/icon";

import { Board } from "@/views/components/board";
import { PopUpCongratulation } from "@/views/components/pop-up-windows";
import { PlayersScore } from "@/views/components/board";
import { PlayerScoreMobile } from "@/views/components/board";
import { Timer } from "@/views/components/timer/Timer";

import { Link } from "react-router-dom";

const LOCAL_STORAGE_KEY = "vilsivul_connect_four";

export function GamePage(): JSX.Element {
  const [board, setBoard] = useState<BoardType[][]>(() => {
    const localBoard = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localBoard) return JSON.parse(localBoard).board;
    else {
      return [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      ];
    }
  });
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(() => {
    const localBoard = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localBoard) return JSON.parse(localBoard).currentPlayer;
    return "X";
  });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const drawResult = board.some((row) => row.includes(""));

  let playerOneCount = board.reduce(
    (count, row) => count + row.filter((ch) => ch === "X").length,
    0
  );
  let playerTwoCount = board.reduce(
    (count, row) => count + row.filter((ch) => ch === "O").length,
    0
  );

  const dispatch = useAppDispatch();

  // saves data to local storage
  useSaveToLocal({ board, currentPlayer, playerOneCount, playerTwoCount });

  useEffect(() => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length + 1; j++) {
        try {
          checkWinner(i, j, 0, 1); // Check horizontal
          checkWinner(i, j, 1, 0); // Check vertical
          checkWinner(i, j, 1, 1); // Check diagonal \
          checkWinner(i, j, 1, -1); // Check diagonal /
        } catch (e) {
          // Silent skip
        }
      }
    }
  }, [board]);

  const checkWinner = (
    row: number,
    col: number,
    rowStep: number,
    colStep: number
  ) => {
    const player = board[row][col];

    if (!drawResult) {
      dispatch(refreshStatus());
      setGameOver(true);
      setIsOpen(true);
    }

    // formula to check all possible winnig conditions
    if (
      player !== "" &&
      player === board[row + rowStep][col + colStep] &&
      player === board[row + 2 * rowStep][col + 2 * colStep] &&
      player === board[row + 3 * rowStep][col + 3 * colStep]
    ) {
      dispatch(refreshStatus());
      setGameOver(true);
      setIsOpen(true);
    }
  };

  const handleRestartGame = () => {
    setGameOver(false);
    setBoard([
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ]);
    playerOneCount = 0;
    playerTwoCount = 0;
    setCurrentPlayer("X");
  };

  const updateBoard = (x: number, y: number, ch: "X" | "O") => {
    setBoard((prev) => {
      const boardCopy = [...prev];
      boardCopy[y][x] = ch;
      return boardCopy;
    });
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    return;
  };

  const handleOnClick = (x: number) => {
    let y = board.findIndex((rowArr, index) => {
      return rowArr[x] !== "" || index === board.length - 1;
    });
    if (y <= 0) return null;
    if (y !== board.length - 1) y -= 1;
    if (board[y][x] !== "") y -= 1;

    if (!gameOver) updateBoard(x, y, currentPlayer);
  };

  const handleSaveGame = async () => {
    const preparedData: Omit<Connect4Game, "id" | "createdDate"> = {
      board,
      winner: drawResult ? (currentPlayer === "X" ? "O" : "X") : null,
      player1Score: playerOneCount,
      player2Score: playerTwoCount,
    };
    try {
      await dispatch(addBoard(preparedData)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isOpen && (
        <PopUpCongratulation
          handleSaveGame={handleSaveGame}
          setIsOpen={setIsOpen}
          winner={drawResult ? (currentPlayer === "X" ? "2" : "1") : null}
        />
      )}
      <div className="grid  md:gap-8 md:grid-cols-4 grid-cols-1 justify-items-center items-center">
        <div className=" hidden md:block">
          <PlayersScore player="X" playersCont={playerOneCount} />
        </div>
        <div className="flex flex-col gap-6 text-center w-full md:w-auto md:col-span-2">
          <div className="flex justify-between mb-5 items-center">
            <Link
              to={"/"}
              className="py-1 px-2 border-white text-white border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards text-center"
            >
              Return Back
            </Link>
            <Icon />
            <button
              className="py-1 px-2 border-white text-white  border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards"
              onClick={handleRestartGame}
            >
              Start Over
            </button>
          </div>
          <Board board={board} handleOnClick={handleOnClick} />
          <div className="flex justify-between md:justify-center items-center">
            <div className="md:hidden">
              <PlayerScoreMobile player="X" playersCont={playerOneCount} />
            </div>
            <Timer
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              gameOver={gameOver}
            />
            <div className="md:hidden">
              <PlayerScoreMobile player="O" playersCont={playerTwoCount} />
            </div>
          </div>
        </div>
        <div className=" hidden md:block">
          <PlayersScore player="O" playersCont={playerTwoCount} />
        </div>
      </div>
    </>
  );
}

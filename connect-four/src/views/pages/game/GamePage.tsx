import { useEffect, useState } from "react";

import { useAppDispatch } from "../../../redux/hooks";

import { addBoard } from "../../../redux/board/BoardSlice";
import { refreshStatus } from "../../../redux/board/BoardSlice";

import { BoardType } from "../../../types/board/board.type";
import { Connect4Game } from "../../../types/domain/board.model";

import Icon from "../../components/icon/Icon";

import Board from "../../components/board/Board";
import PopUpCongratulation from "../../components/pop-up-windows/Congratulation";
import PlayersScore from "../../components/board/PlayersScore";

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
  const [timeLeft, setTimeLeft] = useState<number>(30);

  let playerOneCount = board.reduce(
    (count, row) => count + row.filter((ch) => ch === "X").length,
    0
  );
  let playerTwoCount = board.reduce(
    (count, row) => count + row.filter((ch) => ch === "O").length,
    0
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const preparedData = {
      board,
      currentPlayer,
      playerOneCount,
      playerTwoCount,
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(preparedData));
  });

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

  useEffect(() => {
    if (gameOver) return;
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    if (timeLeft < 0) {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => setTimeLeft(30), [currentPlayer]);

  const checkWinner = (
    row: number,
    col: number,
    rowStep: number,
    colStep: number
  ) => {
    const player = board[row][col];

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
      winner: currentPlayer === "X" ? "O" : "X",
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
          winner={currentPlayer === "X" ? "2" : "1"}
        />
      )}
      <div className="flex gap-8 justify-center items-center">
        <PlayersScore player="X" playersCont={playerOneCount} />
        <div className="flex flex-col gap-6 text-center">
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
          <div className="flex justify-center items-center">
            <div className=" h-28 w-28 bg-red rounded-lg shadow-xl flex items-center border-black border-2 flex-col relative">
              <div className=" h-[5.2rem] w-[5.2rem] bg-red rounded-lg flex items-center border-black border-2 rotate-45 -top-9 absolute border-b-0 border-r-0"></div>
              <p className="text-yellow text-xl z-10 mt-4">{`Player ${
                currentPlayer === "X" ? "1" : "2"
              } is moving`}</p>
              <p className="text-yellow text-xl py-1">{`${timeLeft}s`}</p>
            </div>
          </div>
        </div>
        <PlayersScore player="O" playersCont={playerTwoCount} />
      </div>
    </>
  );
}

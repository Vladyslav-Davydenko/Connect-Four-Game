import { useEffect, useRef, useState } from "react";

import { useAppDispatch } from "../../../redux/hooks";
import { useAppSelector } from "../../../redux/hooks";

import { Status } from "../../../types/domain";

import { selectStatus } from "../../../redux/board/BoardSlice";
import { selectError } from "../../../redux/board/BoardSlice";

import { addBoard } from "../../../redux/board/BoardSlice";
import { refreshStatus } from "../../../redux/board/BoardSlice";

import { BoardType } from "../../../types/board/board.type";
import { Connect4Game } from "../../../types/domain/board.model";

import Icon from "../../components/icon/Icon";

import Board from "../../components/board/Board";

import { Link } from "react-router-dom";

export function GamePage(): JSX.Element {
  const [board, setBoard] = useState<BoardType[][]>([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [playerOneCount, setPlayerOneCount] = useState<number>(0);
  const [playerTwoCount, setPlayerTwoCount] = useState<number>(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  type ButtonNamingType<T extends Status> = { [K in T]?: string };

  const buttonNaming: ButtonNamingType<Status> = {
    loading: "Saving...",
    idle: "Save the game",
    succeeded: "Saved",
  };

  useEffect(() => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length + 1; j++) {
        try {
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i][j + 1] &&
            board[i][j] === board[i][j + 2] &&
            board[i][j] === board[i][j + 3]
          ) {
            dispatch(refreshStatus());
            setGameOver(true);
            setIsOpen(true);
          }
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i + 1][j] &&
            board[i][j] === board[i + 2][j] &&
            board[i][j] === board[i + 3][j]
          ) {
            dispatch(refreshStatus());
            setGameOver(true);
            setIsOpen(true);
          }
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i + 1][j + 1] &&
            board[i][j] === board[i + 2][j + 2] &&
            board[i][j] === board[i + 3][j + 3]
          ) {
            dispatch(refreshStatus());
            setGameOver(true);
            setIsOpen(true);
          }
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i + 1][j - 1] &&
            board[i][j] === board[i + 2][j - 2] &&
            board[i][j] === board[i + 3][j - 3]
          ) {
            dispatch(refreshStatus());
            setGameOver(true);
            setIsOpen(true);
          }
        } catch (e) {
          // Silent skip
        }
      }
    }
  }, [board]);

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
    setCurrentPlayer("X");
    setPlayerOneCount(0);
    setPlayerTwoCount(0);
  };

  const updateBoard = (x: number, y: number, ch: "X" | "O") => {
    setBoard((prev) => {
      const boardCopy = [...prev];
      boardCopy[y][x] = ch;
      return boardCopy;
    });
    if (currentPlayer === "X") setPlayerOneCount((prev) => (prev += 1));
    if (currentPlayer === "O") setPlayerTwoCount((prev) => (prev += 1));
    setCurrentPlayer(ch === "X" ? "O" : "X");
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
    const preparedData: Omit<Connect4Game, "id"> = {
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
        <div className="absolute bg-black bg-opacity-40 h-dvh w-full z-10 flex justify-center items-center animate-bg_fade_in">
          <div className=" bg-blue p-10 rounded-xl shadow-lg absolute z-20 opacity-0 animate-appear_3 fill-mode-forwards flex flex-col justify-center items-center gap-10">
            <h1 className="text-yellow text-4xl">Congratulation!</h1>
            {error ? (
              <h2 className="text-yellow text-2xl">{error.message}</h2>
            ) : (
              <h2 className="text-yellow text-2xl">{`Player ${
                currentPlayer === "X" ? "2" : "1"
              } win the game`}</h2>
            )}
            <div>
              <button
                className="py-3 px-6 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards"
                onClick={() => setIsOpen(false)}
              >
                Close the window
              </button>
              <button
                id="save-button"
                className="py-3 px-6 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards disabled:opacity-75"
                onClick={handleSaveGame}
                ref={buttonRef}
                disabled={status !== "idle"}
              >
                {buttonNaming[status]}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-8 justify-center items-center">
        <div className=" h-48 w-48 bg-white rounded-lg border-black border-2 shadow-xl relative">
          <div className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-8">
            <div className="size-16 rounded-full relative animate-drop_down bg-red flex items-center justify-center shadow-lg">
              <div className="size-12 rounded-full absolute shadow-inner bg-red"></div>
            </div>
            <div className="text-center">
              <h1 className="text-dark-blue text-xl mt-2">Player 1</h1>
              <p className="text-dark-blue text-4xl mt-4">{playerOneCount}</p>
            </div>
          </div>
        </div>
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
              <h1 className="text-yellow text-xl z-10 mt-4">{`Player ${
                currentPlayer === "X" ? "1" : "2"
              } is moving`}</h1>
            </div>
          </div>
        </div>
        <div className=" h-48 w-48 bg-white rounded-lg border-black border-2 shadow-xl relative">
          <div className=" absolute left-1/2 transform -translate-x-1/2 -translate-y-8">
            <div className="size-16 rounded-full relative animate-drop_down bg-yellow flex items-center justify-center shadow-lg">
              <div className="size-12 rounded-full absolute shadow-inner bg-yellow"></div>
            </div>
            <div className="text-center">
              <h1 className="text-dark-blue text-xl mt-2">Player 2</h1>
              <p className="text-dark-blue text-4xl mt-4">{playerTwoCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

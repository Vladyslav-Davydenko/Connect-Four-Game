import { useEffect, useRef, useState } from "react";

import { BoardType } from "../../../types/board.type";

import BoardSlot from "../../components/slots/BoardSlot";

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
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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
            setGameOver(true);
            setIsOpen(true);
          }
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i + 1][j] &&
            board[i][j] === board[i + 2][j] &&
            board[i][j] === board[i + 3][j]
          ) {
            setGameOver(true);
            setIsOpen(true);
          }
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i + 1][j + 1] &&
            board[i][j] === board[i + 2][j + 2] &&
            board[i][j] === board[i + 3][j + 3]
          ) {
            setGameOver(true);
            setIsOpen(true);
          }
          if (
            board[i][j] !== "" &&
            board[i][j] === board[i + 1][j - 1] &&
            board[i][j] === board[i + 2][j - 2] &&
            board[i][j] === board[i + 3][j - 3]
          ) {
            setGameOver(true);
            setIsOpen(true);
          }
        } catch (e: any) {
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
  };

  const updateBoard = (x: number, y: number, ch: "X" | "O") => {
    setBoard((prev) => {
      const boardCopy = [...prev];
      boardCopy[y][x] = ch;
      return boardCopy;
    });
    setCurrentPlayer(ch === "X" ? "O" : "X");
    return;
  };

  const handleOnClick = (x: number) => {
    let y = board.findIndex((rowArr, index) => {
      return rowArr[x] !== "" || index === board.length - 1;
    });
    if (y !== board.length - 1) y -= 1;
    if (board[y][x] !== "") y -= 1;
    if (!gameOver) updateBoard(x, y, currentPlayer);
  };

  const handleSaveGame = async () => {
    console.log(board);
    console.log("---------------------");
    console.log(`Player ${currentPlayer === "X" ? "2" : "1"} win the game`);
    if (buttonRef.current) {
      buttonRef.current.innerText = "Saving...";
      buttonRef.current.setAttribute("disabled", "true");
      setTimeout(() => {
        buttonRef.current!.innerText = "Saved";
      }, 1000);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="absolute bg-black bg-opacity-40 h-dvh w-full z-10 flex justify-center items-center animate-bg_fade_in">
          <div className=" bg-blue p-10 rounded-xl shadow-lg absolute z-20 opacity-0 animate-appear_3 fill-mode-forwards flex flex-col justify-center items-center gap-10">
            <h1 className="text-yellow text-4xl">Congratulation!</h1>
            <h2 className="text-yellow text-2xl">{`Player ${
              currentPlayer === "X" ? "2" : "1"
            } win the game`}</h2>
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
              >
                Save the Game
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6 text-center ">
        <div className="grid grid-cols-7 gap-4 bg-white p-6 rounded-lg shadow-xl  animate-bg_fade_in">
          {board.map((row, i) =>
            row.map((ch, j) => {
              return (
                <div key={i + "-" + j}>
                  <BoardSlot
                    x={j}
                    y={i}
                    ch={ch}
                    onClickCallback={handleOnClick}
                  />
                </div>
              );
            })
          )}
        </div>
        <h1 className="text-yellow text-4xl pt-4">{`Player ${
          currentPlayer === "X" ? "1" : "2"
        } is moving`}</h1>
        <div className="flex justify-between">
          <Link
            to={"/"}
            className="py-3 px-6 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards"
          >
            Return Back
          </Link>
          <button
            className="py-3 px-6 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards"
            onClick={handleRestartGame}
          >
            Start Over
          </button>
        </div>
      </div>
    </>
  );
}

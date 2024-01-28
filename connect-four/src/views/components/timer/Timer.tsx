import { useState, useEffect } from "react";

interface Props {
  gameOver: boolean;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<"X" | "O">>;
  currentPlayer: "X" | "O";
}

export const Timer = ({
  gameOver,
  setCurrentPlayer,
  currentPlayer,
}: Props): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<number>(30);

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
  return (
    <div className="flex justify-center items-center">
      <div className=" w-20 md:h-28 md:w-28 bg-red rounded-lg shadow-xl flex items-center border-black border-2 flex-col relative">
        <div className=" h-[3.7rem] w-[3.7rem] md:h-[5.2rem] md:w-[5.2rem] bg-red rounded-lg flex items-center border-black border-2 rotate-45 md:-top-9 -top-7 absolute border-b-0 border-r-0"></div>
        <p className="text-yellow text-md md:text-xl z-10 md:mt-4">{`Player's ${
          currentPlayer === "X" ? "1" : "2"
        } move`}</p>
        <p className="text-yellow text-xl py-1">{`${timeLeft}s`}</p>
      </div>
    </div>
  );
};

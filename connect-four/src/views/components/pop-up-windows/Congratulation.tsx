import { useAppSelector } from "@/redux/hooks";

import { selectError, selectStatus } from "@/redux/board/BoardSlice";

import { Status } from "@/types/domain";

interface Props {
  winner: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveGame: () => void;
}

export function PopUpCongratulation({
  winner,
  handleSaveGame,
  setIsOpen,
}: Props): JSX.Element {
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  type ButtonNamingType<T extends Status> = { [K in T]?: string };

  const buttonNaming: ButtonNamingType<Status> = {
    loading: "Saving...",
    idle: "Save the game",
    succeeded: "Saved",
  };

  return (
    <div className="absolute bg-black bg-opacity-40 min-h-dvh w-full z-10 flex justify-center items-center animate-bg_fade_in">
      <div className=" bg-blue p-10 rounded-xl shadow-lg absolute z-20 opacity-0 animate-appear_3 fill-mode-forwards flex flex-col justify-center items-center gap-10">
        <h1 className="text-yellow text-4xl">Congratulation!</h1>
        {error ? (
          <h2 className="text-yellow text-2xl">{error.message}</h2>
        ) : (
          <h2 className="text-yellow text-2xl">{`Player ${winner} win the game`}</h2>
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
            disabled={status !== "idle"}
          >
            {buttonNaming[status]}
          </button>
        </div>
      </div>
    </div>
  );
}

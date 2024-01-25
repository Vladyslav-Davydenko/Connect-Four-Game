import { useAppSelector } from "@/redux/hooks";
import { useAppDispatch } from "@/redux/hooks";

import {
  selectError,
  selectStatus,
  deleteBoard,
} from "@/redux/board/BoardSlice";

import { Status } from "@/types/domain";

interface Props {
  id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeletePopUp({ id, setIsOpen }: Props): JSX.Element {
  const error = useAppSelector(selectError);
  const status = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();

  type ButtonNamingType<T extends Status> = { [K in T]?: string };

  const buttonNaming: ButtonNamingType<Status> = {
    loading: "Deleting...",
    idle: "Delete",
    succeeded: "Deleted",
    failed: "Error",
  };

  const hanndleDeleteData = async () => {
    try {
      await dispatch(deleteBoard(id)).unwrap();
      console.log(`game with id: ${id} was deleted`);
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute bg-black bg-opacity-40 h-full w-full"></div>
      <div
        className={` bg-primary p-10 rounded-xl shadow-lg z-20 opacity-0 animate-appear_3 fill-mode-forwards flex flex-col justify-center items-center gap-10`}
      >
        <h1 className="text-yellow text-4xl">Are you sure!</h1>
        {error ? (
          <h2 className="text-yellow text-2xl">{error.message}</h2>
        ) : (
          <>
            <h2 className="text-yellow text-2xl">
              You want to delete game with id:
            </h2>
            <p className="text-yellow text-xl">{id}</p>
          </>
        )}
        <div>
          <button
            className="py-3 px-6 mx-16 bg-white text-primary border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            id="delete-button"
            className="py-3 px-6 mx-16 bg-white text-primary border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards disabled:opacity-75"
            onClick={hanndleDeleteData}
            disabled={status !== "idle"}
          >
            {buttonNaming[status]}
          </button>
        </div>
      </div>
    </div>
  );
}

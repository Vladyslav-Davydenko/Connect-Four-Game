import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import {
  fetchBoards,
  selectBoardIDs,
  selectStatus,
  selectTotalCountPlayerWin,
} from "@/redux/board/BoardSlice";

import { SingleUnit } from "@/views/components/dashboard";

import { Loader } from "@/views/components/loader";
import { useEffect } from "react";

export function DashBoardPage(): JSX.Element {
  const boardIds = useAppSelector(selectBoardIDs);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const playerOneCount = useAppSelector((rootState) =>
    selectTotalCountPlayerWin(rootState, "X")
  );
  const playerTwoCount = useAppSelector((rootState) =>
    selectTotalCountPlayerWin(rootState, "O")
  );

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-6 w-[90%] md:w-[90%] justify-center items-center m-10 mb-56">
      <h1 className="text-yellow md:text-7xl text-4xl mb-20 animate-wiggle text-cente">
        Dash Board
      </h1>
      <div className="flex justify-center mb-5 items-center md:gap-24 gap-8">
        <div className="flex gap-2 md:w-32">
          <p>{`Total: ${boardIds.length}`}</p>
        </div>
        <Link
          to={"/"}
          className="py-1 px-2 border-white text-white border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards text-center w-32"
        >
          Return Back
        </Link>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 md:w-32">
            <div className="size-6 rounded-full relative animate-drop_down bg-red flex items-center justify-center">
              <div className="size-4 rounded-full absolute shadow-inner bg-red"></div>
            </div>
            <p>:</p>
            <p>{playerOneCount}</p>
          </div>
          <div className="flex gap-2">
            <div className="size-6 rounded-full relative animate-drop_down bg-yellow flex items-center justify-center">
              <div className="size-4 rounded-full absolute shadow-inner bg-yellow"></div>
            </div>
            <p>:</p>
            <p>{playerTwoCount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 items-center">
        {!boardIds.length && <p>No data has been saved yet</p>}
        {status === "loading" && <Loader />}
        {boardIds.map((id, index) => {
          return <SingleUnit id={id} key={id} index={index + 1} />;
        })}
      </div>
    </div>
  );
}

import { useAppSelector, useAppDispatch } from "../../../redux/hooks";

import { fetchBoards } from "../../../redux/board/BoardSlice";

import {
  selectBoardIDs,
  selectStatus,
  selectTotalCountPlayerWin,
} from "../../../redux/board/BoardSlice";

import SingleUnit from "../../components/dashboard/SingleUnit";
import { Link } from "react-router-dom";

import Loader from "../../components/loader/Loader";
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
    <div className="flex flex-col gap-6 w-[70%] justify-center items-center m-10">
      <h1 className="text-yellow text-7xl mb-20 animate-wiggle text-cente">
        Dash Board
      </h1>
      {!boardIds.length && <p>No data has been saved yet</p>}
      {status === "loading" && <Loader />}
      <div className="flex justify-center mb-5 items-center gap-24 w-full">
        <div className="flex gap-2 w-32">
          <p>Total games</p>
          <p>:</p>
          <p>{boardIds.length}</p>
        </div>
        <Link
          to={"/"}
          className="py-1 px-2 border-white text-white border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards text-center w-32"
        >
          Return Back
        </Link>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-32">
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
      <div className="flex flex-col gap-6">
        {boardIds.map((id, index) => {
          return <SingleUnit id={id} key={id} index={index + 1} />;
        })}
      </div>
    </div>
  );
}

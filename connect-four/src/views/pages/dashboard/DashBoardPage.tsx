import { useAppSelector } from "../../../redux/hooks";

import { selectBoardIDs } from "../../../redux/board/BoardSlice";

import SingleUnit from "../../components/dashboard/SingleUnit";
import { Link } from "react-router-dom";

export function DashBoardPage(): JSX.Element {
  const boardIds = useAppSelector(selectBoardIDs);

  return (
    <div className="flex flex-col gap-6 w-[70%] justify-center items-center m-10">
      <h1 className="text-yellow text-7xl mb-20 animate-wiggle text-cente">
        Dash Board
      </h1>
      <div className="flex justify-between mb-5 items-center">
        <Link
          to={"/"}
          className="py-1 px-2 border-white text-white border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards text-center"
        >
          Return Back
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        {boardIds.map((id, index) => {
          console.log(index);
          return <SingleUnit id={id} key={id} index={index + 1} />;
        })}
      </div>
    </div>
  );
}

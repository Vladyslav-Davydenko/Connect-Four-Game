import { Link } from "react-router-dom";
import { GAME_ROUTE, INFO_ROUTE, DASHBOARD_ROUTE } from "../../../routes";

export function StartGamePage(): JSX.Element {
  return (
    <div className="flex-col">
      <h1 className=" text-yellow text-7xl mb-10 animate-wiggle">
        Connect Four
      </h1>
      <div className=" flex flex-col gap-5 text-center text-xl">
        <Link
          to={GAME_ROUTE}
          className="py-3 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-200 shadow-lg hover:shadow-xl active:shadow-md"
        >
          Start
        </Link>
        <Link
          to={INFO_ROUTE}
          className="py-3 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-200 shadow-lg hover:shadow-xl active:shadow-md"
        >
          Info
        </Link>
        <Link
          to={DASHBOARD_ROUTE}
          className="py-3 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-200 shadow-lg hover:shadow-xl active:shadow-md"
        >
          DashBoard
        </Link>
        <button className="py-3 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-200 shadow-lg hover:shadow-xl active:shadow-md">
          Exit
        </button>
      </div>
    </div>
  );
}

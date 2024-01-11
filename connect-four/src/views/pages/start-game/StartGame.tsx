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
          className=" transition-all transform py-3 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards "
        >
          Start
        </Link>
        <Link
          to={INFO_ROUTE}
          className="py-3 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_2 fill-mode-backwards "
        >
          Info
        </Link>
        <Link
          to={DASHBOARD_ROUTE}
          className="py-3 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_3 fill-mode-backwards"
        >
          DashBoard
        </Link>
        <button className="py-3 mx-16 bg-white text-blue border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_4 fill-mode-backwards">
          Exit
        </button>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { GAME_ROUTE, INFO_ROUTE, DASHBOARD_ROUTE } from "@/routes";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeTheme } from "@/redux/theme/ThemeSlice";
import { selectTheme } from "@/redux/theme/ThemeSlice";
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "vilsivul_connect_four";

export function StartGamePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    const game = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (game) {
      const data = JSON.parse(game);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ ...data, theme })
      );
    }
  }, [theme]);

  return (
    <div className="flex-col">
      <div className="flex gap-2 px-4 py-2 rounded-xl absolute top-4 right-4 bg-white">
        <span
          onClick={() => dispatch(changeTheme(""))}
          className={`size-4 rounded-full bg-blue-700 ${
            theme === "" ? "opacity-100" : "opacity-70"
          } hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-[0.1rem] active:translate-y-[0.1rem]`}
        ></span>
        <span
          onClick={() => dispatch(changeTheme("red"))}
          className={`size-4 rounded-full bg-red ${
            theme === "red" ? "opacity-100" : "opacity-70"
          } hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-[0.1rem] active:translate-y-[0.1rem]`}
        ></span>
        <span
          onClick={() => dispatch(changeTheme("green"))}
          className={`size-4 rounded-full bg-green-700 ${
            theme === "green" ? "opacity-100" : "opacity-70"
          } hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-[0.1rem] active:translate-y-[0.1rem]`}
        ></span>
        <span
          onClick={() => dispatch(changeTheme("brown"))}
          className={`size-4 rounded-full bg-orange-800 ${
            theme === "brown" ? "opacity-100" : "opacity-70"
          } hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-[0.1rem] active:translate-y-[0.1rem]`}
        ></span>
        <span
          onClick={() => dispatch(changeTheme("pink"))}
          className={`size-4 rounded-full bg-purple-900 ${
            theme === "pink" ? "opacity-100" : "opacity-70"
          } hover:opacity-100 transition-all duration-300 cursor-pointer hover:-translate-y-[0.1rem] active:translate-y-[0.1rem]`}
        ></span>
      </div>
      <h1 className=" text-yellow text-7xl mb-20 animate-wiggle text-center">
        Connect Four
      </h1>
      <div className=" flex flex-col gap-5 text-center text-xl">
        <Link
          to={GAME_ROUTE}
          className=" transition-all transform py-3 mx-16 bg-white text-primary border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_1 fill-mode-backwards "
        >
          Start
        </Link>
        <Link
          to={INFO_ROUTE}
          className="py-3 mx-16 bg-white text-primary border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_2 fill-mode-backwards "
        >
          Info
        </Link>
        <Link
          to={DASHBOARD_ROUTE}
          className="py-3 mx-16 bg-white text-primary border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_3 fill-mode-backwards"
        >
          DashBoard
        </Link>
        <Link
          to={"test"}
          className="py-3 mx-16 bg-white text-primary border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_4 fill-mode-backwards"
        >
          Error Test
        </Link>
        {/* <button className="py-3 mx-16 bg-white text-primary border rounded-lg hover:-translate-y-1 active:translate-y-1.5 duration-500 shadow-lg hover:shadow-xl active:shadow-md animate-appear_4 fill-mode-backwards">
          Exit
        </button> */}
      </div>
    </div>
  );
}

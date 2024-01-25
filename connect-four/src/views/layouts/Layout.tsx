import { Outlet } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";

import { selectTheme } from "@/redux/theme/ThemeSlice";

export function Layout(): JSX.Element {
  const theme = useAppSelector(selectTheme);

  return (
    <div
      className={`min-h-screen bg-dark-primary text-white font-semibold flex justify-center items-center relative theme-${theme} transition-colors duration-500`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-super-dark-primary rounded-t-[100px] transition-colors duration-500"></div>
      <Outlet />
    </div>
  );
}

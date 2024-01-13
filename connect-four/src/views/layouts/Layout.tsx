import { Outlet } from "react-router-dom";

export function Layout(): JSX.Element {
  return (
    <div className="h-dvh bg-dark-blue text-white font-semibold flex justify-center items-center">
      <Outlet />
    </div>
  );
}

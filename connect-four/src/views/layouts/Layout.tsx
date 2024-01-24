import { Outlet } from "react-router-dom";

export function Layout(): JSX.Element {
  return (
    <div className=" min-h-screen bg-dark-blue text-white font-semibold flex justify-center items-center relative">
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-super-dark-blue rounded-t-[100px]"></div>
      <Outlet />
    </div>
  );
}

import { Outlet } from "react-router-dom";

export function Layout(): JSX.Element {
  return (
    <div className="h-screen bg-dark-blue flex content-center text-center">
      <Outlet />
    </div>
  );
}

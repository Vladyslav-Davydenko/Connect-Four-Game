import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";

import { useAppDispatch } from "./redux/hooks";
import { changeTheme } from "./redux/theme/ThemeSlice";

import { Layout } from "@/views/layouts/Layout";

import { StartGamePage } from "@/views/pages/start-game";
import { DashBoardPage } from "@/views/pages/dashboard";
import { GamePage } from "@/views/pages/game";
import { InfoPage } from "@/views/pages/info";
import { Error404Page } from "@/views/pages/error";

import { GAME_ROUTE, INFO_ROUTE, DASHBOARD_ROUTE } from "@/routes";

const LOCAL_STORAGE_KEY = "vilsivul_connect_four";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const game = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (game) {
      const theme = JSON.parse(game).theme;
      if (theme) dispatch(changeTheme(theme));
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartGamePage />} />

        <Route path={GAME_ROUTE}>
          <Route index element={<GamePage />} />
        </Route>

        <Route path={INFO_ROUTE}>
          <Route index element={<InfoPage />} />
        </Route>

        <Route path={DASHBOARD_ROUTE}>
          <Route index element={<DashBoardPage />} />
        </Route>

        <Route path="*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
}

export default App;

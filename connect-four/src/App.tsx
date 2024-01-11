import { Route, Routes } from "react-router-dom";

import { Layout } from "./views/layouts/Layout";

import { StartGamePage } from "./views/pages/start-game";
import { DashBoardPage } from "./views/pages/dashboard";
import { GamePage } from "./views/pages/game";
import { InfoPage } from "./views/pages/info";
import { Error404Page } from "./views/pages/error";

import { GAME_ROUTE, INFO_ROUTE, DASHBOARD_ROUTE } from "./routes";

function App() {
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

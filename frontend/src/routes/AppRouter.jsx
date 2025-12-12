import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/Mainpage";
import PlannerPage from "../pages/PlannerPage";
import MapPage from "../pages/MapPage";
import SettingPage from "../pages/SettingPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

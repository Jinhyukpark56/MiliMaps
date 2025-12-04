import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import SignUpPage from "../pages/SignUpPage";
import PlannerPage from "../pages/PlannerPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/planner" element={<PlannerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

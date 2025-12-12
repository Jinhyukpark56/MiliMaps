import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import DdayCounter from "../components/forms/DdayCounter";
import TodayMenu from "../components/forms/ToDayMenu";
import TabBar from "../components/forms/TabBar";
import "../styles/theme.css";
import "../styles/main.css";

function MainPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/user/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="content-container">

        {/* D-Day 카드 */}
        {user && <DdayCounter user={user} />}

        {/* 오늘의 식단 카드 */}
        <TodayMenu />

      </div>

      {/* 하단 탭 메뉴 */}
      <TabBar />
    </div>
  );
}

export default MainPage;

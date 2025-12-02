import React, { useState, useEffect } from "react";
import DdayCounter from "../components/forms/DdayCounter";
import DdaySettingForm from "../components/forms/DdaySettingForm";
import "../styles/MainPage.css";
import TabBar from "../components/forms/TabBar";

function MainPage() {
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ddaySettings"));
    if (saved) setSettings(saved);
  }, []);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
    localStorage.setItem("ddaySettings", JSON.stringify(newSettings));
  };

  return (
    <div className="app-frame">
      {" "}
      {/* 로그인 페이지와 동일한 앱 프레임 */}
      <div className="main-layout">
        {/* ===== 상단: D-Day 카드 ===== */}
        <section className="top-section">
          {!showSettings ? (
            <DdayCounter
              name={settings?.name}
              startDate={settings?.startDate}
              endDate={settings?.endDate}
              onOpenSettings={() => setShowSettings(true)}
            />
          ) : (
            <DdaySettingForm onSave={handleSaveSettings} />
          )}
        </section>

        {/* ===== 중간: 오늘의 식단 (추후 추가 예정) ===== */}
        <section className="middle-section">
          <p>오늘의 식단 섹션 (추후 추가 예정)</p>
        </section>

        {/* ===== 하단: 메뉴바 (추후 추가 예정) ===== */}
        <footer className="bottom-section">
          <TabBar />
        </footer>
      </div>
    </div>
  );
}

export default MainPage;

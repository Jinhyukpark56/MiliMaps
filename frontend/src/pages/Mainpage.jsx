import React, { useState, useEffect } from "react";
import DdayCounter from "../components/forms/DdayCounter";
import DdaySettingForm from "../components/forms/DdaySettingForm";
import "../styles/MainPage.css";
import TabBar from "../components/forms/TabBar";
import api from "../api/axios";

function MainPage() {
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // ===== 백엔드에서 유저 정보 불러오기 =====
  useEffect(() => {
    async function loadUserData() {
      try {
        const res = await api.get("/user/me");

        if (res.data.status === "success") {
          const u = res.data.user;

          setSettings({
            name: u.nickname,
            startDate: u.enlistDate,
            endDate: u.dischargeDate,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadUserData();
  }, []);

  // 설정 저장 (현재는 local UI 전환만 수행)
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <div className="app-frame">
      <div className="main-layout">
        {/* ===== 상단: D-Day 영역 ===== */}
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

        {/* ===== 중간: 오늘의 식단 ===== */}
        <section className="middle-section">
          <p>오늘의 식단 섹션 (추후 추가 예정)</p>
        </section>

        {/* ===== 하단 메뉴 ===== */}
        <footer className="bottom-section">
          <TabBar />
        </footer>
      </div>
    </div>
  );
}

export default MainPage;

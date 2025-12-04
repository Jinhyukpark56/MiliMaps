import React, { useEffect, useState } from "react";
import "../../styles/DdayCounter.css";

function DdayCounter({ name, startDate, endDate, onOpenSettings }) {
  const [daysLeft, setDaysLeft] = useState(null);
  const [passedDays, setPassedDays] = useState(null);
  const [progress, setProgress] = useState(0);
  const [rank, setRank] = useState("훈련병");

  // ===== 전역 정보 계산 =====
  useEffect(() => {
    if (startDate && endDate) {
      const today = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const passed = Math.ceil((today - start) / (1000 * 60 * 60 * 24));
      const left = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

      const progressValue = Math.min(Math.max((passed / totalDays) * 100, 0), 100);

      setPassedDays(passed);
      setDaysLeft(left);
      setProgress(progressValue);

      // 계급 계산 (대한민국 육군 기준 예시)
      if (passed < 91) setRank("이등병");
      else if (passed < 181) setRank("일병");
      else if (passed < 366) setRank("상병");
      else if (passed < 548) setRank("병장");
      else setRank("전역자");
    }
  }, [startDate, endDate]);

  // ===== 전역 정보 없음 → 기본 안내 화면 =====
  if (!name || !startDate || !endDate) {
    return (
      <div className="dday-card">
        <p className="dday-placeholder">⚙️ 전역 정보를 설정해주세요.</p>
        <button className="dday-setting-btn" onClick={onOpenSettings}>
          설정하기
        </button>
      </div>
    );
  }

  // ===== 전역 정보 있음 → D-DAY 표시 =====
  return (
    <div className="dday-card">
      <div className="dday-header">
        <h2 className="dday-name">
          {name} {rank}님
        </h2>
        <button className="dday-setting-btn small" onClick={onOpenSettings}>
          ⚙️
        </button>
      </div>

      <p className="dday-info">
        현재 복무일: <strong>{passedDays}일</strong>
        {daysLeft > 0 ? (
          <> / 남은 복무일: <strong>D-{daysLeft}</strong></>
        ) : (
          <strong>🎉 전역 완료!</strong>
        )}
      </p>

      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <span className="progress-overlay">{Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

export default DdayCounter;

import React from "react";
import "../../styles/TabBar.css"; 
// 실제 아이콘 라이브러리(예: react-icons)를 사용하면 좋습니다.
// 여기서는 텍스트로 아이콘을 대체합니다.

function TabBar() {
  return (
    <div className="tab-bar">
      <button className="tab-button">
        <span className="icon">📅</span>
        <span className="label">전역일계산기</span>
      </button>
      <button className="tab-button">
        <span className="icon">✈️</span>
        <span className="label">휴가 플래너</span>
      </button>
      <button className="tab-button">
        <span className="icon">🗺️</span>
        <span className="label">지도</span>
      </button>
      <button className="tab-button">
        <span className="icon">⚙️</span>
        <span className="label">설정</span>
      </button>
    </div>
  );
}

export default TabBar;
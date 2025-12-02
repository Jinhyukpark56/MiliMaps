import React from "react";
import "../../styles/TabBar.css";


function TabBar() {
    return (
        <div className="tab-bar">
            <button className="tab-button">
                <span className="icon"><i className="bi bi-calendar3"></i></span>
                <span className="label">전역일계산기</span>
            </button>
            <button className="tab-button">
                <span className="icon"><i className="bi bi-airplane"></i></span>
                <span className="label">휴가 플래너</span>
            </button>
            <button className="tab-button">
                <span className="icon"><i className="bi bi-geo-alt"></i></span>
                <span className="label">지도</span>
            </button>
            <button className="tab-button">
                <span className="icon"><i className="bi bi-gear"></i></span>
                <span className="label">설정</span>
            </button>
        </div>
    );
}

export default TabBar;

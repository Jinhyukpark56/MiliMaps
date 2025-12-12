import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/TabBar.css";

function TabBar() {
    const navigate = useNavigate();

    return (
        <div className="tabbar">
            <button className="tab-item" onClick={() => navigate("/main")}>
                <i className="bi bi-calendar3"></i>
                <span>전역일</span>
            </button>

            <button className="tab-item" onClick={() => navigate("/planner")}>
                <i className="bi bi-airplane"></i>
                <span>휴가</span>
            </button>

            <button className="tab-item" onClick={() => navigate("/map")}>
                <i className="bi bi-geo-alt"></i>
                <span>지도</span>
            </button>

            <button className="tab-item" onClick={() => navigate("/settings")}>
                <i className="bi bi-gear"></i>
                <span>설정</span>
            </button>
        </div>
    );
}

export default TabBar;

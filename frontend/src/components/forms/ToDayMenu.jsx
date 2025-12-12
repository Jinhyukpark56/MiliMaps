import React from "react";
import "../style/TodayMenu.css";

const WEEKLY_MENU_DATA = {
    0: { day: "일요일", morning: ["간편식", "우유", "과일"], lunch: ["짜장면", "탕수육", "단무지"], dinner: ["각자 알아서"] },
    1: { day: "월요일", morning: ["토스트", "계란 프라이", "커피"], lunch: ["김치찌개", "제육볶음", "잡곡밥"], dinner: ["된장찌개", "삼겹살 구이", "쌈채소"] },
    2: { day: "화요일", morning: ["미역국", "계란말이", "김", "요구르트"], lunch: ["제육볶음", "콩나물국", "김치", "샐러드"], dinner: ["카레라이스", "단무지", "야채튀김"] },
    3: { day: "수요일", morning: ["죽", "동치미", "과일 주스"], lunch: ["비빔밥", "콩나물국", "고추장"], dinner: ["부대찌개", "라면사리", "밥"] },
    4: { day: "목요일", morning: ["시리얼", "바나나", "우유"], lunch: ["돈까스", "스프", "단무지", "밥"], dinner: ["닭볶음탕", "깍두기", "잡곡밥"] },
    5: { day: "금요일", morning: ["샌드위치", "샐러드", "아메리카노"], lunch: ["해물 칼국수", "김치", "겉절이"], dinner: ["초밥 세트", "우동", "샐러드"] },
    6: { day: "토요일", morning: ["프렌치 토스트", "소시지", "베이컨"], lunch: ["피자", "콜라", "피클"], dinner: ["회", "매운탕", "공깃밥"] },
};

function TodayMenu() {
    const dayIndex = new Date().getDay();
    const menu = WEEKLY_MENU_DATA[dayIndex];

    const renderList = (items) => (
        <ul className="menu-list">
            {items.map((item, idx) => (
                <li key={idx} className="menu-list-item">{item}</li>
            ))}
        </ul>
    );

    return (
        <div className="card today-menu-card">
            <h2 className="today-title">오늘의 식단 ({menu.day})</h2>

            <div className="menu-section">
                <div className="menu-block">
                    <span className="menu-label">아침</span>
                    {renderList(menu.morning)}
                </div>

                <div className="menu-block">
                    <span className="menu-label">점심</span>
                    {renderList(menu.lunch)}
                </div>

                <div className="menu-block">
                    <span className="menu-label">저녁</span>
                    {renderList(menu.dinner)}
                </div>
            </div>
        </div>
    );
}

export default TodayMenu;

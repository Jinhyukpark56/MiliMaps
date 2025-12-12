import React, { useEffect, useState } from "react";
import "../../styles/theme.css";
import "../../styles/main.css";

function DdayCounter({ user }) {
  if (!user) return null;

  const { nickname, enlistDate, dischargeDate } = user;

  const [passed, setPassed] = useState(0);
  const [left, setLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [rank, setRank] = useState("훈련병");

  useEffect(() => {
    if (!enlistDate || !dischargeDate) return;

    const today = new Date();
    const start = new Date(enlistDate);
    const end = new Date(dischargeDate);

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const passedDays = Math.ceil((today - start) / (1000 * 60 * 60 * 24));
    const leftDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    setPassed(passedDays);
    setLeft(leftDays);
    setProgress(Math.min(Math.max((passedDays / totalDays) * 100, 0), 100));

    // 계급 계산
    if (passedDays < 91) setRank("이등병");
    else if (passedDays < 181) setRank("일병");
    else if (passedDays < 366) setRank("상병");
    else if (passedDays < 548) setRank("병장");
    else setRank("전역자");
  }, [enlistDate, dischargeDate]);

  return (
    <div className="card dday-card">
      <div className="dday-header">
        <h2 className="dday-title">
          {nickname} {rank}님
        </h2>
      </div>

      <div className="dday-info">
        <p>복무한 기간: <strong>{passed}일</strong></p>

        {left > 0 ? (
          <p>남은 복무일: <strong>D-{left}</strong></p>
        ) : (
          <p><strong>🎉 전역을 축하합니다!</strong></p>
        )}
      </div>

      {/* 진행률 바 */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="progress-text">{Math.floor(progress)}%</div>
    </div>
  );
}

export default DdayCounter;

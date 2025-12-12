import React, { useState, useEffect } from "react";
import api from "../../api/axios";

function DdaySettingForm({ user, onUpdated }) {
  const [enlistDate, setEnlistDate] = useState("");
  const [serviceDays, setServiceDays] = useState("");

  // 기존 정보 불러오기
  useEffect(() => {
    if (user) {
      setEnlistDate(user.enlistDate || "");
      setServiceDays(user.serviceDays || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        "/user/update",
        { enlistDate, serviceDays },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status === "success") {
        alert("전역 정보가 수정되었습니다.");
        onUpdated(res.data); // MainPage로 전달
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("수정 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="dday-card" style={{ padding: "20px" }}>
      <h3>전역 정보 수정</h3>

      <div className="form-group">
        <label>입대일</label>
        <input
          type="date"
          value={enlistDate}
          onChange={(e) => setEnlistDate(e.target.value)}
        />
      </div>

      <div className="form-group" style={{ marginTop: "10px" }}>
        <label>복무일수</label>
        <input
          type="number"
          value={serviceDays}
          onChange={(e) => setServiceDays(e.target.value)}
        />
      </div>

      <button
        className="save-btn"
        style={{ marginTop: "15px" }}
        onClick={handleSave}
      >
        저장하기
      </button>
    </div>
  );
}

export default DdaySettingForm;

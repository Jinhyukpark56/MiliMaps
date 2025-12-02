import React, { useState } from "react";
import "../../styles/DdaySettingForm.css";

function DdaySettingForm({ onSave }) {
  const [name, setName] = useState("");
  const [enlistDate, setEnlistDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !enlistDate || !dischargeDate) {
      alert("모든 항목을 입력해주세요!");
      return;
    }
    onSave({ name, enlistDate, dischargeDate });
  };

  return (
    <form className="dday-setting-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="date-inputs">
        <label>입대일</label>
        <input
          type="date"
          value={enlistDate}
          onChange={(e) => setEnlistDate(e.target.value)}
        />

        <label>전역일</label>
        <input
          type="date"
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
        />
      </div>

      <button type="submit" className="save-btn">
        설정 완료
      </button>
    </form>
  );
}

export default DdaySettingForm;

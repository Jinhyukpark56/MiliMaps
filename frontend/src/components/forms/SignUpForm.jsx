import React, { useState } from "react";
import api from "../../api/axios";

function SignUpForm({ onBackToLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    enlistDate: "",
    serviceDays: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    try {
      const res = await api.post("/user/signup", form);

      if (res.data.status === "error") {
        return alert(res.data.message);
      }

      alert("회원가입 완료되었습니다!");
      onBackToLogin();
    } catch (err) {
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <input className="input" name="email" placeholder="이메일" onChange={handleChange} />
        <input className="input" name="nickname" placeholder="닉네임" onChange={handleChange} />
        <input className="input" name="enlistDate" type="date" onChange={handleChange} />
        <input className="input" name="serviceDays" placeholder="복무일수" onChange={handleChange} />
        <input className="input" name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
        <input className="input" name="confirmPassword" type="password" placeholder="비밀번호 확인" onChange={handleChange} />

        <button className="btn-primary" type="submit">회원가입</button>
      </form>

      <div className="text-center mt-m">
        <span className="text-link" onClick={onBackToLogin}>로그인으로 돌아가기</span>
      </div>
    </div>
  );
}

export default SignUpForm;

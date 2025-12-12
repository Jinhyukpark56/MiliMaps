import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function LoginForm({ onSignUpClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return alert("이메일과 비밀번호를 입력해주세요.");

    try {
      const res = await api.post("/user/login", { email, password });

      if (res.data.status === "error") return alert(res.data.message);

      localStorage.setItem("token", res.data.token);
      navigate("/main");

    } catch (err) {
      alert("로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input className="input" type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="btn-primary" type="submit">로그인</button>
      </form>

      <div className="text-center mt-m" style={{ fontSize: "0.9rem" }}>
        <span style={{ cursor: "pointer", color: "var(--green)" }}>비밀번호 찾기</span>
        <span style={{ margin: "0 10px", color: "#ccc" }}>|</span>
        <span style={{ cursor: "pointer", color: "var(--green)" }} onClick={onSignUpClick}>회원가입</span>
      </div>
    </div>
  );
}

export default LoginForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/LoginForm.css";

function LoginForm({ onSignUpClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      window.alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await api.post("/user/login", {
        email,
        password,
      });

      if (res.data.status === "error") {
        window.alert(res.data.message);
        return;
      }

      // JWT 저장
      localStorage.setItem("token", res.data.token);

      // 로그인 성공 → 메인 이동
      navigate("/main");
    } catch (err) {
      console.log(err);
      window.alert("로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="login-card">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>

      <div className="login-links">
        <span className="link">비밀번호 찾기</span>
        <span className="divider">|</span>
        <span className="link" onClick={onSignUpClick}>
          회원가입
        </span>
      </div>
    </div>
  );
}

export default LoginForm;

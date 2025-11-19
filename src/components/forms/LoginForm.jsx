import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      window.alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    // 백엔드 연결 전이므로 임시로 바로 메인 페이지 이동
    navigate("/main");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
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
        <span className="link" onClick={handleSignUpClick}>
          회원가입
        </span>
      </div>
    </div>
  );
}

export default LoginForm;

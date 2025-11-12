import React, { useState } from "react";
import "../../styles/LoginForm.css";

function LoginForm({ onSignUpClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`이메일: ${email}\n비밀번호: ${password}`);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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

      <div className="login-links">
        <span className="link">비밀번호 찾기</span>
        <span className="divider">|</span>
        <span className="link" onClick={onSignUpClick}>
          회원가입
        </span>
      </div>
    </form>
  );
}

export default LoginForm;

import React, { useState } from "react";
import "../../styles/LoginForm.css"; // 기존 스타일 재사용

function SignUpForm({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    alert(`회원가입 완료!\n이메일: ${email}`);
    onBackToLogin(); // 로그인 폼으로 돌아가기
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">회원가입</button>

      <div className="login-links">
        <span className="link" onClick={onBackToLogin}>
          로그인으로 돌아가기
        </span>
      </div>
    </form>
  );
}

export default SignUpForm;

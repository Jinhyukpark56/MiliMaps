import React, { useState } from "react";
import axios from "axios";
import "../../styles/LoginForm.css"; // 로그인 CSS 그대로 재사용

function SignUpForm({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [enlistDate, setEnlistDate] = useState("");
  const [serviceDays, setServiceDays] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/user/signup", {
        email,
        password,
        nickname,
        enlistDate,
        serviceDays,
      });

      if (res.data.status === "error") {
        alert(res.data.message);
        return;
      }

      alert("회원가입 완료되었습니다!");
      onBackToLogin();

    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다.");
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
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <input
          type="date"
          value={enlistDate}
          onChange={(e) => setEnlistDate(e.target.value)}
        />

        <input
          type="number"
          placeholder="복무일수 (예: 545)"
          value={serviceDays}
          onChange={(e) => setServiceDays(e.target.value)}
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
      </form>

      <div className="login-links">
        <span
          className="link"
          onClick={() => {
            onBackToLogin && onBackToLogin();
          }}
        >
          로그인으로 돌아가기
        </span>
      </div>
    </div>
  );
}

export default SignUpForm;

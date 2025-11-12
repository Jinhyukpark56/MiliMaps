import React, { useState } from "react";
import "../styles/LoginPage.css"; // 스타일 분리
import LoginForm from "../components/forms/LoginForm";
import SignUpForm from "../components/forms/SignUpForm";

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="app-frame">
      <div className="form-wrapper">
        {!isSignUp ? (
          <LoginForm onSignUpClick={() => setIsSignUp(true)} />
        ) : (
          <SignUpForm onBackToLogin={() => setIsSignUp(false)} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;

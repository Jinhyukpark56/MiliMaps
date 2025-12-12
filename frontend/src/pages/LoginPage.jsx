import React, { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import SignUpForm from "../components/forms/SignUpForm";
import "../styles/theme.css";
import "../styles/login.css";

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="app-frame">
      <div style={{ width: "100%", maxWidth: "400px", margin: "auto" }}>
        {isSignUp ? (
          <SignUpForm onBackToLogin={() => setIsSignUp(false)} />
        ) : (
          <LoginForm onSignUpClick={() => setIsSignUp(true)} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;

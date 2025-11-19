import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/variables.css"; // 색상 변수
import "./styles/global.css"; // 공통 레이아웃 스타일

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

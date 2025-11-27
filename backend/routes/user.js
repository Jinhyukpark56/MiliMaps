require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// ========== 전역일 계산 함수 ==========
function calcDischargeDate(enlistDate, serviceDays) {
  const date = new Date(enlistDate);
  date.setDate(date.getDate() + serviceDays);
  return date.toISOString().split("T")[0];
}

// ========== 회원가입 ==========
router.post("/signup", async (req, res) => {
  const { email, password, nickname, enlistDate, serviceDays } = req.body;

  try {
    const [exist] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (exist.length > 0) {
      return res.json({
        status: "error",
        message: "이미 존재하는 이메일입니다",
      });
    }

    // 비밀번호 해싱
    const hashed = await bcrypt.hash(password, 10);

    // 전역일 계산
    const dischargeDate = calcDischargeDate(enlistDate, serviceDays);

    await pool.query(
      "INSERT INTO user (email, password, nickname, enlistDate, serviceDays, dischargeDate) VALUES (?, ?, ?, ?, ?, ?)",
      [email, hashed, nickname, enlistDate, serviceDays, dischargeDate]
    );

    res.json({ status: "success", message: "회원가입 완료" });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", message: "서버 오류" });
  }
});

// ========== 로그인 ==========
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.json({
        status: "error",
        message: "존재하지 않는 이메일입니다",
      });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ status: "error", message: "비밀번호가 틀렸습니다" });
    }

    // 토큰 발급
    const token = jwt.sign(
      { id: user.userId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      status: "success",
      token,
      nickname: user.nickname,
      dischargeDate: user.dischargeDate,
    });

  } catch (err) {
    console.error(err);
    res.json({ status: "error", message: "서버 오류" });
  }
});

// ========== JWT 인증 후 유저 정보 조회 ==========
router.get("/me", async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.json({ status: "error", message: "토큰 없음" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const [rows] = await pool.query(
      "SELECT * FROM user WHERE userid = ?",
      [decoded.id]
    );

    res.json({ status: "success", user: rows[0] });

  } catch (err) {
    res.json({ status: "error", message: "토큰 오류" });
  }
});

module.exports = router;

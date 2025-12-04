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
    // 이메일 중복 체크
    const [exist] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (exist.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "이미 존재하는 이메일입니다",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const dischargeDate = calcDischargeDate(enlistDate, serviceDays);

    await pool.query(
      "INSERT INTO user (email, password, nickname, enlistDate, serviceDays, dischargeDate) VALUES (?, ?, ?, ?, ?, ?)",
      [email, hashed, nickname, enlistDate, serviceDays, dischargeDate]
    );

    return res.json({
      status: "success",
      message: "회원가입 완료",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "서버 오류",
    });
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
      return res.status(400).json({
        status: "error",
        message: "존재하지 않는 이메일입니다",
      });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        status: "error",
        message: "비밀번호가 틀렸습니다",
      });
    }

    // 토큰 발급 (DB 컬럼 userId 기준)
    const token = jwt.sign(
      { id: user.userId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      status: "success",
      token,
      nickname: user.nickname,
      dischargeDate: user.dischargeDate,
      role: user.role,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "서버 오류",
    });
  }
});

// ========== JWT 인증 후 유저 정보 조회 ==========
router.get("/me", async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "토큰 없음",
    });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const [rows] = await pool.query(
      `
  SELECT userId, email, nickname, role, enlistDate, serviceDays, dischargeDate
  FROM user
  WHERE userId = ?
  `,
      [decoded.id]
    );


    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "유저를 찾을 수 없습니다",
      });
    }

    return res.json({
      status: "success",
      user: rows[0],
    });

  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "토큰 오류",
    });
  }
});

module.exports = router;

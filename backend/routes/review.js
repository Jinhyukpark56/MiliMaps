require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// ========== JWT 인증 미들웨어 ==========
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ status: "error", message: "토큰 없음" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;  // 로그인한 유저 ID 저장
    next();
  } catch (err) {
    return res.json({ status: "error", message: "토큰 오류" });
  }
}

// ========== 리뷰 작성 (POST /review) ==========
router.post("/", auth, async (req, res) => {
  const { placeId, rating, comment } = req.body;

  if (!placeId || !rating) {
    return res.json({
      status: "error",
      message: "placeId와 rating은 필수입니다"
    });
  }

  try {
    await pool.query(
      "INSERT INTO review (placeId, userId, rating, comment) VALUES (?, ?, ?, ?)",
      [placeId, req.userId, rating, comment]
    );

    res.json({ status: "success", message: "리뷰 작성 완료" });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", message: "서버 오류" });
  }
});

module.exports = router;

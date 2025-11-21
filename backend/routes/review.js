const express = require("express");
const router = express.Router();
const pool = require("../db");

// 리뷰 작성
router.post("/create", async (req, res) => {
  const { placeId, userId, rating, comment } = req.body;

  try {
    await pool.query(
      "INSERT INTO review (placeId, userId, rating, comment) VALUES (?, ?, ?, ?)",
      [placeId, userId, rating, comment]
    );

    const [stats] = await pool.query(
      "SELECT AVG(rating) AS avgRating, COUNT(*) AS reviewCount FROM review WHERE placeId = ?",
      [placeId]
    );

    await pool.query(
      "UPDATE place SET avgRating = ?, reviewCount = ? WHERE placeId = ?",
      [stats[0].avgRating, stats[0].reviewCount, placeId]
    );

    res.json({ status: "success", message: "리뷰 등록 완료" });
  } catch (err) {
    console.error(err);
    res.json({ status: "error" });
  }
});

// 리뷰 목록
router.get("/list", async (req, res) => {
  const { placeId } = req.query;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM review WHERE placeId = ? ORDER BY createdAt DESC",
      [placeId]
    );

    res.json({ status: "success", reviews: rows });
  } catch (err) {
    console.error(err);
    res.json({ status: "error" });
  }
});

module.exports = router;

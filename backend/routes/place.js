const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/detail", async (req, res) => {
  const { placeId } = req.query;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM place WHERE placeId = ?",
      [placeId]
    );

    return res.json({
      status: "success",
      place: rows[0] || null
    });
  } catch (e) {
    return res.status(500).json({ status: "error" });
  }
});

module.exports = router;

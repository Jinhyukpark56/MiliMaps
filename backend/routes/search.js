require("dotenv").config();   // search.js에서도 확실하게 불러오기

const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { keyword } = req.query;

  try {
    const kakao = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_KEY}`
        }
      }
    );

    const result = kakao.data.documents.map((p) => ({
      placeId: p.id,
      name: p.place_name,
      lat: Number(p.y),
      lng: Number(p.x),
      address: p.address_name,
      category: p.category_group_name
    }));

    res.json({
      status: "success",
      places: result
    });
  } catch (err) {
    console.error("Kakao API Error:", err.response?.data || err.message);
    res.json({ status: "error" });
  }
});

module.exports = router;

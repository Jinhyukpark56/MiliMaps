require("dotenv").config();
console.log("KEY:", process.env.KAKAO_KEY);

const express = require("express");
const cors = require("cors");

const searchRouter = require("./routes/search");
const placeRouter = require("./routes/place");
const reviewRouter = require("./routes/review");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/search", searchRouter);
app.use("/place", placeRouter);
app.use("/review", reviewRouter);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const searchRouter = require("./routes/search");
const placeRouter = require("./routes/place");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

console.log("KAKAO KEY:", process.env.KAKAO_KEY);
console.log("JWT SECRET LOADED:", process.env.JWT_SECRET);

app.use("/api/search", searchRouter);
app.use("/api/place", placeRouter);
app.use("/api/review", reviewRouter);
app.use("/api/user", userRouter);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

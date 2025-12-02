require("dotenv").config();

const express = require("express");
const cors = require("cors");

const searchRouter = require("./routes/search");
const placeRouter = require("./routes/place");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

console.log("KAKAO KEY:", process.env.KAKAO_KEY);
console.log("JWT SECRET LOADED:", process.env.JWT_SECRET);

app.use("/search", searchRouter);
app.use("/place", placeRouter);
app.use("/review", reviewRouter);
app.use("/user", userRouter);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

app.use("/review", require("./routes/review"));

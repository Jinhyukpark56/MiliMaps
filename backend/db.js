const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "qwer1234",
  database: "kakaomap"
});

module.exports = pool;

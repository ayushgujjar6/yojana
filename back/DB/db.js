const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connectToInfinityFree = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};

const connectToLocalhost = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "governmentscheme",
  });
};

let db = connectToInfinityFree();

db.connect((err) => {
  if (err) {
    console.error("InfinityFree DB failed! Switching to localhost...",err);
    db = connectToLocalhost();
    db.connect((localErr) => {
      if (localErr) {
        console.error("Localhost DB also failed!", localErr);
      } else {
        console.log("Connected to Localhost MySQL!");
      }
    });
  } else {
    console.log("Connected to InfinityFree MySQL!");
  }
});

// API Route
module.exports = (req, res) => {
  res.json({ message: "API is working!", database: process.env.DB_NAME });
};

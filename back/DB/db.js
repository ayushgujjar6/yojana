const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Function to connect to InfinityFree MySQL
const connectToInfinityFree = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};

// Function to connect to Localhost MySQL
const connectToLocalhost = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "governmentscheme",
  });
};

let db = connectToInfinityFree();

// Try connecting to InfinityFree first
db.connect((err) => {
  if (err) {
    console.error("InfinityFree DB failed! Switching to localhost...");

    // Try connecting to localhost
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

module.exports = db;

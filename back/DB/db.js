const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Check if env variables are loaded correctly
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error("Missing database environment variables! Check your .env file.");
  process.exit(1);
}


console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);


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
    console.error("InfinityFree DB failed! Switching to localhost...", err);
    db = connectToLocalhost();
    db.connect((localErr) => {
      if (localErr) {
        console.error("Localhost DB also failed!", localErr);
        process.exit(1); // Exit if both DBs fail
      } else {
        console.log("Connected to Localhost MySQL!");
      }
    });
  } else {
    console.log("Connected to InfinityFree MySQL!");
  }
});

// Export database connection
module.exports = db;

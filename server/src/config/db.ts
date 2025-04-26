const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "ventry",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "ventry_auth",
  password: process.env.DB_PASSWORD || "securepassword",
  port: parseInt(process.env.DB_PORT || "5432"),
});

// Function to test the connection
const checkDbConnection = async () => {
  try {
    // Attempt to connect to the database
    const client = await pool.connect();
    console.log("Connected to the database successfully!");

    // Release the client after checking the connection
    client.release();
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
};

// Call the function to check if the database is connected
checkDbConnection();

export default pool;

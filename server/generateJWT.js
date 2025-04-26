const jwt = require("jsonwebtoken");

// Payload data (example)
const payload = {
  userId: 1,
  email: "user@example.com",
};

// Secret key for signing the JWT
const secretKey = "your_jwt_secret";

// Generate JWT token
const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

console.log("Generated JWT:", token);

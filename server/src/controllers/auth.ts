import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";

interface User {
  id: number;
  email: string;
  password_hash: string;
}

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const { rows } = (await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ])) as { rows: User[] };

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured.");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ error: "An unexpected error occurred during login." });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, accessCode } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }

    // Check access code if invite-only
    if (process.env.INVITE_ONLY === "false") {
      const validCode = await checkAccessCode(accessCode);
      if (!validCode) {
        return res
          .status(403)
          .json({ error: "Invalid or expired access code." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = (await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    )) as { rows: User[] };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured.");
    }

    const newUser = rows[0];
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "Registration successful.",
      token,
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res
      .status(500)
      .json({ error: "An unexpected error occurred during registration." });
  }
};

async function checkAccessCode(code: string): Promise<boolean> {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM access_codes WHERE code = $1 AND is_used = false",
      [code]
    );
    return rows.length > 0;
  } catch (err) {
    console.error("Access code validation error:", err);
    return false;
  }
}

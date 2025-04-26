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
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, accessCode } = req.body;

  // Check access code if invite-only
  if (process.env.INVITE_ONLY === "true") {
    const validCode = await checkAccessCode(accessCode);
    if (!validCode) {
      return res.status(403).json({ error: "Invalid access code" });
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = (await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    )) as { rows: User[] };

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    const newUser = rows[0];
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      token,
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
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
    console.error(err);
    return false;
  }
}

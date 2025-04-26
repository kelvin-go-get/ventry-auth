import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import nodemailer from "nodemailer";
import crypto from "crypto";
interface User {
  id: number;
  email: string;
  password_hash: string;
}

interface AccessCode {
  id: number;
  code: string;
  email: string;
  is_used: boolean;
  created_at: Date;
  expires_at: Date;
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

// ACCESS CODE REQUEST HANDLER
export const requestAccessCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Generate 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save to database
    await pool.query(
      `INSERT INTO access_codes (code, email, expires_at)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) 
       DO UPDATE SET code = $1, expires_at = $3, is_used = false`,
      [code, email, expiresAt]
    );

    // Send email
    await sendAccessCodeEmail(email, code);

    return res.json({
      message: "Access code sent to email",
      // In production, don't send the code back!
      code: process.env.NODE_ENV === "development" ? code : undefined,
    });
  } catch (error) {
    console.error("Access code error:", error);
    return res.status(500).json({ error: "Failed to send access code" });
  }
};

// UPDATED REGISTRATION FUNCTION
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, accessCode } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Check existing user
    const userExists = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Verify access code if in invite-only mode
    if (process.env.INVITE_ONLY === "true") {
      if (!accessCode) {
        return res.status(400).json({ error: "Access code required" });
      }

      const validCode = await pool.query(
        `SELECT id FROM access_codes 
         WHERE email = $1 
         AND code = $2 
         AND is_used = false 
         AND expires_at > NOW()`,
        [email, accessCode]
      );

      if (validCode.rows.length === 0) {
        return res
          .status(403)
          .json({ error: "Invalid or expired access code" });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Start transaction
    await pool.query("BEGIN");

    try {
      // Create user
      const newUser = await pool.query(
        `INSERT INTO users (email, password_hash)
         VALUES ($1, $2)
         RETURNING id, email`,
        [email, hashedPassword]
      );

      // Mark code as used
      if (process.env.INVITE_ONLY === "true") {
        await pool.query(
          `UPDATE access_codes
           SET is_used = true
           WHERE email = $1 AND code = $2`,
          [email, accessCode]
        );
      }

      // Generate JWT
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET missing");
      }

      const token = jwt.sign(
        { userId: newUser.rows[0].id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.JWT_EXPIRATION
            ? parseInt(process.env.JWT_EXPIRATION, 10) || "1h"
            : "1h",
        }
      );

      // Commit transaction
      await pool.query("COMMIT");

      return res.status(201).json({
        token,
        user: {
          id: newUser.rows[0].id,
          email: newUser.rows[0].email,
        },
      });
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      error: "Registration failed",
      details:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : String(error)
          : undefined,
    });
  }
};

// EMAIL SENDING FUNCTION
const sendAccessCodeEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: email,
    subject: "Your Access Code",
    html: `
      <div>
        <h2>Your Registration Code</h2>
        <p>Here's your access code:</p>
        <h3>${code}</h3>
        <p>This code will expire in 24 hours.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
};

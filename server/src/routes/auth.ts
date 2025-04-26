import express, { Router, Request, Response } from "express";
import {
  loginUser,
  registerUser,
  requestAccessCode,
} from "../controllers/auth";

const router: Router = express.Router();

// Request Access Code
router.post("/request-code", async (req: Request, res: Response) => {
  try {
    await requestAccessCode(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/register", async (req: Request, res: Response) => {
  await registerUser(req, res);
});

export default router;

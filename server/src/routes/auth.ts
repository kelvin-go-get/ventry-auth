import express, { Router, Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/auth";

const router: Router = express.Router();

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

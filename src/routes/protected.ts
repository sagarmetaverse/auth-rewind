import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";

const protectRoutes = Router();

protectRoutes.use(authMiddleware);

protectRoutes.get("/profile", (req, res) => {
  const user = (req as any).user;
  res.json({ message: `Hello user ${user.userId}` });
});

export default protectRoutes;
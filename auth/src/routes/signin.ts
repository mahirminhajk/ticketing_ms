import { Router } from "express";

const router = Router();

router.get("/users/signin", (req, res) => {
  res.send("hi");
});

export default router;

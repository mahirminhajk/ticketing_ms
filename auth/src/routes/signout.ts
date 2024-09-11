import { Router } from "express";

const router = Router();

router.get("/users/signout", (req, res) => {
  res.send("hi");
});

export default router;

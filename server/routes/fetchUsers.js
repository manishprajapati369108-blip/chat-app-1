import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/users/search", async (req, res) => {
  try {
    const search = req.query.q;

    const results = await User.find({
      _id: { $ne: req.user._id },
      name: { $regex: search, $options: "i" },
    }).limit(10);

    res.json(results);
  } catch (error) {
    console.log(error);
    res.json({
      error: "server problem",
    });
  }
});

export default router;

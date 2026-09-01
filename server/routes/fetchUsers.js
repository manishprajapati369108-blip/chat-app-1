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

router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if( !user) {
      return res.status(404).json({
        error: 'User not Found'
      })
    }

    res.json(user)
   
  } catch (error) {
    console.error("server problem", error);
    res.status(500).json({
      error: "server problem",
    })
  }
});



export default router;

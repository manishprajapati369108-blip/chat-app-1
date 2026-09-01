import express from "express";
import Conversation from "../models/Conversation.js";

const router = express.Router();

router.post("/direct/:userId", async (req, res) => {
  try {
    const anotherUser = req.params.userId;
    const currentUser = req.user._id;
    const directKey = [currentUser, anotherUser].sort().join("_");

    let prevConv = await Conversation.findOne({
      type: "direct",
      participants: {
        $all: [currentUser, anotherUser],
      },
      directKey,
    });

    if (!prevConv) {
        prevConv = await Conversation.create({
            type: "direct",
            participants: {
                $addToSet : [currentUser, anotherUser]
            },
            directKey
        })
    }
    
    res.json(prevConv);
   
  } catch (error) {
    console.error("Server failed", error);
    res.json(500).json({
      error: "Server failed",
    });
  }
});

export default router;

import express from "express";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

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
        participants: [currentUser, anotherUser],
        directKey,
      });
    }

    res.json(prevConv);
  } catch (error) {
    console.error("Server failed", error);
    res.status(500).json({
      error: "Server failed",
    });
  }
});

router.get("/messages/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversation: conversationId,
    })
      .populate("sender", "name")
      .sort({
        createdAt: 1,
      });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
});

router.delete("/delete-all/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;

    await Message.deleteMany({
      conversation: conversationId,
    });

    await Conversation.findByIdAndDelete(conversationId);

    res.status(200).json({
      message: "conversation deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Conversation delete failed",
    });
  }
});

router.get("/my-conversation", async (req, res) => {
  try {
    const userId = req.user._id;
    const results = await Conversation.find({
      participants: { $in: [userId] },
    }).populate("lastMessage")
      .populate("participants", "name avatar")
      .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      result: results,
    });
  } catch (error) {
    console.error("server error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;

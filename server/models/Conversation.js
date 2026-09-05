import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["direct", "group"],
      required: true,
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    directKey: {
      type: String,
      unique: true,
      sparse: true,
    },

    name: {
      type: String,
      trim: true,
    },

    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    unreadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

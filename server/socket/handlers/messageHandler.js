import Message from "../../models/Message.js";
const messageHandler = (socket, io) => {
  socket.on("joinRoom", (conversationId) => {
    try {
      socket.join(conversationId);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("sendMessage", async (data, callback) => {
    try {
      const { conversationId, content } = data;

      if (!conversationId) {
        return callback?.({
          error: "Conversation ID is required",
        });
      }

      if (!content?.trim()) {
        return callback?.({
          error: "Message cannot be empty",
        });
      }

      const message = await Message.create({
        conversation: conversationId,
        content: content,
        sender: socket.user._id,
      });

      await message.populate("sender", "name email");

      console.log(message);

      io.to(conversationId).emit("newMessage", message);

      callback?.({
        success: true,
      });
    } catch (error) {
      console.error(error);
      callback?.({
        error: error.message,
      });
    }
  });

  socket.on("leaveRoom", (conversationId) => {
    socket.leave(conversationId);
    console.log(`${conversationId} is leaved by ${socket.user.name} `);
  });
};
export default messageHandler;

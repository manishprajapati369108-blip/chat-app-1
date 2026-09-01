import Message from "../../models/Message.js";
const messageHandler = (socket, io) => {
  socket.on("joinRoom", (conversationId) => {
    try {
      socket.join(conversationId);
      console.log("user joined room:", conversationId);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("sendMessage", async (data) => {
    try {
      const conversationId = data.conversationId;
      const content = data.content;

      const message = await Message.create({
        conversation: conversationId,
        content: content,
        sender: socket.user._id,
      });

      io.to(conversationId).emit("newMessage", message);
    } catch (error) {
      console.error(error);
    }
  });
};
export default messageHandler;

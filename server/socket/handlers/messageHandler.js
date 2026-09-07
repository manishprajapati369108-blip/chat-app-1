import Message from "../../models/Message.js";
import Conversation from "../../models/Conversation.js";

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

      await Conversation.findByIdAndUpdate(conversationId, {
         lastMessage: message._id,
      });

      await message.populate("sender", "name email");

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

  socket.on("typing",  (conversationId) => {
   
    
    //here socket is me whcih means  i am sending  to others in the conversation but not me . io means in room that all socket also me
    socket.to(conversationId).emit("typing", { 
      userId : socket.user._id,
    name: socket.user.name});
  });

  socket.on("stopTyping",  (conversationId) => {
  
    socket.to(conversationId).emit("stopTyping", {
      userId : socket.user._id,
    });
  });

  socket.on("leaveRoom", (conversationId) => {
    socket.leave(conversationId);
    console.log(`${conversationId} is leaved by ${socket.user.name} `);
  });
};
export default messageHandler;

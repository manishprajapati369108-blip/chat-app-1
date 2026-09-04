import api from "../utils/axios";
import socket from "../socket/socket.jsx";

export const joinConversation = async(userId) => {
  try {
    const response = await api.post(`/conversation/direct/${userId}`)
    const conversationId = response.data._id;
    socket.emit("joinRoom", conversationId);
    return conversationId;
  } catch (error) {
    console.log(error);
  }
};

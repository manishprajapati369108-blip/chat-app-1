import api from "../utils/axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useContext.jsx";
import CommentIcon from "@mui/icons-material/Comment";
import { joinConversation } from "../services/joinRoom.js";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket.jsx";

// for direct chat
const PrevCov = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  // FETCH CONVERSATIONS
  const fetchConversation = async () => {
    try {
      const response = await api.get("/conversation/my-conversation");

      setConversations(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH UNREAD COUNT
  const fetchCount = async () => {
    try {
      const response = await api.get("/conversation/unread-count");

      setCount(response?.data?.unreadCount || 0);
    } catch (error) {
      console.log(error);
    }
  };

  // INITIAL FETCH
  useEffect(() => {
    if (!currentUser) return;

    const loadData = async () => {
      await fetchConversation();
      await fetchCount();
    };

    loadData();
  }, [currentUser]);

  // NEW MESSAGE NOTIFICATION
  useEffect(() => {
    if (!currentUser) return;

    const userId = currentUser;
      //typeof currentUser === "object" ? currentUser._id : currentUser;

    // Join personal user room
    socket.emit("joinUserRoom", userId);

    const handleNewMessageNotification = () => {
      //console.log("New message notification received");

      fetchConversation();
      fetchCount();
    };

    socket.on("newMessageNotification", handleNewMessageNotification);

    return () => {
      socket.off("newMessageNotification", handleNewMessageNotification);
    };
  }, [currentUser]);

  // JOIN CONVERSATION ROOMS
  useEffect(() => {
    conversations.forEach((conversation) => {
      socket.emit("joinRoom", conversation._id);
    });
  }, [conversations]);

  const getOtherParticipants = (conversation) => {
    const currentUserId = currentUser
      //typeof currentUser === "object" ? currentUser._id : currentUser;

    return conversation.participants.find((p) => p._id !== currentUserId);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-6">
      {conversations.map((conversation) => {
        const otherUser = getOtherParticipants(conversation);

        if (!otherUser) return null;

        return (
          <div
            key={conversation._id}
            className="flex items-center w-full max-w-2xl gap-5 px-5 py-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
          >
            <img
              src={otherUser.avatar}
              className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
              alt={otherUser.name}
            />

            <div className="flex flex-col justify-center min-w-0 flex-1">
              <p className="font-[Nunito] font-bold text-[18px] text-gray-800 truncate">
                {otherUser.name}
              </p>

              <p className="w-full text-[15px] font-[Nunito] text-[#5068e0] truncate mt-1">
                {conversation.lastMessage?.content ?? "No Message"}
              </p>
            </div>

            <div className="flex flex-row gap-3 items-center shrink-0">
              {count > 0 && (
                <div className="bg-green-400 text-white text-sm font-semibold min-w-6 h-6 px-2 flex items-center justify-center rounded-full shadow-sm">
                  {count}
                </div>
              )}

              <CommentIcon
                className="text-blue-400 cursor-pointer w-6 h-6 hover:text-blue-600 hover:scale-110 transition-all duration-200"
                onClick={async () => {
                  const conversationId = await joinConversation(otherUser._id);

                  navigate(`/chat/${otherUser._id}/${conversationId}`);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrevCov;

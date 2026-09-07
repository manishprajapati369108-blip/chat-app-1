import api from "../utils/axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useContext.jsx";
import CommentIcon from "@mui/icons-material/Comment";
import { joinConversation } from "../services/joinRoom.js";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket.jsx";

//for direct chat
const PrevCov = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    conversations.forEach((conversation) => {
     socket.emit("joinRoom", conversation._id);
    });

    const handleNewMessage = async (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversations]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await api.get("/conversation/my-conversation");

        setConversations(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversation();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await api.get("conversation/unread-count");

        setCount(response?.data?.unreadCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCount();
  }, [messages]);

   useEffect(() => {
    if (!conversations.length) return;

    conversations.forEach((conversation) => {
      socket.emit("joinRoom", conversation._id);
    });
  }, [conversations]);

  

  const getOtherParticipants = (conversation) => {
    return conversation.participants.find((p) => p._id !== currentUser);
  };

  return (
    <div className="flex flex-col items-center w-screen -ml-5 ">
      {conversations.map((conversation) => {
        const otherUser = getOtherParticipants(conversation);

        return (
          <div
            key={conversation._id}
            className="flex items-center w-full gap-25 mt-10 px-15 justify-center"
          >
            <img src={otherUser.avatar} className="w-15 h-15 rounded-3xl" />

            <div className="flex flex-col justify-center -ml-20">
              <p className=" font-[Nunito] font-bold text-[20px]">
                {otherUser.name}
              </p>

              <p className=" w-45 text-[16px] font-[Nunito] text-[#5068e0] bold truncate ">
                {conversation.lastMessage?.content ?? "No Message"}
              </p>
            </div>

            <div className="flex flex-row gap-7 items-center">
              {count > 0 && (
                <div className="bg-green-400 p-1 pl-3 pr-3 rounded-4xl">
                  {count}{" "}
                </div>
              )}

              <CommentIcon
                className="text-blue-400 ml-auto cursor-pointer"
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

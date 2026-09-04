import api from "../utils/axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useContext.jsx";
import CommentIcon from "@mui/icons-material/Comment";
import { joinConversation } from "../services/joinRoom.js";
import { useNavigate } from "react-router-dom";

const PrevCov = () => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();
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

  const getOtherParticipants = (conversation) => {
    return conversation.participants.find((p) => p._id !== currentUser);
  };

  return (
    <div className="flex justify-center items-center ">
      {conversations.map((conversation) => {
        const otherUser = getOtherParticipants(conversation);
        return (
          <div
            key={conversation._id}
            className="flex flex-row items-center justify-center w-screen"
          >
            <img src={otherUser.avatar} className="w-10 h-10 rounded" />
            <p className="ml-5 font-[Nunito] font-bold">{otherUser.name}</p>

            <CommentIcon
            className="text-blue-400 ml-auto  mr-20"
              onClick={async () => {
                const conversationId = await joinConversation(otherUser._id);
                navigate(`/chat/${otherUser._id}/${conversationId}`);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PrevCov;

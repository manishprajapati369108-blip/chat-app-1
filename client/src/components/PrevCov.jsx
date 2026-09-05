import api from "../utils/axios";
import { useEffect, useState } from "react";
import { useAuth} from "../contexts/useContext.jsx";
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
    <div className="flex flex-col items-center w-screen ">
      {conversations.map((conversation) => {
        const otherUser = getOtherParticipants(conversation);
        return (
          <div
            key={conversation._id}
            className="flex items-center w-full gap-35 mt-10 px-10"
          >
            <img src={otherUser.avatar} className="w-10 h-10 rounded" />

            <div>
            <p className="-ml-25 font-[Nunito] font-bold">{otherUser.name}</p>
            </div>
            <CommentIcon
            className="text-blue-400 ml-auto cursor-pointer"
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

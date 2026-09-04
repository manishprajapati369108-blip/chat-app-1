import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios.js";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import socket from "../socket/socket.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const ChatHeader = () => {
  const { userId, conversationId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`api/users/${userId}`);

        setUser(response.data);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId,]);

  const handleLeaveRoom = async () => {
    socket.emit("leaveRoom", conversationId);
    navigate("/");
  };

  const deleteConversation = async () => {
    try {
      await api.delete(`conversation/delete-all/${conversationId}`);

      navigate("/");
    } catch (error) {
      console.error("Delete conversation error:", error);
    }
  };

  return (
    <div className="font-[Nunito] flex flex-row items-center gap-5 mt-3 ml-3">
      <img src={user?.avatar} alt="User" className="w-10 rounded-4xl" />
      <p className="font-bold">{user?.name}</p>
      <DeleteForeverIcon
        className="ml-auto -mr-60"
        onClick={deleteConversation}
      />
      <ExitToAppSharpIcon className="ml-auto mr-10" onClick={handleLeaveRoom} />
    </div>
  );
};

export default ChatHeader;

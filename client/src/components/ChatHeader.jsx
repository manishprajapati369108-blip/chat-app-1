import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios.js";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import socket from "../socket/socket.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ChatHeader = () => {
  const { userId, conversationId } = useParams();
  const [user, setUser] = useState(null);
  const [typers, setTypers] = useState([]);
  const navigate = useNavigate();

  //typing effect

  useEffect(() => {
    const handleTyping = (data) => {
      setTypers((prev) => {
         const isExist = prev.some(
          (typer) => typer.userId === data.userId )

         if(isExist) {
          return prev;
         }

         return [...prev, data]
      })

    };

    const handleStopTyping = ({userId}) => {

      setTypers((prev) => prev.filter((typer) => typer.userId !== userId) )

    };

    socket.on("typing", handleTyping);

    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  });

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
  }, [userId]);

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
    <div className="font-[Nunito] flex flex-row items-center gap-5 p-5 border">
      <img src={user?.avatar} alt="User" className="w-10 rounded-4xl" />
      <div className="flex flex-col">
         <p className="font-bold text-[18px] mb-2">{user?.name}</p>
      {typers.length > 0 && (
        <div className="text-[12px] -mt-3">
          {typers.map((typer) => typer.name).join(", ")} is typing ...
        </div>
      )}
      </div>
      <div className=" ml-auto flex items-center gap-10 ">
      <DeleteForeverIcon
        className=""
        onClick={deleteConversation}
      />
      <ExitToAppSharpIcon className="ml-auto mr-10" onClick={handleLeaveRoom} />
      </div>
    </div>
  );
};

export default ChatHeader;

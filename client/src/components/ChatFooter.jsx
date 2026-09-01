import socket from "../socket/socket.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
const ChatFooter = () => {
  const [message, setMessage] = useState("");
  const { conversationId } = useParams();
  const data = {
    conversationId,
    content: message,
  };

  const handleSend = async () => {
    if(!message.trim) return;
    socket.emit("sendMessage", data, (response) => {
      if (response?.error) {
        console.log(response.error);
        return;
      }

      setMessage("");
    });
  };
  return (
    <div className="flex">
      <textarea
        className=" w-100 min-h-10 max-h-40 resize-none overflow-y-auto wrap-break whitespace-pre-wrap rounded-lg px-1 py-1 outline-none border "
        value={message}
        onChange={
          (e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
          setMessage( e.target.value);
        }}
        
      />
      <button className="ml-8" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default ChatFooter;

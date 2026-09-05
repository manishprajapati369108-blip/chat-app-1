import socket from "../socket/socket.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ChatFooter = () => {
  const [message, setMessage] = useState("");
  const { conversationId, userId } = useParams();

  const handleSend = async (e) => {
    const data = {
      conversationId,
      content: message.trim(),
    };

    if (!message.trim() || !conversationId) return;

    socket.emit("sendMessage", data, (response) => {
      if (response?.error) {
        console.log(response.error);
        return;
      }
    });
    setMessage("");
  };

  useEffect(() => {
    if (!message.trim()) {
      socket.emit("stopTyping", conversationId);
      return;
    }

    socket.emit("typing", conversationId);

    const timer = setTimeout(() => {
      socket.emit("stopTyping", conversationId);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, userId, conversationId]);

  const handleKeyDown =  async(e) => {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSend();
    }
  };

  return (
    <div className="flex">
      <textarea
        className=" w-full min-h-10 max-h-40 resize-none overflow-y-auto wrap-break whitespace-pre-wrap rounded-lg px-1 py-1 outline-none border "
        value={message}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
          setMessage(e.target.value);
        }}
      />
      <button
        className="ml-4 bg-blue-400 w-20 h-13 rounded-3xl"
        onKeyDown={handleKeyDown}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatFooter;

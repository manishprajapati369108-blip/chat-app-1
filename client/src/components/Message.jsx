import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket.jsx";
import api from "../utils/axios.js";
import { useAuth } from "../contexts/useContext.jsx";

const Message = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const { currentUser } = useAuth();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await api.get(`conversation/messages/${conversationId}`);
      const data = res.data;
      setMessages(data);
    };
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;

    socket.emit("joinRoom", conversationId);
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversationId]);

  return (
    <div className="h-full overflow-y-auto p-3">
      {messages.map((message) => {
        const isMine = message.sender._id === currentUser;

        return (
          <div
            key={message._id}
            className={`mb-3 flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-3 py-2 ${
                isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {/* Message */}
              <div
                className={`${!expanded ? "line-clamp-5" : ""} break-words whitespace-pre-wrap`}
              >
                {message.content}
              </div>

              {message.content.length > 100 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-[#68e1f9] text-sm"
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
              {/* Sender name */}

              <div
                className={`mt-1 text-sm ${isMine ? "text-right text-[#78e2fdec] " : "text-gray-500 text-left"}
                `}
              >
                {isMine ? "You" : message.sender.name}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default Message;

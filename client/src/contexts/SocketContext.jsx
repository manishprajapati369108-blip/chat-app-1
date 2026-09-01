import { createContext } from "react";
import { useState } from "react";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);

  const value = {
    message,
    setMessage,
    conversationId,
    setConversationId,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

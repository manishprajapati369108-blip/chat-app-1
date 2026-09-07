import { createContext } from "react";
import { useState } from "react";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [lastMessage, setLastMessage] = useState("");

  const value = {
  lastMessage,
  setLastMessage
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

import { createContext } from "react";
import { useState } from "react";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [newMessage, setNewMessage] = useState([]);

  const value = {
  newMessage,
  setNewMessage
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

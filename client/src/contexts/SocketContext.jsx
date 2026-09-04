import { createContext } from "react";
import { useState } from "react";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [isMine, setIsMine] = useState(false);

  const value = {
    isMine,
    setIsMine
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

import { useEffect, useState } from "react";
import socket from "../socket/socket.jsx";

const Message = () => {
  const [messages, setMessages] = useState("")
  useEffect(() => {
    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      setMessages(message);
    });

    return () => {
      socket.off("newMessage");
    }
  }, []);
  return (
    <>
      <div className="mt-5">{messages}</div>
    </>
  );
};

export default Message;

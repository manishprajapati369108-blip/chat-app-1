import { useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import socket from "../socket/socket.jsx";
import api from "../utils/axios.js";

const Message = () => {
  const {conversationId} = useParams();
  const [messages, setMessages] = useState([]);
  //const messageRef = useRef(messages)

 useEffect(() => {
    const fetchMessages = async () => {
      const res = await api.get(`conversation/messages/${conversationId}`) ;
      const data = res.data;
      setMessages(data);
    }
     if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  useEffect(() => {
     console.log("✅ COMPONENT MOUNTED");
    const handleNewMessage = (message) => {
      console.log("🔥 NEW MESSAGE:", message);

      console.log("SOCKET MESSAGE:", message);
      console.log("New message received:", message);
      setMessages((prev) => [...prev, message]);
    };
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  


  return (
    <>
      <div className="mt-5">
        {messages.map((message) => (
          <div key={message._id} className="mb-2">
            {message.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default Message;

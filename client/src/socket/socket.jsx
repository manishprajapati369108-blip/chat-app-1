import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      setConnected(true);
    });

    socket.on("connect_error", (error) => {
      console.error(error.message);
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Chat</h1>

      {connected ? (
        <p>🟢 Connected</p>
      ) : (
        <p>🔴 Disconnected</p>
      )}
    </div>
  );
}

export default Chat;
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);

  socket.on("connect_error", (error) => {
  console.log("❌ Socket connection error:", error.message);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Socket disconnected:", reason);
});
});

export default socket;

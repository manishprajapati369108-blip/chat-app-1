import socketMiddleware from "../socket/middleware/socketMiddleware.js";
//import messageHandler from "./handlers/messageHandler.js";
//import groupHandler from "./handlers/messageHandler.js";
const setupSocket = (io) => {
  io.use(socketMiddleware);
  io.on("connection", (socket) => {
    console.log("🆔 User ID:", socket.user._id);
    //messageHandler(socket);
    //groupHandler(socket);
  });
};

export default setupSocket;

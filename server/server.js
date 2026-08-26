import connectDB from "./config/db.js";
import { Server } from "socket.io";
import app from "./app.js";
import http from "http";
import setupSocket from "./socket/index.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    credentials: true,
  },
});

setupSocket(io);

const start = async() => {

 try {
  await connectDB();
  server.listen(process.env.PORT, () => {
    console.log(`server is listening on ${process.env.PORT}`)
  })
 } catch (error) {
  console.error("Database Connection failed:" ,error)
 }
}

start();
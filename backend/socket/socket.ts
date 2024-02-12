import { Server } from "socket.io";
import http from "http";
import express, { Application } from "express";

export const app: Application = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

interface IUserSocketMap {
  [userId: string]: string; // Allows indexing with string keys
}
const userSocketMap: IUserSocketMap = {}; // {userId:socketId}

export const getReceiverId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId != undefined) userSocketMap[userId] = socket.id;
  // console.log(socket.handshake.query);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  io.on("disconnect", (socket) => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

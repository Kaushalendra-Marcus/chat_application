import { Server } from "socket.io"
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "https://cokkie-chat.onrender.com",
        methods: ["GET", "POST"],
        credentials : true
    }
})

// real time message
export const getReceiverSocketId = (receiverId)=>{
    return users[receiverId]
}

const users = {}
io.on("connection", (socket) => {
    console.log("New Client connected", socket.id);
    const userId = socket.handshake.query.userId;
    console.log("Users Id are..." , userId);
    
    if(userId){
        users[userId] = socket.id;
        console.log( "hello my users ....",users);
    }
    io.emit("getOnlineUsers",Object.keys(users))



// for disconnect
    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        delete users[userId]
        io.emit("getOnlineUsers",Object.keys(users))
    })
})

export { app, io, server }
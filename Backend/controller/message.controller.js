import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId } from "../SocketIO/server.js"
import { io } from '../SocketIO/server.js'
export const sendMessage = async (req, res) => {
    // console.log("message controller is working", req.params.id, req.body.message);
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        // const 
        const senderId = req.user._id // current logged in user
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        // await conversation.save()
        // await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json({ message: "Message sent successfully", newMessage })

    } catch (error) {
        console.log("Error in sending message" + error);
        res.status(500).json({ message: "Internal Server Error in message controller" })
    }
}

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user._id;

        // Find conversation between the two users
        const conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json({ messages: [] }); // Return empty if no chat exists
        }

        // Ensure messages are filtered correctly (both sent & received)
        const filteredMessages = conversation.messages.filter(msg => 
            (msg.senderId.equals(senderId) && msg.receiverId.equals(receiverId)) || 
            (msg.senderId.equals(receiverId) && msg.receiverId.equals(senderId))
        );

        res.status(200).json({ messages: filteredMessages });
    } catch (error) {
        console.error("Error in getMessage:", error);
        res.status(500).json({ messages: [] });
    }
};
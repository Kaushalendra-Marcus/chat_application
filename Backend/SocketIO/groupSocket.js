// import Group from '../models/group.model.js';
// import Message from '../models/message.model.js';

// export const setupGroupSockets = (io) => {
//     io.on('connection', (socket) => {
//         // Join group room
//         socket.on('joinGroup', (groupId) => {
//             socket.join(`group_${groupId}`);
//             console.log(`User joined group ${groupId}`);
//         });

//         // Leave group room
//         socket.on('leaveGroup', (groupId) => {
//             socket.leave(`group_${groupId}`);
//             console.log(`User left group ${groupId}`);
//         });

//         // Group message handler
//         socket.on('groupMessage', async (data) => {
//             try {
//                 const { groupId, content, senderId } = data;

//                 // Verify user is group member
//                 const group = await Group.findById(groupId);
//                 if (!group.members.includes(senderId)) {
//                     throw new Error('User not in group');
//                 }

//                 // Create and save message
//                 const message = await Message.create({
//                     content,
//                     sender: senderId,
//                     groupId,
//                     readBy: [senderId]
//                 });

//                 // Broadcast to group
//                 io.to(`group_${groupId}`).emit('newGroupMessage', message);

//             } catch (error) {
//                 console.error('Group message error:', error);
//                 socket.emit('groupMessageError', error.message);
//             }
//         });
//     });
// };
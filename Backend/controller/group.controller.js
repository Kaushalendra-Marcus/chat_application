// import Group from "../models/group.model.js";
// import Message from "../models/message.model.js";
// import User from "../models/user.model.js";

// export const createGroup = async (req, res) => {
//   try {
//     const { name, description, members } = req.body;
    
//     // Any authenticated user can create a group
//     const group = await Group.create({
//       name,
//       description,
//       admin: req.user._id,
//       members: [...new Set([...members, req.user._id])] // Ensure no duplicates
//     });

//     res.status(201).json({
//       success: true,
//       data: group
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// export const leaveGroup = async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.groupId);
    
//     if (!group) {
//       return res.status(404).json({
//         success: false,
//         error: 'Group not found'
//       });
//     }

//     // Check if user is in group
//     if (!group.members.includes(req.user._id)) {
//       return res.status(400).json({
//         success: false,
//         error: 'You are not a member of this group'
//       });
//     }

//     // If admin is leaving, assign new admin (first other member)
//     if (group.admin.toString() === req.user._id.toString()) {
//       const otherMembers = group.members.filter(m => m.toString() !== req.user._id.toString());
//       if (otherMembers.length > 0) {
//         group.admin = otherMembers[0];
//       } else {
//         // If no members left, delete group
//         await Message.deleteMany({ groupId: group._id });
//         await group.remove();
//         return res.status(200).json({
//           success: true,
//           data: { message: 'Group deleted as no members remain' }
//         });
//       }
//     }

//     // Remove user from members
//     group.members = group.members.filter(
//       member => member.toString() !== req.user._id.toString()
//     );
    
//     await group.save();

//     res.status(200).json({
//       success: true,
//       data: { message: 'Left group successfully' }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// export const updateGroupName = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const group = await Group.findById(req.params.groupId);

//     // Only admin can change name
//     if (group.admin.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         error: 'Only admin can change group name'
//       });
//     }

//     group.name = name;
//     await group.save();

//     res.status(200).json({
//       success: true,
//       data: group
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// export const removeMember = async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.groupId);

//     // Verify admin
//     if (group.admin.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         error: 'Only admin can remove members'
//       });
//     }

//     // Can't remove self (use leaveGroup instead)
//     if (req.params.userId === req.user._id.toString()) {
//       return res.status(400).json({
//         success: false,
//         error: 'Use leave group instead of removing yourself'
//       });
//     }

//     // Remove member
//     group.members = group.members.filter(
//       member => member.toString() !== req.params.userId
//     );
    
//     await group.save();

//     res.status(200).json({
//       success: true,
//       data: group
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// export const deleteGroup = async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.groupId);
    
//     if (!group) {
//       return res.status(404).json({
//         success: false,
//         error: 'Group not found'
//       });
//     }

//     // Check if requester is admin
//     if (group.admin.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         error: 'Only admin can delete the group'
//       });
//     }

//     // Delete all associated messages
//     await Message.deleteMany({ groupId: group._id });
    
//     // Delete group
//     await group.remove();

//     res.status(200).json({
//       success: true,
//       data: {}
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };
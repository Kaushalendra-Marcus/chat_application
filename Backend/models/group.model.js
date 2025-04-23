// import mongoose from 'mongoose'
// const groupSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         validate: {
//           validator: function (v) {
//             return /^[a-zA-Z0-9 ]+$/.test(v) && v.trim().split(/\s+/).length >= 1;
//           },
//           message: "Name must have at least 1 word (letters/numbers only, no special characters)."
//         }
//       },
      

//     description: {
//         type: String,
//         default: ''
//     },
//     admin: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     members: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     avatar: {
//         type: String,
//         default: ''
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// }, {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
// });

// // Add messages virtual population
// groupSchema.virtual('messages', {
//     ref: 'Message',
//     localField: '_id',
//     foreignField: 'groupId'
// });
// const Group = mongoose.model('Group', groupSchema);
// export default Group;


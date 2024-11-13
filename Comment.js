const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },  // Reference to the post
  username: { type: String, required: true },  // User who commented
  text: { type: String, required: true },      // Comment text
  createdAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model('Comment', commentSchema); 
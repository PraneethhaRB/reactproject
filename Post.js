const mongoose = require('mongoose');

// Define the schema for a post
const postSchema = new mongoose.Schema({
    content: String,
    media: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add this line
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: { type: Number, default: 0 }
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
require('dotenv').config();
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Save images to 'uploads' directory
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
    }
});
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Like = require('./models/Like');
const upload = multer({ storage: storage });
const app = express(); // Create an instance for signup
// const appLogin = express(); // Create an instance for login



const port = 5001; // Port for signup
// const PORT_LOGIN = process.env.PORT_LOGIN || 5001; // Port for login

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from this origin
}));

// appLogin.use(bodyParser.json());
// appLogin.use(cors({
//     origin: 'http://localhost:3000', // Allow requests only from this origin
// }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the uploads directory

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Signup route on signup server
app.post('/signup', async (req, res) => {
    const { name, schoolCode, mobileNumber, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
        return res.status(400).json({ message: 'Mobile number already exists' });
    }

    // Create new user (password will be hashed in the User model pre-save hook)
    const newUser = new User({ name, schoolCode, mobileNumber, password });

    try {
        await newUser.save();
        res.status(200).json({ message: 'Signup successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user to the database', error });
    }
});

// Login route on login server
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ 
                message: "Login successful!", 
                username: user.name 
            });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.post('/user/upload/:username', upload.single('profilePic'), async (req, res) => {
    const { username } = req.params;

    try {
        // Check if the file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Update the user's profilePic in the database
        const user = await User.findOneAndUpdate(
            { name: username },
            { profilePic: `/uploads/${req.file.filename}` }, // Save the relative path to the profilePic

            // Save the relative path to the profilePic
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile picture updated", profilePic: user.profilePic });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Add route to get user by name or username (assuming 'name' is a unique field)
app.get('/user/username/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ name: username });  // Find user by 'name'

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);  // Send user details if found
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add route to update user details
app.put('/user/update/:username', async (req, res) => {
    const { username } = req.params;
    const { name, schoolCode, mobileNumber, position, email } = req.body; // Accept these fields in the request

    try {
        // Find the user by username and update their details
        const updatedUser = await User.findOneAndUpdate(
            { name: username },
            { name, schoolCode, mobileNumber, position, email }, // Update the fields
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User details updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});  
// For posts-related routes, you should use one of your existing app instances
// Posts-related routes
app.get('/posts', async (req, res) => {
    try {
        // Find all posts and populate the 'user' field with username and profilePicture
        const posts = await Post.find().populate('user', 'name profilePic'); // Assuming 'name' is username and 'profilePic' is the image field
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

app.post('/posts', upload.single('media'), async (req, res) => {
    const { content, username } = req.body; // Get username from request body
    const media = req.file ? req.file.path : null;
  
    const newPost = new Post({ user: username, content, media }); // Save username here
    await newPost.save();
    res.json({ post: newPost });
  });  

// In your post comment route
// In your post comment route
app.post('/posts/:postId/comment', async (req, res) => {
    const { postId } = req.params;
    const { username, text } = req.body;

    // Validate the postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    // If postId is valid, continue with creating a new comment
    const newComment = new Comment({ postId, username, text });

    try {
        await newComment.save();

        // Push the new comment to the post's comments array
        await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({ message: 'Error saving comment', error: error.message });
    }
});



// Likes
app.post('/posts/:postId/like', async (req, res) => {
    const { postId } = req.params;
    const { username } = req.body;

    console.log(postId + " " + username);

    // Validate the postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    try {
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the post is already liked by the user
        const existingLike = await Like.findOne({ postId, username });
        if (existingLike) {
            return res.status(400).json({ message: 'Already liked' });
        }

        // Create a new like
        const newLike = new Like({ postId, username });
        await newLike.save();

        // Update the post's likes count
        post.likes += 1;
        await post.save();

        res.json({ message: 'Post liked', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


// Start the servers
app.listen(port,'0.0.0.0', () => {
    console.log(` server is running on http://localhost:${port}`);
});

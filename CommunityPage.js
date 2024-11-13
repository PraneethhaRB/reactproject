import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from './Assets/xbg.jpg'; // Your background image
import logo from './Assets/upload.gif'; // Upload icon

const defaultProfilePicture = 'https://via.placeholder.com/40';
const initialPosts = [
  {
    id: 1,
    username: 'John Doe',
    profilePicture: null,
    content: 'Hello, this is my first post!',
    timePosted: '2 hours ago',
    likes: 5,
    comments: [{ username: 'Jane Smith', text: 'Nice post!' }],
    media: null,
  },
];

function CommunityPage({ username }) {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMedia, setNewPostMedia] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState(username); // Set user from props or local storage

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/posts');
        const data = response.data;
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (username) {
      setUser(username);
      console.log('Logged in user:', username);
    } else {
      const loggedInUsername = localStorage.getItem('username');
      if (loggedInUsername) {
        setUser(loggedInUsername);
      }
    }

    fetchPosts();
  }, [username]);

  const handleNewPost = async () => {
    if (!user) {
      setError('User not logged in');
      return;
    }

    if (newPostContent.trim() === '') {
      setError('Post content cannot be empty');
      return;
    }

    const formData = new FormData();
    formData.append('content', newPostContent);
    if (newPostMedia) {
      formData.append('media', newPostMedia);
    }

    try {
      const response = await axios.post('http://localhost:5001/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newPost = response.data.post;
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setNewPostMedia(null);
      setError('');
    } catch (error) {
      setError('Failed to create post');
      console.error(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:5001/posts/${postId}/like`);
      const updatedPost = response.data.post;
      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Community</h1>

      <div style={styles.createPostSection}>
        <textarea
          style={styles.textarea}
          placeholder="What's happening?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <label style={styles.fileInputLabel}>
          <img src={logo} alt="Upload" style={styles.logo} />
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setNewPostMedia(e.target.files[0])}
            style={styles.fileInput}
          />
        </label>
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.postButton} onClick={handleNewPost}>
          Post
        </button>
      </div>

      <div style={styles.feed}>
        {posts.map((post) => (
          <Post key={post.id} post={post} handleLike={handleLike} />
        ))}
      </div>
    </div>
  );
}

function Post({ post, handleLike }) {
  const [comments, setComments] = useState(post.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [heartVisible, setHeartVisible] = useState(false);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/posts/${post._id}/like`, { username: post.username });

      if (response.data && response.data.post) {
        // Update the post's likes count
        handleLike(post._id); // Assuming handleLike updates the likes count

        // Show heart animation
        setHeartVisible(true);
        setTimeout(() => setHeartVisible(false), 1200);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error:', error.response.data.message);
      } else {
        console.error('Error liking post:', error);
      }
    }
  };

  const handleAddComment = async () => {
    if (newCommentText.trim()) {
      const newComment = { username: 'You', text: newCommentText };
      try {
        const response = await axios.post(`http://localhost:5001/posts/${post._id}/comment`, newComment);
        if (response.data && response.data.comment) {
          setComments([...comments, response.data.comment]);
          setNewCommentText('');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <div style={styles.post}>
      <div style={styles.postHeader}>
        <img
          src={post.profilePicture || defaultProfilePicture}
          alt="Profile"
          style={styles.profilePicture}
        />
        <div style={styles.headerInfo}>
          <p style={styles.username}>{post.username}</p>
          <p style={styles.timePosted}>{post.timePosted}</p>
        </div>
      </div>
      <p style={styles.postContent}>{post.content}</p>
      {post.media && (
        <div style={styles.mediaContainer}>
          {post.media.type.includes('image') ? (
            <img src={URL.createObjectURL(post.media)} alt="Post Media" style={styles.mediaImage} />
          ) : (
            <a href={URL.createObjectURL(post.media)} target="_blank" rel="noopener noreferrer" style={styles.pdfLink}>
              View PDF
            </a>
          )}
        </div>
      )}
      <div style={styles.postActions}>
        <button style={styles.likeButton} onClick={handleLikeClick}>
          ❤️ {post.likes} Likes
        </button>
        {heartVisible && <HeartAnimation />}
      </div>

      <div style={styles.commentsSection}>
        <h4 style={styles.commentsHeader}>Comments</h4>
        {comments.map((comment, index) => (
          <p key={index} style={styles.comment}>
            <strong>{comment.username}</strong>: {comment.text}
          </p>
        ))}
        <div style={styles.addCommentSection}>
          <input
            type="text"
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button style={styles.commentButton} onClick={handleAddComment}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function HeartAnimation() {
  return <div style={styles.heartAnimation}>❤️</div>;
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '10px',
    height: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#03273D',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  createPostSection: {
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f3f3f3',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  fileInputLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginTop: '10px',
  },
  logo: {
    width: '30px',
    height: '30px',
    marginRight: '10px',
  },
  fileInput: {
    display: 'none',
  },
  postButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#03273D',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  postButtonHover: {
    backgroundColor: '#0a1e2f',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  feed: {
    marginTop: '20px',
  },
  post: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#fff',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePicture: {
    borderRadius: '50%',
    marginRight: '10px',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  username: {
    fontWeight: 'bold',
  },
  timePosted: {
    fontSize: '12px',
    color: '#777',
  },
  postContent: {
    margin: '10px 0',
  },
  mediaContainer: {
    margin: '10px 0',
  },
  mediaImage: {
    maxWidth: '100%',
    borderRadius: '8px',
  },
  pdfLink: {
    color: '#1a0dab',
    textDecoration: 'underline',
  },
  postActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#03273D',
  },
  commentsSection: {
    marginTop: '10px',
  },
  commentsHeader: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  comment: {
    marginBottom: '5px',
  },
  addCommentSection: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  commentInput: {
    flex: 1,
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  commentButton: {
    padding: '8px 12px',
    marginLeft: '10px',
    backgroundColor: '#03273D',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  heartAnimation: {
    position: 'absolute',
    fontSize: '30px',
    animation: 'fade 1s forwards',
  },
};

// Set global background image for the entire page
document.body.style.backgroundImage = `url(${backgroundImage})`;
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.height = '100vh';
document.body.style.margin = 0;



export default CommunityPage;
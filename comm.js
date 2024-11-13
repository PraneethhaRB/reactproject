import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import Login from './Login';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('http://localhost:5000/posts');
            setPosts(response.data);
        };

        fetchPosts();
    }, []);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    return (
        <div>
            {!loggedIn && <Login onLogin={handleLogin} />}
            {loggedIn && (
                <div>
                    <h1>Community Page</h1>
                    {posts.map(post => <Post key={post._id} post={post} />)}
                </div>
            )}
        </div>
    );
};

export default Community;

import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import CommunityPage from './CommunityPage';

const App = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <UserProfile setUsername={setUsername} />
      <CommunityPage username={username} />
    </div>
  );
};

export default App;

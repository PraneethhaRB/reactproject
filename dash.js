import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './Assets/pexels-abby-chung-371167-1106468.jpg'; // Import the background image

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [time, setTime] = useState(new Date());
  const username = localStorage.getItem('username') || 'Guest'; // Default to 'Guest'

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/user/username/${username}`); // Call to backend
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error('User not found:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    const timer = setInterval(() => setTime(new Date()), 1000); // Update time every second

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, [username]);

  return (
    user && (
      <div style={styles.dashboardContainer}>
        {/* Header with Navigation */}
        <header style={styles.header}>
          <nav style={styles.nav}>
            <Link to="/profile" style={styles.navLink}>Profile</Link>
            <Link to="/board" style={styles.navLink}>Leaderboard</Link>
            <Link to="/community" style={styles.navLink}>Community</Link>
            <Link to="/fac" style={styles.navLink}>Faculty</Link>
          </nav>
        </header>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <div style={styles.contentContainer}> {/* Transparent container */}
            {/* Welcome Section with Profile Picture and Time */}
            <div style={styles.welcomeSection}>
              <img src={`http://localhost:5001${user.profilePic}`} alt="Profile" style={styles.profilePic} />
              <h1 style={styles.welcomeMessage}>Welcome back, {user.name}!</h1>
              <p style={styles.timeDisplay}>{time.toLocaleTimeString()}</p>
            </div>

            {/* Report Generation Section */}
            <div style={styles.reportSection}>
              <h2 style={styles.sectionHeader}>Generate Reports</h2>
              <div style={styles.buttonsContainer}>
                <button 
                  style={styles.button} 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#873600'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#873600'}
                >
                  Generate Scholar Report
                </button>
                <button 
                  style={styles.button} 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#873600'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#873600'}
                >
                  Generate Course Report
                </button>
                <button 
                  style={styles.button} 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#873600'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#873600'}
                >
                  Generate Achievements Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
// Internal Styling with animations and transitions
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Add background to header for better visibility
    position: 'fixed', // Ensure header stays at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', // Add subtle shadow
  },
  nav: {
    display: 'flex',
    gap: '30px', // Add spacing between nav elements
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0)', // Start with no shadow
  },
  mainContent: {
    textAlign: 'center',
    animation: 'fadeIn 1s',
    marginTop: '80px', // Adjust for fixed header
  },
  contentContainer: {  
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // Semi-transparent background
    padding: '30px',
    maxWidth: '600px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
    margin: 'auto', // Centers horizontally
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',
  },
  dashboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Ensures full height of the viewport
    padding: '20px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    color: '#873600',
  },
  welcomeSection: {
    marginBottom: '40px',
    animation: 'fadeSlide 1.5s ease-in-out',
  },
  profilePic: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    marginBottom: '20px',
    boxShadow: '0 0 10px rgba(135, 54, 0, 0.5)',
  },
  welcomeMessage: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  timeDisplay: {
    fontSize: '24px',
    marginBottom: '30px',
  },
  reportSection: {
    marginBottom: '40px',
  },
  sectionHeader: {
    fontSize: '28px',
    color: '#873600',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column', // Align buttons vertically
    alignItems: 'center',
    gap: '15px', // Add spacing between buttons
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#808b96 ',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '250px', // Set button width for uniformity
    textAlign: 'center',
  },
};

// Animations via CSS
const animations = `
  @keyframes fadeSlide {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject animations into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = animations;
document.head.appendChild(styleSheet);

export default Dashboard;

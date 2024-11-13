import React, { useState, useEffect } from 'react';
import backgroundImage from './Assets/a-panoramic-view-of-football-stadium-background-free-vector.jpg';

const initialTeachers = [
  {
    id: 1,
    name: 'Mr. Smith',
    class: 'Math',
    points: 120,
    profilePic: 'https://via.placeholder.com/50', // Placeholder image
  },
  {
    id: 2,
    name: 'Ms. Johnson',
    class: 'Science',
    points: 150,
    profilePic: 'https://via.placeholder.com/50', // Placeholder image
  },
  {
    id: 3,
    name: 'Mrs. Brown',
    class: 'English',
    points: 140,
    profilePic: 'https://via.placeholder.com/50', // Placeholder image
  },
  {
    id: 4,
    name: 'Mr. Garcia',
    class: 'History',
    points: 130,
    profilePic: 'https://via.placeholder.com/50', // Placeholder image
  },
  {
    id: 5,
    name: 'Miss Miller',
    class: 'Art',
    points: 100,
    profilePic: 'https://via.placeholder.com/50', // Placeholder image
  },
];

const TeacherLeaderboard = () => {
  const [teachers, setTeachers] = useState(initialTeachers);

  useEffect(() => {
    const sortedTeachers = [...teachers].sort((a, b) => b.points - a.points);
    setTeachers(sortedTeachers);
  }, []);

  const getRankStyle = (rank) => {
    if (rank === 1) return styles.gold;
    if (rank === 2) return styles.silver;
    if (rank === 3) return styles.bronze;
    return styles.default;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Teacher Leaderboard</h2>
      <div style={styles.leaderboard}>
        {teachers.map((teacher, index) => (
          <div
            key={teacher.id}
            style={{ ...styles.rankContainer, ...getRankStyle(index + 1) }}
            className={`leaderboard-item rank-${index + 1}`}
          >
            <div style={styles.rank}>{index + 1}</div>
            <img
              src={teacher.profilePic}
              alt={`${teacher.name} profile`}
              style={styles.profilePic}
            />
            <div style={styles.info}>
              <p style={styles.name}>{teacher.name}</p>
              <p style={styles.class}>{teacher.class}</p>
              <p style={styles.points}>Points: {teacher.points}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    width: '100%',
    height: '100%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: 'cover', // Ensure the background covers the entire area
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent the background from repeating
    borderRadius: '12px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '600',
    animation: 'fadeIn 1s ease-in-out',
  },
  leaderboard: {
    display: 'flex',
    maxWidth: '1000px',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '15px',
    overflowY: 'auto',
    maxHeight: '90vh',
    paddingLeft: '240px',
  },
  rankContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '8px',
    width: '450px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    position: 'relative',
    overflow: 'visible',  // Allow overflow of stars
  },
  rank: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginRight: '20px',
  },
  profilePic: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
    border: '2px solid #ddd',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  },
  class: {
    fontSize: '16px',
    color: '#666',
  },
  points: {
    fontSize: '16px',
    color: '#333',
  },
  gold: {
    backgroundColor: '#FFD700',
  },
  silver: {
    backgroundColor: '#C0C0C0',
  },
  bronze: {
    backgroundColor: '#CD7F32',
  },
  default: {
    backgroundColor: '#f4f4f4',
  },
};

// Adding Hover Animations via CSS
const animations = `


  body {
    background-position: center !important;
    background-repeat: no-repeat !important;
    height: 100%; /* Full viewport height */
  }

  .leaderboard-item {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .leaderboard-item:hover {
    transform: translateY(-5px); 
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); 
  }

  /* Gold Star Pop-out for Rank 1 */
.rank-1:hover::after {
  content: '⭐️⭐️⭐️';
  position: absolute;
  top: 0;
  right: -50px;
  font-size: 28px;
  color: #FFD700;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.8), /* Gold glow */
    -2px -2px 2px white, /* White outline */
    2px 2px 2px white; /* White outline */
  animation: popStar 0.6s ease forwards;
  overflow: visible;
}

/* Silver Star Pop-out for Rank 2 */
.rank-2:hover::after {
  content: '⭐️⭐️';
  position: absolute;
  top: 0;
  right: -50px;
  font-size: 28px;
  color: #C0C0C0;
  text-shadow: 
    0 0 10px rgba(192, 192, 192, 0.8), /* Silver glow */
    -2px -2px 2px white, /* White outline */
    2px 2px 2px white; /* White outline */
  animation: popStar 0.6s ease forwards;
  overflow: visible;
}

/* Bronze Star Pop-out for Rank 3 */
.rank-3:hover::after {
  content: '⭐️';
  position: absolute;
  top: 0;
  right: -50px;
  font-size: 28px;
  color: #CD7F32;
  text-shadow: 
    0 0 10px rgba(205, 127, 50, 0.8), /* Bronze glow */
    -2px -2px 2px white, /* White outline */
    2px 2px 2px white; /* White outline */
  animation: popStar 0.6s ease forwards;
  overflow: visible;
}

  /* Poppers for other ranks */
  .rank-4:hover::after, .rank-5:hover::after {
    content: '🎉🎊🎉🎊🎉🎊'; /* More poppers */
    position: absolute;
    top: 0;  /* Aligns poppers to the top */
    right: -50px;  /* Moves poppers out to the right */
    font-size: 24px;
    animation: popPoppers 1s ease forwards;
    overflow: visible; /* Allow poppers to overflow */
  }

  /* Keyframe animations for stars */
  @keyframes popStar {
    0% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1.2) rotate(20deg); }
    100% { opacity: 1; transform: scale(1); }
    
  }

  /* Poppers Animation */
  @keyframes popPoppers {
    0% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
}
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = animations;
document.head.appendChild(styleSheet);

export default TeacherLeaderboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from './Assets/pexels-dzeninalukac-754261.jpg';

const UserProfile = () => {
  const [user, setUser] = useState(null);  // User data state
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [image, setImage] = useState(null);  // Image file state
  const [uploading, setUploading] = useState(false);  // Image upload state
  const [isEditing, setIsEditing] = useState(false);  // Edit mode state
  const [formData, setFormData] = useState({});  // Form data for editing

  const username = localStorage.getItem('username');  // Retrieve username from local storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/user/username/${username}`);
        setUser(response.data);  // Update state with user data
        setFormData(response.data);  // Set initial form data to user details
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    if (username) {
      fetchData();  // Fetch user data if username exists
    } else {
      setLoading(false);
      setError("No username found");
    }
  }, [username]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);  // Update image state with selected file
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', image);

    setUploading(true); // Set uploading state to true

    try {
      const response = await axios.post(`http://localhost:5001/user/upload/${username}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Update profile picture in local storage and state
        const updatedProfilePic = response.data.profilePic;
        localStorage.setItem('profilePic', updatedProfilePic);
        
        // Update the user state with the new profile picture
        setUser((prevUser) => ({
          ...prevUser,
          profilePic: updatedProfilePic
        }));

        alert('Profile picture updated successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);  // Toggle edit mode
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/user/update/${username}`, formData);

      if (response.status === 200) {
        setUser(response.data);  // Update user state with new details
        setIsEditing(false);  // Exit edit mode
        alert('User details updated successfully');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Error updating user details');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    user && (
      <div style={styles.container}>
        <div style={styles.card}>
          <img
            src={`http://localhost:5001${user.profilePic}`}  // Append the base URL to the relative path
            alt={`${user.name} profile`}
            style={styles.profilePic}
          />

          <div style={styles.details}>
            {isEditing ? (
              <div style={styles.editForm}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Position:
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  School Code:
                  <input
                    type="text"
                    name="schoolCode"
                    value={formData.schoolCode}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </label>
                <button onClick={handleSubmit} style={styles.button}>
                  Save Changes
                </button>
                <button onClick={handleEditToggle} style={styles.button}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h2 style={styles.name}>{user.name}</h2>
                <p style={styles.position}>Position: {user.position || 'N/A'}</p>
                <p style={styles.schoolCode}>School Code: {user.schoolCode}</p>
                <p style={styles.email}>Email: {user.email || 'N/A'}</p>
                <p style={styles.phone}>Phone: {user.mobileNumber}</p>

                <div style={styles.uploadContainer}>
                  <label htmlFor="file-upload" style={styles.fileUploadButton}>
                    Add File
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={styles.fileInput}
                  />
                  <button onClick={handleImageUpload} style={{ ...styles.uploadButton, marginLeft: '10px' }} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                </div>

                <button onClick={handleEditToggle} style={styles.button}>
                  Edit Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

// Internal Styling
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`, // Add the background image here
    backgroundSize: 'cover', // Ensure the background covers the entire area
    backgroundPosition: 'center', // Center the background image
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background for card
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
  },
  profilePic: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '15px',
    border: '2px solid #ddd',
  },
  details: {
    marginBottom: '20px',
  },
  uploadContainer: {
    marginBottom: '20px',
  },
  fileUploadButton: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '15px',  // Increased margin for more space
  },
  fileInput: {
    display: 'none', // Hide the default file input
  },
  uploadButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }
};

export default UserProfile;

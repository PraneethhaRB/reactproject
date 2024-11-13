import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from './Assets/pexels-pixabay-159711.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "", 
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(""); // For API errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.username.trim() === "") {
      newErrors.username = "Username cannot be empty";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5001/login', {
          username: formData.username,  // Map 'username' to 'name' if necessary
          password: formData.password,
        });

        if (response.status === 200) {
          // Save username and token in localStorage
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('token', response.data.token); // Store the JWT token
          setSuccess("Login successful!");
          setErrors({});
          navigate('/home '); // Navigate to the profile page
        }
      } catch (error) {
        console.error('Error response:', error.response);
        if (error.response && error.response.data) {
          setError(error.response.data.message || "An error occurred.");
        } else {
          setError("Login failed. Please try again later.");
        }
        setSuccess("");
      }
    } else {
      setErrors(validationErrors);
      setSuccess("");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <h2 style={styles.cardTitle}>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={errors.username ? { ...styles.input, ...styles.inputError } : styles.input}
              placeholder="Enter your username"
            />
            {errors.username && <span style={styles.errorMessage}>{errors.username}</span>}
          </div>

          {/* Password Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={errors.password ? { ...styles.input, ...styles.inputError } : styles.input}
              placeholder="Enter your password"
            />
            {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
          </div>

          <button type="submit" style={styles.loginButton}>Login</button>
          {success && <p style={styles.successMessage}>{success}</p>}
          {error && <p style={styles.errorMessage}>{error}</p>}
        </form>

        {/* Line for users who do not have an account */}
        <p style={styles.existingUserText}>
          Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

// Internal styles using JS object
const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`, // Background image with overlay
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Roboto', sans-serif",
  },
  loginCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // White background with 80% opacity
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  cardTitle: {
    marginBottom: "1.5rem",
    color: "#333",
    fontSize: "1.75rem",
  },
  inputGroup: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
    outline: "none",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorMessage: {
    color: "#e74c3c",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  },
  loginButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#1E90FF",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  successMessage: {
    marginTop: "1rem",
    color: "#2ecc71",
    fontSize: "0.875rem",
  },
  existingUserText: {
    marginTop: "1rem",
    fontSize: "0.875rem",
    color: "#333",
  },
  signupLink: {
    color: "#1E90FF",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;

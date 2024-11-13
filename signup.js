import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation
import backgroundImage from './Assets/pexels-pixabay-159711.jpg';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    schoolCode: "",
    mobileNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }
    if (formData.schoolCode.trim() === "") {
      newErrors.schoolCode = "School code cannot be empty";
    }
    return newErrors;
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = validate(); // Validate form data
    if (Object.keys(newErrors).length === 0) {
      try {
        // Make the POST request to your signup API endpoint
        const response = await axios.post('http://localhost:5001/signup', formData); // Replace '/api/signup' with your actual endpoint
  
        // If signup is succ essful, navigate to the profile page
        if (response.status === 200) {
          setSuccess("Signup successful!");
          navigate('/login'); // Navigate to the profile page after successful signup
        }
      } catch (error) {
        // Handle errors from the API request
        if (error.response && error.response.data) {
          setErrors({ apiError: error.response.data.message }); // Set error message from the API response
        } else {
          setErrors({ apiError: "Signup failed. Please try again later." });
        }
      }
    } else {
      setErrors(newErrors);
      setSuccess("");
    }
  };  

  return (
    <div style={styles.signupContainer}>
      <div style={styles.signupCard}>
        <h2 style={styles.cardTitle}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={errors.name ? { ...styles.input, ...styles.inputError } : styles.input}
              placeholder="Enter your full name"
            />
            {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
          </div>

          {/* School Code Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="schoolCode">School Code</label>
            <input
              type="text"
              id="schoolCode"
              name="schoolCode"
              value={formData.schoolCode}
              onChange={handleChange}
              style={errors.schoolCode ? { ...styles.input, ...styles.inputError } : styles.input}
              placeholder="Enter your school code"
            />
            {errors.schoolCode && <span style={styles.errorMessage}>{errors.schoolCode}</span>}
          </div>

          {/* Mobile Number Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              style={errors.mobileNumber ? { ...styles.input, ...styles.inputError } : styles.input}
              placeholder="Enter your mobile number"
            />
            {errors.mobileNumber && <span style={styles.errorMessage}>{errors.mobileNumber}</span>}
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

          <button type="submit" style={styles.signupButton}>Sign Up</button>
          {success && <p style={styles.successMessage}>{success}</p>}
        </form>

        {/* Line for users who already have an account */}
        <p style={styles.existingUserText}>
          Already have an account? <Link to="/login" style={styles.loginLink}>Login</Link>
        </p>
      </div>
    </div>
  );
};

// Internal styles using JS object
const styles = {
  signupContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "fit",
    background: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Roboto', sans-serif",
  },
  signupCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "2.15rem",
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
  signupButton: {
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
  loginLink: {
    color: "#1E90FF",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Signup;

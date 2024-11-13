import React from "react";
import image from './Assets/profile.gif'; // Ensure the path is correct

const MePage = () => {
  const username = "John Doe"; // This would typically come from props, state, or context

  const handleReportClick = (reportType) => {
    alert(`Preparing ${reportType} report...`);
    // Logic to generate or prepare the selected report
  };

  return (
    <div style={styles.container}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeText}>Welcome back, {username}!</h1> {/* Dynamically render username */}
        {/* Placeholder for user logo */}
        <div style={styles.logoContainer}>
          <img
            src={image} // Ensure the path is correct
            alt="User Logo"
            style={styles.userLogo}
          />
        </div>
      </div>

      {/* Buttons for reports */}
      <div style={styles.buttonContainer}>
        <button style={styles.reportButton} onClick={() => handleReportClick("General")}>
          Prepare General Report
        </button>
        <button style={styles.reportButton} onClick={() => handleReportClick("Scholar")}>
          Generate Scholar Report
        </button>
        <button style={styles.reportButton} onClick={() => handleReportClick("Course")}>
          Generate Course Report
        </button>
        <button style={styles.reportButton} onClick={() => handleReportClick("Achievement")}>
          Generate Achievement Report
        </button>
      </div>
    </div>
  );
};

// Internal styles using JS object
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Roboto', sans-serif",
    padding: "20px",
  },
  welcomeSection: {
    textAlign: "center",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'center', // Centers content vertically
  },
  welcomeText: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1rem",
  },
  logoContainer: {
    width: "150px",  // Fixed width
    height: "150px", // Fixed height
    backgroundColor: "#fff",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center", // Centers the image horizontally
    alignItems: "center", // Centers the image vertically
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  userLogo: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Ensures the image covers the container without distortion
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "400px",
  },
  reportButton: {
    padding: "1rem",
    fontSize: "1rem",
    backgroundColor: "#0083b0",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  reportButtonHover: {
    backgroundColor: "#00b4db",
  },
};

export default MePage;

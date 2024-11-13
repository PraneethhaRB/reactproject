import React, { useState } from 'react';
import backgroundImage from './Assets/pinkblue.jpg';

const FacultyPublications = () => {
  const [file, setFile] = useState(null);
  const [publications, setPublications] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredPublications, setFilteredPublications] = useState([]);

  // Handle file input
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  // Mock function to simulate data extraction from file
  const processFile = () => {
    const mockPublications = [
      { title: "Research on AI", year: 2021, type: "Journal" },
      { title: "Machine Learning in Healthcare", year: 2020, type: "Conference" },
      { title: "Data Science Advances", year: 2019, type: "Journal" },
      { title: "AI in Education", year: 2022, type: "Conference" }
     
    ];
    setPublications(mockPublications);
  };

  // Handle custom query for filtering publications by year
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = publications.filter(pub => pub.year.toString() === query);
    setFilteredPublications(filtered);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Faculty Publication Summaries</h2>

      {/* File Upload Section */}
      <div style={styles.fileUpload}>
        <label htmlFor="fileInput" style={styles.label}>Upload Excel/BibTeX File:</label>
        <input 
          type="file" 
          id="fileInput" 
          onChange={handleFileUpload} 
          style={styles.input}
        />
        <button onClick={processFile} style={styles.button}>Process File</button>
      </div>

      {/* Custom Query Section */}
      <div style={styles.querySection}>
        <label htmlFor="queryInput" style={styles.label}>Filter by Year:</label>
        <input 
          type="text" 
          id="queryInput" 
          value={query} 
          onChange={handleQueryChange} 
          style={styles.input} 
          placeholder="Enter year (e.g., 2021)"
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>
      </div>

      {/* Display Publication Summaries */}
      <div style={styles.publicationList}>
        <h3>Publications:</h3>
        {(filteredPublications.length > 0 ? filteredPublications : publications).map((pub, index) => (
          <div key={index} style={styles.publicationCard}>
            <p><strong>Title:</strong> {pub.title}</p>
            <p><strong>Year:</strong> {pub.year}</p>
            <p><strong>Type:</strong> {pub.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Internal styles using JS objects
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${backgroundImage})`, // Add background image here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slight transparency to make text readable
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '2rem',
  },
  fileUpload: {
    marginBottom: '20px',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  label: {
    marginRight: '10px',
    fontSize: '1rem',
    color: '#555',
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#0083b0',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  querySection: {
    marginBottom: '20px',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  publicationList: {
    marginTop: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  publicationCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
};

export default FacultyPublications;

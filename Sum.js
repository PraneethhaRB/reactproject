import React, { useState } from 'react';

function Summarizer() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock function to send request to summarizer.org
  const handleSummarize = async () => {
    setLoading(true);
    setError('');

    try {
      // Call summarizer.org API (adjust this with actual API call)
      const response = await fetch('https://www.summarizer.org/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary);
      } else {
        setError('Error fetching summary. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  // Inline styles for components
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: loading ? '#6c757d' : '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: loading || !inputText ? 'not-allowed' : 'pointer',
  };

  const errorStyle = {
    color: 'red',
    marginTop: '10px',
  };

  const summaryBoxStyle = {
    marginTop: '20px',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  };

  return (
    <div style={containerStyle}>
      <h1>Summarizer Tool</h1>
      <textarea
        style={textareaStyle}
        placeholder="Enter text to summarize"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="6"
      ></textarea>
      <button
        style={buttonStyle}
        onClick={handleSummarize}
        disabled={loading || !inputText}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && <p style={errorStyle}>{error}</p>}
      {summary && (
        <div style={summaryBoxStyle}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;

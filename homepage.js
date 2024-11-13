import React, { useState } from 'react';

const StockManagement = () => {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({ name: '', comment: '', quantity: 0 });
  const [showModal, setShowModal] = useState(false);

  const handleAddStock = () => {
    setStocks([...stocks, newStock]);
    setNewStock({ name: '', comment: '', quantity: 0 });
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleDeleteStock = (index) => {
    const updatedStocks = stocks.filter((_, i) => i !== index);
    setStocks(updatedStocks);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      <h1>Stock Management</h1>
      <button 
        style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '10px 15px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        onClick={() => setShowModal(true)}
      >
        + Add New Stock
      </button>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'left',
            width: '300px',
            position: 'relative'
          }}>
            <h2>Add Stock</h2>
            <input
              type="text"
              name="name"
              placeholder="Stock Name"
              value={newStock.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}
            />
            <textarea
              name="comment"
              placeholder="Add a comment..."
              value={newStock.comment}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}
            ></textarea>
            <input
              type="number"
              name="quantity"
              placeholder="Number of Stocks"
              value={newStock.quantity}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}
            />
            <button
              style={{
                backgroundColor: '#27ae60',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%'
              }}
              onClick={handleAddStock}
            >Add Stock</button>
            <button
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
                marginTop: '10px'
              }}
              onClick={() => setShowModal(false)}
            >Close</button>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        marginTop: '20px'
      }}>
        {stocks.map((stock, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              backgroundColor: '#f4f4f4',
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3>{stock.name}</h3>
            <p>{stock.comment}</p>
            <p><strong>Quantity:</strong> {stock.quantity}</p>
            <button
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              onClick={() => handleDeleteStock(index)}
            >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockManagement;

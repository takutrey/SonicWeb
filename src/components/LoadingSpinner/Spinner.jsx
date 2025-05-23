import React from 'react';
import './Spinner.css';

function Spinner({ message = "Loading..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner-circle"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
}

export default Spinner;

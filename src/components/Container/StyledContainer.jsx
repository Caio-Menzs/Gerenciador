
import React from 'react';
import './StyledContainer.css'; 

const StyledContainer = ({ children }) => {
  return (
    <div className="styled-container">
      {children}
    </div>
  );
};

export default StyledContainer;

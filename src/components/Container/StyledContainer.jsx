
import React from 'react';
import './StyledContainer.css'; // Importe o arquivo de estilos

const StyledContainer = ({ children }) => {
  return (
    <div className="styled-container">
      {children}
    </div>
  );
};

export default StyledContainer;

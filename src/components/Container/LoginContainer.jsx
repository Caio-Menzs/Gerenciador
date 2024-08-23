
import React from 'react';
import './LoginContainer.css'; // Importe o arquivo de estilos

const LoginContainer = ({ children }) => {
  return (
    <div className="login-container">
      {children}
    </div>
  );
};

export default LoginContainer;

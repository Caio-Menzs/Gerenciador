import React from 'react';

const Space = ({ size }) => {
  const spacerStyle = {
    display: 'block',
    width: '100%',
    height: size,
  };

  return <div style={spacerStyle}></div>;
};

export default Space;

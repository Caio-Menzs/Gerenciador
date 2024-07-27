import React from 'react';
import { ContentStyles } from './Style';

const Content = ({ children }) => {
  return (
    <ContentStyles>
    <div style={{ backgroundColor: '#fff', padding: '20px' }}>
      {children}
    </div>
    </ContentStyles>
  );
};

export default Content;

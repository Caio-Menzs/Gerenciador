import React from 'react';
import { ContentStyles } from './Style';

const Content = ({ children }) => {
  return (
    <ContentStyles>
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '25px',  boxshadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
      {children}
    </div>
    </ContentStyles>
  );
};

export default Content;


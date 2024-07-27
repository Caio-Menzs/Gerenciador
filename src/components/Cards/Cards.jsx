import React from 'react';
import { Card } from 'antd';

const Cards = ({ title, content }) => {
  return (
    <Card title={title} style={{ width: 300, marginBottom: 20 }}>
      {content}
    </Card>
  );
};

export default Cards;

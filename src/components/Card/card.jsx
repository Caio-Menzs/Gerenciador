import React from 'react';
import { Card, Statistic } from 'antd';

const CustomCard = ({ icon, title }) => (
  <Card
    style={{
      width: 300,
      position: 'relative',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '10px',
        left: '10px', // Adjust positioning from the left
      }}
    >
      <div
        style={{
          fontSize: '24px',
          marginRight: '10px', // Adjust spacing between icon and title
        }}
      >
        {icon}
      </div>
      <h1
        style={{
          margin: 0,
          fontSize: '1.5rem', // Adjust font size as needed
        }}
      >
        {title}
      </h1>
    </div>

    {/* Content of the card */}
    <div style={{ marginTop: '50px' }}> {/* Adjust marginTop to make room for the title and icon */}
      <Statistic title="Faturamento Mensal" value={12345} />
    </div>
  </Card>
);

export default CustomCard;

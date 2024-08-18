import React from 'react';
import { Card, Statistic, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './card.css'; 

const DashboardCard = ({ title, value, description, trend, icon }) => {
  return (
    <Col span={6} style={{ marginBottom: '16px' }}>
      <Card
        title={title}
        bordered={false}
        style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
        headStyle={{ fontSize: '14px', fontWeight: 'bold', padding: '16px' }}
        bodyStyle={{ padding: '16px' }}
      >
        <Statistic
          value={value}
          precision={2}
          prefix={icon}
          valueStyle={{ fontSize: '20px', fontWeight: 'bold' }}
        />
        <div className="trend">
          {trend === 'up' ? (
            <ArrowUpOutlined style={{ color: '#3f8600' }} />
          ) : (
            <ArrowDownOutlined style={{ color: '#cf1322' }} />
          )}
          <span>{description}</span>
        </div>
      </Card>
    </Col>
  );
};

export default DashboardCard;

import React from 'react';
import { DollarOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Row } from 'antd'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import DashboardCard from '../../components/Card/card';


const Index = () => {
  return (
    <Sidebar>
      <Content>
      <Row gutter={16}>
      <DashboardCard
        title="Faturamento Mensal"
        value={123456.78}
        description="Since last month"
        trend="up"
        icon={<DollarOutlined />}
      />
      <DashboardCard
        title="OS's Geradas"
        value={234}
        description="Since last week"
        trend="down"
        icon={<UserOutlined />}
      />
      <DashboardCard
        title="Produtos Vendidos"
        value={345}
        description="Since yesterday"
        trend="up"
        icon={<ShoppingCartOutlined />}
      />
      <DashboardCard
        title="Faturamento diário"
        value={123456.78}
        description="Since last month"
        trend="up"
        icon={<DollarOutlined />}
      />
    </Row>
      </Content>
    </Sidebar>
  );
};

export default Index;

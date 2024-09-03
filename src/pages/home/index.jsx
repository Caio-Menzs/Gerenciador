import React from 'react';
import { DollarOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import DashboardCard from '../../components/Card/card';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

const Index = () => {
  const barData = [
    { day: 'Seg', vendas: 50 },
    { day: 'Ter', vendas: 80 },
    { day: 'Qua', vendas: 60 },
    { day: 'Qui', vendas: 70 },
    { day: 'Sex', vendas: 100 },
    { day: 'Sáb', vendas: 30 },
    { day: 'Dom', vendas: 50 },
  ];

  const pieData = [
    { id: 'Produto A', value: 45 },
    { id: 'Produto B', value: 25 },
    { id: 'Produto C', value: 30 },
  ];

  return (
    <Sidebar>
      <Content>
        <Row gutter={16}>
          <DashboardCard
            title="Faturamento Mensal"
            value={123456.78}
            description="Desde o mês passado"
            trend="up"
            icon={<DollarOutlined />}
           
          />
          <DashboardCard
            title="OS's Geradas"
            value={234}
            description="Desde a semana passada"
            trend="down"
            icon={<UserOutlined />}
            color="#3c32a8"
          />
          <DashboardCard
            title="Produtos Vendidos"
            value={345}
            description="Desde ontem"
            trend="up"
            icon={<ShoppingCartOutlined />}
            color="#de6a12"
          />
          <DashboardCard
            title="Faturamento Diário"
            value={123456.78}
            description="Desde o mês passado"
            trend="up"
            icon={<DollarOutlined />}
            color="#24bfba"
          />
        </Row>
        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={12}>
            <div style={{ height: 400 }}>
              <h3>Vendas Semanais</h3>
              <ResponsiveBar 
                data={barData}
                keys={['vendas']}
                indexBy="day"
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'category10' }}
                axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Dia da semana', legendPosition: 'middle', legendOffset: 32 }}
                axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: 'Vendas', legendPosition: 'middle', legendOffset: -40 }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div style={{ height: 400 }}>
              <h3>Distribuição de Produtos</h3>
              <ResponsivePie
                data={pieData}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'category10' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextColor="#333333"
                radialLabelsLinkColor={{ from: 'color' }}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#333333"
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Sidebar>
  );
};

export default Index;

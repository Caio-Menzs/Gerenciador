import React from 'react';
import { DollarOutlined, UserOutlined, ShoppingCartOutlined, FileTextOutlined } from '@ant-design/icons';
import { Row, Col, List, Typography } from 'antd'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import DashboardCard from '../../components/Card/card';
import { ResponsiveBar } from '@nivo/bar'; // Importação do ResponsiveBar
import { ResponsivePie } from '@nivo/pie'; // Importação do ResponsivePie

const { Title } = Typography;

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

  // Dados fictícios das últimas ordens de serviço
  const ordensServico = [
    { id: 1, titulo: 'Ordem de Serviço #123', data: '2024-09-01', status: 'Concluída' },
    { id: 2, titulo: 'Ordem de Serviço #124', data: '2024-09-02', status: 'Em andamento' },
    { id: 3, titulo: 'Ordem de Serviço #125', data: '2024-09-03', status: 'Pendente' },
    { id: 4, titulo: 'Ordem de Serviço #126', data: '2024-09-04', status: 'Concluída' },
    { id: 5, titulo: 'Ordem de Serviço #127', data: '2024-09-05', status: 'Em andamento' },
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
              <Title level={3}>Últimas Ordens de Serviço</Title>
              <List
                bordered
                dataSource={ordensServico}
                renderItem={item => (
                  <List.Item>
                    <div style={{ flex: 1 }}>
                      <div><strong>{item.titulo}</strong></div>
                      <div>{item.data}</div>
                      <div>Status: {item.status}</div>
                    </div>
                    <FileTextOutlined style={{ fontSize: '24px', color: '#08c' }} />
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Sidebar>
  );
};

export default Index;

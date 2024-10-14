import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarOutlined, UserOutlined, ShoppingCartOutlined, FileTextOutlined } from '@ant-design/icons';
import { Row, Col, List, Typography, message } from 'antd'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import DashboardCard from '../../components/Card/card';
import { ResponsiveBar } from '@nivo/bar';

const { Title } = Typography;

const Index = () => {
  const [ordensServico, setOrdensServico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalOrdens, setTotalOrdens] = useState(0); 
  const [totalProducts, setTotalProducts] = useState(0);

  const barData = [
    { day: 'Seg', vendas: 50 },
    { day: 'Ter', vendas: 80 },
    { day: 'Qua', vendas: 60 },
    { day: 'Qui', vendas: 70 },
    { day: 'Sex', vendas: 100 },
    { day: 'Sáb', vendas: 30 },
    { day: 'Dom', vendas: 50 },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7183/api/OrdemServico'); 
      if (response.data && Array.isArray(response.data.dados)) {
        const limitedOrdens = response.data.dados.slice(0, 4); 
        setOrdensServico(limitedOrdens);
        setTotalOrdens(response.data.dados.length);
      } else {
        message.error('Formato de dados de OS inválido.');
      }
    } catch (error) {
      console.error('Erro ao buscar OS:', error);
      message.error('Erro ao carregar lista de OS.');
      setError('Erro ao carregar lista de OS.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

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
            value={totalOrdens} 
            description="Desde a semana passada"
            trend="down"
            icon={<UserOutlined />}
            color="#3c32a8"
          />
          <DashboardCard
            title="Produtos Vendidos"
            value={totalProducts}
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
              <h3>Faturamento Mensal</h3>
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
                loading={loading}
                dataSource={ordensServico}
                renderItem={item => (
                  <List.Item>
                    <div style={{ flex: 1 }}>
                      <div><strong>{item.descricao || 'Sem descrição'}</strong></div>
                      <div>Início: {new Date(item.dataInicio).toLocaleDateString()}</div>
                      <div>Status: {item.status || 'Não definido'}</div>
                    </div>
                    <FileTextOutlined style={{ fontSize: '24px', color: '#08c' }} />
                  </List.Item>
                )}
              />
              {error && <div style={{ color: 'red' }}>Erro: {error}</div>}
            </div>
          </Col>
        </Row>
        </Content>
        </Sidebar>
  );
};

export default Index;

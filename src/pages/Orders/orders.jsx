import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Table, Button, Flex } from 'antd';
import CustomButton from '../../components/CustomButton/CustomButton';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import StyledContainer from '../../components/Container/StyledContainer';
import api from '../../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await api.get("/api/OrdemServico");
        console.log("Dados Recebidos:", response.data);
        const data = response.data.dados.map(order => ({
          ...order,
          key: order.id,
        }));
        setOrders(data);
      } catch (error) {
        console.error('Erro ao buscar ordens:', error);
      }
    };

    getOrders();
  }, []);

  const columns = [
    {
      title: 'N° OS',
      dataIndex: 'Id_Ordem',
      key: 'Id_Ordem',
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
    },
    {
      title: 'Técnico',
      dataIndex: 'tecnico',
      key: 'tecnico',
    },
    {
      title: 'Data Inicial',
      dataIndex: 'dataInicio',
      key: 'dataInicio',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Data Final',
      dataIndex: 'dataFinal',
      key: 'dataFinal',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Garantia',
      dataIndex: 'garantia',
      key: 'garantia',
    },
    {
      title: 'Valor Total',
      key: 'valorTotal',
      render: (text, record) => (
        `${(record.precoProduto * record.quantidadeProduto + record.precoServico * record.quantidadeServico).toFixed(2)}`
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleEdit(record.id)}>Editar</Button>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`orders-form/${id}`); // Alterado para a rota de ordem de serviço
  };

  const handleNewOrder = () => {
    navigate('/orders-form'); // Navega para o formulário de nova ordem
  };

  return (
    <Sidebar>
      <Content>
        <Flex gap="small" wrap="wrap">
          <CustomButton icon={<PlusCircleOutlined />} label="Novo" onClick={handleNewOrder} />
        </Flex>

        <StyledContainer>
          <h3 style={{ marginTop: '20px' }}>Ordens de Serviço</h3>
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
          />
        </StyledContainer>
      </Content>
    </Sidebar>
  );
}

export default Orders;

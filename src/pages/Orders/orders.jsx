import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Table, Button, Flex, Modal } from 'antd';
import CustomButton from '../../components/CustomButton/CustomButton';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import StyledContainer from '../../components/Container/StyledContainer';
import api from '../../services/api';
import OrderForm from './ordersForm';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      title: 'N°',
      dataIndex: 'id',
      key: 'id',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Valor Total',
      key: 'valorTotal',
      render: (text, record) => (
        `${(record.precoProduto * record.quantidadeProduto + record.precoServico * record.quantidadeServico).toFixed(2)}`
      ),
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
    navigate(`/orders/form/${id}`); // Alterado para a rota de ordem de serviço
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Sidebar>
      <Content>
        <Flex gap="small" wrap="wrap">
          <CustomButton icon={<PlusCircleOutlined />} label="Novo" onClick={showModal} />
        </Flex>

        <StyledContainer>
          <h3 style={{ marginTop: '20px' }}>Ordens de Serviço</h3>
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
          />
        </StyledContainer>

        <Modal
          title="Nova Ordem de Serviço"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <OrderForm onClose={handleCancel} /> {/* Alterado para o formulário de ordem de serviço */}
        </Modal>
      </Content>
    </Sidebar>
  );
}

export default Orders;

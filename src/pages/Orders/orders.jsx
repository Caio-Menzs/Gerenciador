import React, { useEffect, useState } from 'react';  
import Sidebar from '../../components/Sidebar/Sidebar';
import { Table, Button, Flex, Modal, Input } from 'antd';
import CustomButton from '../../components/CustomButton/CustomButton';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import StyledContainer from '../../components/Container/StyledContainer';
import api from '../../services/api';
import ProductForm from "../products/productsForm";

const Orders = () => {
  const [orders, setOrders] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]); 

  const navigate = useNavigate();
  const { Search } = Input;

  useEffect(() => {
    const getOrders = async () => { 
      try {
        const response = await api.get("/api/Produto"); 
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
    },
    {
      title: 'Responsável',
      dataIndex: 'responsavel',
      key: 'responsavel',
    },
    {
      title: 'Data Inicial',
      dataIndex: 'datai',
      key: 'datai',
    },
    {
      title: 'Data Final',
      dataIndex: 'dataf',
      key: 'dataf',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
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
    navigate(`/products/form/${id}`);
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
          <CustomButton icon={<PlusCircleOutlined />} label="OS" onClick={showModal} />
        </Flex> 

        <StyledContainer>
          <h3  style={{ marginTop: '20px' }} >Ordens de Serviços</h3>
          <Table 
            columns={columns} 
            dataSource={orders} 
            rowKey="id"
          />
        </StyledContainer>

        <Modal 
          title="Novo Produto"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <ProductForm onClose={handleCancel} /> {}
        </Modal>
      </Content>  
    </Sidebar>
  );
}

export default Orders;

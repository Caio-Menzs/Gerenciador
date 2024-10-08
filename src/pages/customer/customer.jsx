import React, { useEffect, useState } from 'react';
import  Sidebar  from '../../components/Sidebar/Sidebar';
import { Table, Button, Flex, Modal } from 'antd';

import Content from '../../components/Content/Content';
import { PlusCircleOutlined, FormOutlined  } from '@ant-design/icons';
import api from '../../services/api';
import CustomerForm from './customerForm'; 
import StyledContainer from '../../components/Container/StyledContainer';
import CustomButton from '../../components/CustomButton/CustomButton';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await api.get("/api/Cliente");
        console.log('Dados recebidos:', response.data);
        const data = response.data.dados.map(customer => ({
          ...customer,
          key: customer.id,
        }));
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        setLoading(false);
      }
    };

    getCustomers();
  }, []);

  const columns = [
    {
      title: 'N°',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'CPF/CNPJ',
      dataIndex: 'documento',
      key: 'documento',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contato',
      dataIndex: 'contato',
      key: 'contato',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (text, record) => (
        <Button 
        icon={<FormOutlined />}
        onClick={() => handleEdit(record.id)} style={{ marginRight: 8 }}>Editar</Button>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`/customers/form/${id}`);
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
          <CustomButton icon={<PlusCircleOutlined />} label = "Cliente"  onClick={showModal} />
        </Flex>
      <StyledContainer>
        <h3 style={{ marginTop: '20px' }}>Clientes</h3>
          <Table 
            columns={columns} 
            dataSource={customers} 
            loading={loading} 
            rowKey="id" 
          />
        </StyledContainer>
        <Modal 
          title="Novo Cliente" 
          visible={isModalVisible} 
          onCancel={handleCancel} 
          footer={null} 
        >
          <CustomerForm onClose={handleCancel} />
        </Modal>
      </Content>
    </Sidebar>
  );
};

export default Customer;

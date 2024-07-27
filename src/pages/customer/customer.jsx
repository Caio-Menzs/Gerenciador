import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components';
import { Table, Button, Flex } from 'antd';
import Space from '../../components/Space/Space';
import Content from '../../components/Content/Content';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Customer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <Button type="link" onClick={() => handleEdit(record.id)}>Editar</Button>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`/customers/form/${id}`);
  };

  return (
    <Sidebar>
      <Content>
        <Flex gap="small" wrap="wrap">
          <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => navigate("/customers/form")}>
            Adicionar Cliente
          </Button>
        </Flex>
        <Space size="20px" />
        <h3>Clientes</h3>
        <Table 
          columns={columns} 
          dataSource={customers} 
          loading={loading} 
          rowKey="id" 
        />
      </Content>
    </Sidebar>
  );
};

export default Customer;

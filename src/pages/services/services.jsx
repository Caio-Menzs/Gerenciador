import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components';
import { Table, Button, Flex } from 'antd';
import Space from '../../components/Space/Space';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import api from '../../services/api';

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await api.get("/api/Servico");
        console.log('Dados recebidos:', response.data);
        const data = response.data.dados.map(service => ({
          ...service,
          key: service.id, 
        }));
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        setLoading(false);
      }
    };
    
    getServices();
  }, []);

  const columns = [
    {
      title: 'N°',
      dataIndex: 'id', // Ajuste para corresponder ao nome do campo correto nos dados
      key: 'id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Nome',
      dataIndex: 'nome', // Ajuste para corresponder ao nome do campo correto nos dados
      key: 'nome',
    },
    {
      title: 'Preço',
      dataIndex: 'preco', // Ajuste para corresponder ao nome do campo correto nos dados
      key: 'preco',
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao', // Ajuste para corresponder ao nome do campo correto nos dados
      key: 'descricao',
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
    navigate(`/services/form/${id}`);
  };
  
  return (
    <Sidebar>
      <Content>
        <Flex gap="small" wrap="wrap">
          <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => navigate("/services/form")}>
            Adicionar Serviço
          </Button>
        </Flex>
        <Space size="20px" />        
        <h3>Serviços</h3>
        <Table 
          columns={columns} 
          dataSource={services} 
          loading={loading} 
          rowKey="id" 
        />
      </Content>  
    </Sidebar>
  );
};

export default Services;
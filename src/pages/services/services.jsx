import React, { useEffect, useState } from 'react';
import  Sidebar  from '../../components/Sidebar/Sidebar';
import { Table, Button, Flex } from 'antd';
import Space from '../../components/Space/Space';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import api from '../../services/api';
import StyledContainer from '../../components/Container/StyledContainer';
import CustomButton from '../../components/CustomButton/CustomButton';

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
      title: 'Preço',
      dataIndex: 'preco', 
      key: 'preco',
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao', 
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
          <CustomButton icon={<PlusCircleOutlined />} label = "Produto"  />
        </Flex>
        
        
        <StyledContainer>
        <h3 style={{ marginTop: '20px' }}>Serviços</h3>
        <Table 
          columns={columns} 
          dataSource={services} 
          loading={loading} 
          rowKey="id" 
        />
        </StyledContainer>
      </Content>  
    </Sidebar>
  );
};

export default Services;
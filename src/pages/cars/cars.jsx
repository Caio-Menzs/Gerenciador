

import React, { useState, useEffect } from 'react'
import {  Sidebar } from '../../components'
import { Table, Tag, Button, Flex } from 'antd';
import Space from '../../components/Space/Space';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom"
import {PlusCircleOutlined} from '@ant-design/icons'
import api from '../../services/api';
import StyledContainer from '../../components/Container/StyledContainer';


const vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getVehicles = async () => {
    try {
        const response = await api.get("/api/Veiculo");
        console.log ("Dados recebidos:", response.data);
        const data = response.data.dados.map(vehicles => ({
          ...vehicles,
          key: vehicles.id,
        }));
        setVehicles(data);
      
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);
        setLoading(false);
    }
    };

    getVehicles();
  }, []);

  const columns = [
    {
      title: 'N°',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Placa',
      dataIndex: 'placa',
      key: 'placa',
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca',
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo',
      key: 'modelo',
    },
    {
      title: 'Cor',
      dataIndex: 'cor',
      key: 'cor',
    
     
    },
    {
      title: 'Ano',
      key: 'ano',
      render: (text, record) => `${record.anoFabricacao} / ${record.anoModelo}`,
    },
    {
      title: 'Ações',
      key: 'action',
     
    },
  ];
  

  return (
    <Sidebar>
      <Content>
      <Flex gap="small" wrap="wrap">
        <Button type="primary" icon = {<PlusCircleOutlined />} onClick={() => navigate("/customers/form")}>Adicionar Veículo</Button>
        </Flex> 
        <StyledContainer>
        <Space size="20px" />        
        <h3>Veículos</h3>
        <Table columns={columns} dataSource={vehicles} />
        </StyledContainer>
      </Content>  
    </Sidebar>
  )
}

export default vehicles


import React from 'react'
import {  Sidebar } from '../../components'
import { Table, Tag, Button, Flex } from 'antd';
import Space from '../../components/Space/Space';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom"
import {PlusCircleOutlined} from '@ant-design/icons'


const vehicles = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'N°',
      dataIndex: 'number',
      key: '1',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Placa',
      dataIndex: 'name',
      key: '2',
    },
    {
      title: 'Marca',
      dataIndex: 'cpf',
      key: '3',
    },
    {
      title: 'Modelo',
      dataIndex: 'email',
      key: '4',
    },
    {
      title: 'Cor',
      dataIndex: 'telephone',
      key: '5',
    
     
    },
    {
      title: 'Ano',
      dataIndex: 'telephone',
      key: '5',
    
     
    },
    {
      title: 'Ações',
      key: 'action',
     
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Adrielle Fernandes Fonseca',
      cpf: '509.169.368-80',
      email: 'adriellefernandesfonseca@gmail.com',
      telephone: '(16) 99346-4891',
      number: 1,
    },
    {
      key: '2',
      name: 'Caio Menezes de Matos Luiz',
      cpf: '448.645.818-43',
      email: 'eucaiotucai@gmail.com',
      telephone: '(16) 99248-1655',
      number: 2,
    },
    {
      key: '3',
      name: 'Lucca Menezes de Matos Luiz',
      cpf: '448.645.798-65',
      email: 'luccagay@gmail.com',
      telephone: '(16) 99788-2584',
      number: 3,
    },
  ];
  
 
 
 
  return (
    <Sidebar>
      <Content>
      <Flex gap="small" wrap="wrap">
        <Button type="primary" icon = {<PlusCircleOutlined />} onClick={() => navigate("/customers/form")}>Adicionar Veículo</Button>
        </Flex> 
        <Space size="20px" />        
        <h3>Veículos</h3>
        <Table columns={columns} dataSource={data} />
      </Content>  
    </Sidebar>
  )
}

export default vehicles
import React from 'react'
import {  Sidebar } from '../../components'
import { Table, Tag, Button, Flex } from 'antd';
import Space from '../../components/Space/Space';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom"
import {PlusCircleOutlined} from '@ant-design/icons'


const customer = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'N°',
      dataIndex: 'number',
      key: '1',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: '2',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: '3',
    },
    {
      title: 'Estoque',
      dataIndex: 'stock',
      key: '4',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
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
      name: 'Bomba de Combustível',
      description: 'Yamaha Nmax 160',
      stock: 10,
      price: 'R$ 357,00',
      number: 1,
    },
    {
      key: '2',
      name: 'Pastilha de Freio',
      description: 'Fiat Uno 1.0 Vivace 8v Flex Ano 2012 Syl',
      stock: 5,
      price: 'R$ 65,90',
      number: 2,
    },
    {
      key: '3',
      name: 'Óleo Lubrificante',
      description: 'Lubrax Valora Sintético 5w30 1 Litro',
      stock: 7,
      price: 'R$ 32,45',
      number: 3,
    },
  ];
  
 
 
 
  return (
    <Sidebar>
      <Content>
      <Flex gap="small" wrap="wrap">
        <Button type="primary" icon = {<PlusCircleOutlined />} onClick={() => navigate("/customers/form")}>Adicionar Produto</Button>
        </Flex> 
        <Space size="20px" />        
        <h3>Produtos</h3>
        <Table columns={columns} dataSource={data} />
      </Content>  
    </Sidebar>
  )
}

export default customer
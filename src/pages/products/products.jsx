import React, { useEffect, useState } from 'react'  
import {  Sidebar } from '../../components'
import { Table,  Button, Flex } from 'antd';
import Space from '../../components/Space/Space';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom"
import {PlusCircleOutlined} from '@ant-design/icons'
import StyledContainer from '../../components/Container/StyledContainer';
import api from '../../services/api';


const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/api/Produto");
        console.log("Dados Recebidos:", response.data);
       const data = response.data.dados.map(Products => ({
        ...Products,
        key: Products.id,
       }));
       setProducts(data);
      } catch (error)  {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    getProducts();
  }, []);

  const columns = [
    {
      title: 'N°',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Estoque',
      dataIndex: 'estoque',
      key: 'estoque',
    },
    {
      title: 'Preço',
      dataIndex: 'precoDeVenda',
      key: 'precoDeVenda',
    
     
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
        <Button type="primary" icon = {<PlusCircleOutlined />} onClick={() => navigate("/customers/form")}>Adicionar Produto</Button>
        </Flex> 
        <StyledContainer>
        <Space size="20px" />        
        <h3>Produtos</h3>
        <Table 
          columns={columns} 
          dataSource={products}
        />
        </StyledContainer>
      </Content>  
    </Sidebar>
  )
}

export default Products
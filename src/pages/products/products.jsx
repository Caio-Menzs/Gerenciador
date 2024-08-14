import React, { useEffect, useState } from 'react'  
import  Sidebar  from '../../components/Sidebar/Sidebar';
import { Table,  Button, Flex, Modal } from 'antd';
import CustomButton from '../../components/CustomButton/CustomButton';
import Content from '../../components/Content/Content';
import { useNavigate } from "react-router-dom"
import {PlusCircleOutlined} from '@ant-design/icons'
import StyledContainer from '../../components/Container/StyledContainer';
import api from '../../services/api';
import ProductForm from "../products/productsForm";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();


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
      <CustomButton icon={<PlusCircleOutlined />} label = "Produto"  onClick={showModal} />
      </Flex> 

        <StyledContainer>

         
        <h3>Produtos</h3>
        <Table 
          columns={columns} 
          dataSource={products}
          rowKey="id"
        />
        </StyledContainer>
        <Modal 
          title ="Novo Produto"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer ={null}
        >
       <ProductForm onClose={{handleCancel}}/> 
       </Modal>
      </Content>  
    </Sidebar>
  )
}

export default Products
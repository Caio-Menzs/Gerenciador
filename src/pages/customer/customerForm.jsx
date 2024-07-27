import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import { Sidebar } from '../../components';
import Content from '../../components/Content/Content';

const { Item } = Form;

const CustomerForm = () => {

  const onFinish = (values) => {
    console.log('Form values:', values);

    const apiData = {
      nome: values.name,
      documento: values.cpf,
      email: values.email,
      telefone: parseInt(values.phone),
      dataDeCriacao: new Date().toISOString(),
      dataDeAlteracao: new Date().toISOString(),
    };  

    axios.post('https://localhost:7015/api/Cliente', apiData)  
      .then(response => {
        console.log('Resposta da API:', response.data);
        message.success('Dados enviados com sucesso!');
        

      
      })
      .catch(error => {
        console.error('Erro ao enviar dados para a API:', error);
        if (error.response) {
          message.error(`Erro ${error.response.status}: ${error.response.data.message}`);
        } else if (error.request) {
          message.error('Não foi possível conectar à API.');
        } else {
          message.error('Erro ao processar a requisição.');
        }
      });
  };

  return (
    <Sidebar>
      <Content>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Nome"
                name="name"
                rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="CPF/CNPJ"
                name="cpf_cnpj"
                rules={[{ required: true, message: 'Por favor, insira seu CPF ou CNPJ!' }]}
              >
                <Input />
              </Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="E-mail"
                name="email"
                rules={[
                  { type: 'email', message: 'E-mail inválido!' },
                  { required: true, message: 'Por favor, insira seu e-mail!' },
                ]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Telefone"
                name="phone"
                rules={[{ required: true, message: 'Por favor, insira seu telefone!' }]}
              >
                <Input />
              </Item>
            </Col>
          </Row>

          <Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Item>
        </Form>
      </Content>
    </Sidebar>
  );
};

export default CustomerForm;

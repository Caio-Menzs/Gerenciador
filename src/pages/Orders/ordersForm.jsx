import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Row, Col, Select, Tabs } from 'antd';
import axios from 'axios';

const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

const OrderForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const [clientes, setClientes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  useEffect(() => {
    // Fetch clients
    axios.get('https://localhost:7183/api/Cliente')
      .then(response => {
        console.log('Dados recebidos da API de clientes:', response.data);
        if (response.data && Array.isArray(response.data.dados)) {
          setClientes(response.data.dados);
        } else {
          message.error('Formato de dados de clientes inválido.');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
        message.error('Erro ao carregar lista de clientes.');
      });

    // Fetch technicians
    axios.get('https://localhost:7183/api/Tecnico') // Atualize com a URL correta para obter técnicos
      .then(response => {
        console.log('Dados recebidos da API de técnicos:', response.data);
        if (response.data && Array.isArray(response.data.dados)) {
          setTecnicos(response.data.dados);
        } else {
          message.error('Formato de dados de técnicos inválido.');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar técnicos:', error);
        message.error('Erro ao carregar lista de técnicos.');
      });
  }, []);

  const onFinish = (values) => {
    console.log('Form values:', values);

    const apiData = {
      id: 0, // Se o ID é 0 para uma nova entrada
      cliente: values.cliente || '',
      tecnico: values.tecnico || '',
      status: values.status || '',
      dataInicio: values.dataInicio || '',
      dataFinal: values.dataFinal || '',
      garantia: parseInt(values.garantia, 10) || 0,
      termoGarantia: values.termoGarantia || '',
      descricao: values.descricao || '',
      defeito: values.defeito || '',
      observacoes: values.observacoes || '',
      laudo: values.laudo || '',
      produto: values.produto || '',
      precoProduto: parseFloat(values.precoProduto) || 0,
      quantidadeProduto: parseInt(values.quantidadeProduto, 10) || 0,
      servico: values.servico || '',
      precoServico: parseFloat(values.precoServico) || 0,
      quantidadeServico: parseInt(values.quantidadeServico, 10) || 0,
    };

    console.log('Dados enviados para a API:', apiData);

    axios.post('https://localhost:7183/api/OrdemServico', apiData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Resposta da API:', response.data);
      message.success('Dados enviados com sucesso!');
      form.resetFields();
      if (onClose) {
        onClose();
      }
    })
    .catch(error => {
      console.error('Erro ao enviar dados para a API:', error);
      if (error.response) {
        message.error(`Erro ${error.response.status}: ${error.response.data.mensagem || 'Erro desconhecido'}`);
      } else if (error.request) {
        message.error('Não foi possível conectar à API.');
      } else {
        message.error('Erro ao processar a requisição.');
      }
    });
  };

  return (
    <div className="order-form-container">
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="order-form"
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Informações Gerais" key="1">
            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Cliente"
                  name="cliente"
                  rules={[{ required: true, message: 'Por favor, selecione um cliente!' }]}
                >
                  <Select placeholder="Selecione um cliente">
                    {clientes.length > 0 ? (
                      clientes.map(cliente => (
                        <Option key={cliente.id} value={cliente.id}>
                          {cliente.nome}
                        </Option>
                      ))
                    ) : (
                      <Option disabled>Nenhum cliente disponível</Option>
                    )}
                  </Select>
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Técnico"
                  name="tecnico"
                  rules={[{ required: true, message: 'Por favor, selecione um técnico!' }]}
                >
                  <Select placeholder="Selecione um técnico">
                    {tecnicos.length > 0 ? (
                      tecnicos.map(tecnico => (
                        <Option key={tecnico.id} value={tecnico.id}>
                          {tecnico.nome}
                        </Option>
                      ))
                    ) : (
                      <Option disabled>Nenhum técnico disponível</Option>
                    )}
                  </Select>
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Item
                  label="Status"
                  name="status"
                  rules={[{ required: true, message: 'Por favor, insira o status!' }]}
                >
                  <Input />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Data Inicial"
                  name="dataInicio"
                  rules={[{ required: true, message: 'Por favor, insira a data inicial!' }]}
                >
                  <Input type="datetime-local" />
                </Item>
              </Col>
              <Col span={8}>
                <Item
                  label="Data Final"
                  name="dataFinal"
                  rules={[{ required: true, message: 'Por favor, insira a data final!' }]}
                >
                  <Input type="datetime-local" />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Garantia"
                  name="garantia"
                  rules={[{ required: true, message: 'Por favor, insira a garantia!' }]}
                >
                  <Input type="number" />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Termo de Garantia"
                  name="termoGarantia"
                >
                  <Input />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Descrição"
                  name="descricao"
                >
                  <Input />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Defeito"
                  name="defeito"
                >
                  <Input />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Observações"
                  name="observacoes"
                >
                  <Input />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Laudo"
                  name="laudo"
                >
                  <Input />
                </Item>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Produtos" key="2">
            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Produto"
                  name="produto"
                >
                  <Input />
                </Item>
              </Col>
              <Col span={6}>
                <Item
                  label="Preço do Produto"
                  name="precoProduto"
                  rules={[{ required: true, message: 'Por favor, insira o preço do produto!' }]}
                >
                  <Input type="number" step="0.01" />
                </Item>
              </Col>
              <Col span={6}>
                <Item
                  label="Quantidade do Produto"
                  name="quantidadeProduto"
                  rules={[{ required: true, message: 'Por favor, insira a quantidade do produto!' }]}
                >
                  <Input type="number" />
                </Item>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Serviços" key="3">
            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Serviço"
                  name="servico"
                >
                  <Input />
                </Item>
              </Col>
              <Col span={6}>
                <Item
                  label="Preço do Serviço"
                  name="precoServico"
                  rules={[{ required: true, message: 'Por favor, insira o preço do serviço!' }]}
                >
                  <Input type="number" step="0.01" />
                </Item>
              </Col>
              <Col span={6}>
                <Item
                  label="Quantidade do Serviço"
                  name="quantidadeServico"
                  rules={[{ required: true, message: 'Por favor, insira a quantidade do serviço!' }]}
                >
                  <Input type="number" />
                </Item>
              </Col>
            </Row>
          </TabPane>
        </Tabs>

        <Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default OrderForm;

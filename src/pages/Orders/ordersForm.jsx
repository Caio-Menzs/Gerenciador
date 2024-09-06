import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Row, Col, Select, Tabs } from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importando o estilo básico do Quill

const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

const OrderForm = ({ onClose, onOrderSaved }) => {
  const [form] = Form.useForm();
  const [clientes, setClientes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);

  const [descricao, setDescricao] = useState('');
  const [defeito, setDefeito] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [laudo, setLaudo] = useState('');

  useEffect(() => {
    // Fetch clients
    axios.get('https://localhost:7183/api/Cliente')
      .then(response => {
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
    axios.get('https://localhost:7183/api/Tecnico')
      .then(response => {
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

    // Fetch products
    axios.get('https://localhost:7183/api/Produto')
      .then(response => {
        if (response.data && Array.isArray(response.data.dados)) {
          setProdutos(response.data.dados);
        } else {
          message.error('Formato de dados de produtos inválido.');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        message.error('Erro ao carregar lista de produtos.');
      });

    // Fetch services
    axios.get('https://localhost:7183/api/Servico')
      .then(response => {
        if (response.data && Array.isArray(response.data.dados)) {
          setServicos(response.data.dados);
        } else {
          message.error('Formato de dados de serviços inválido.');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar serviços:', error);
        message.error('Erro ao carregar lista de serviços.');
      });
  }, []);

  const onFinish = (values) => {
    const apiData = {
      id: 0,
      cliente: values.cliente || '',
      tecnico: values.tecnico || '',
      status: values.status || '',
      dataInicio: values.dataInicio || '',
      dataFinal: values.dataFinal || '',
      garantia: parseInt(values.garantia, 10) || 0,
      termoGarantia: values.termoGarantia || '',
      descricao: descricao || '',
      defeito: defeito || '',
      observacoes: observacoes || '',
      laudo: laudo || '',
      produto: values.produto || '',
      precoProduto: parseFloat(values.precoProduto) || 0,
      quantidadeProduto: parseInt(values.quantidadeProduto, 10) || 0,
      servico: values.servico || '',
      precoServico: parseFloat(values.precoServico) || 0,
      quantidadeServico: parseInt(values.quantidadeServico, 10) || 0,
    };

    axios.post('https://localhost:7183/api/OrdemServico/create', apiData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      message.success('Dados enviados com sucesso!');
      form.resetFields();
      setDescricao('');
      setDefeito('');
      setObservacoes('');
      setLaudo('');
      if (onClose) {
        onClose();
      }
      if (onOrderSaved) {
        onOrderSaved(); // Chama o callback quando a ordem for salva
      }
    })
    .catch(error => {
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
                <Input />
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
                  label="Garantia (Dias)"
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
                <Item label="Descrição" name="descricao">
                  <ReactQuill value={descricao} onChange={setDescricao} />
                </Item>
              </Col>
              <Col span={12}>
                <Item label="Defeito" name="defeito">
                  <ReactQuill value={defeito} onChange={setDefeito} />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Item label="Observações" name="observacoes">
                  <ReactQuill value={observacoes} onChange={setObservacoes} />
                </Item>
              </Col>
              <Col span={12}>
                <Item label="Laudo" name="laudo">
                  <ReactQuill value={laudo} onChange={setLaudo} />
                </Item>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Produtos e Serviços" key="2">
            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Produto"
                  name="produto"
                  rules={[{ required: true, message: 'Por favor, selecione um produto!' }]}
                >
                  <Select placeholder="Selecione um produto">
                    {produtos.length > 0 ? (
                      produtos.map(produto => (
                        <Option key={produto.id} value={produto.id}>
                          {produto.nome}
                        </Option>
                      ))
                    ) : (
                      <Option disabled>Nenhum produto disponível</Option>
                    )}
                  </Select>
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

            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Serviço"
                  name="servico"
                  rules={[{ required: true, message: 'Por favor, selecione um serviço!' }]}
                >
                  <Select placeholder="Selecione um serviço">
                    {servicos.length > 0 ? (
                      servicos.map(servico => (
                        <Option key={servico.id} value={servico.id}>
                          {servico.nome}
                        </Option>
                      ))
                    ) : (
                      <Option disabled>Nenhum serviço disponível</Option>
                    )}
                  </Select>
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

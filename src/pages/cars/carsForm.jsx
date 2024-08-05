import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Row, Col, Select } from 'antd';
import axios from 'axios';
import './carsForm.css';

const { Item } = Form;
const { Option } = Select;

const VehicleForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7183/api/Cliente')
      .then(response => {
        console.log('Dados recebidos da API:', response.data);
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
  }, []);

  const onFinish = (values) => {
    console.log('Form values:', values);

    // Encontrar o cliente selecionado pelo ID
    const clienteSelecionado = clientes.find(cliente => cliente.id === values.cliente);

    // Formatar os dados para enviar para a API
    const apiData = {
      id: 0, // Se o ID é 0 para uma nova entrada
      cliente: clienteSelecionado ? clienteSelecionado.nome : '', // Nome do cliente selecionado
      placa: values.placa || '',
      cor: values.cor || '',
      anoFabricacao: parseInt(values.anoFabricacao, 10) || 0,
      anoModelo: parseInt(values.anoModelo, 10) || 0,
      combustivel: values.combustivel || '',
      numeroChassi: values.numeroChassi || '',
      numeroPatrimonio: values.numeroPatrimonio || '',
      marca: values.marca || '',
      modelo: values.modelo || '',
      observacao: values.observacao || '',
      idCliente: values.cliente || 0 // ID do cliente selecionado
    };

    console.log('Dados enviados para a API:', apiData);

    axios.post('https://localhost:7183/api/Veiculo', apiData, {
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
    <div className="vehicle-form-container">
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="vehicle-form"
      >
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
              label="Placa"
              name="placa"
              rules={[{ required: true, message: 'Por favor, insira a placa!' }]}
            >
              <Input />
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Item
              label="Cor"
              name="cor"
              rules={[{ required: true, message: 'Por favor, insira a cor!' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={8}>
            <Item
              label="Ano de Fabricação"
              name="anoFabricacao"
              rules={[{ required: true, message: 'Por favor, insira o ano de fabricação!' }]}
            >
              <Input type="number" />
            </Item>
          </Col>
          <Col span={8}>
            <Item
              label="Ano do Modelo"
              name="anoModelo"
              rules={[{ required: true, message: 'Por favor, insira o ano do modelo!' }]}
            >
              <Input type="number" />
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="Combustível"
              name="combustivel"
              rules={[{ required: true, message: 'Por favor, insira o tipo de combustível!' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Número do Chassi"
              name="numeroChassi"
              rules={[{ required: true, message: 'Por favor, insira o número do chassi!' }]}
            >
              <Input />
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="Número de Patrimônio"
              name="numeroPatrimonio"
              rules={[{ required: true, message: 'Por favor, insira o número de patrimônio!' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Marca"
              name="marca"
              rules={[{ required: true, message: 'Por favor, insira a marca!' }]}
            >
              <Input />
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="Modelo"
              name="modelo"
              rules={[{ required: true, message: 'Por favor, insira o modelo!' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Observação"
              name="observacao"
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
    </div>
  );
};

export default VehicleForm;

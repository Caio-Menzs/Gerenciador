import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import axios from 'axios';
import InputMask from 'react-input-mask';
import './CustomerForm.css';

const { Item } = Form;

const CustomerForm = ({ onClose }) => { 
  const [form] = Form.useForm();
  const [cpfCnpjMask, setCpfCnpjMask] = useState('999.999.999-99');
  const [phoneMask, setPhoneMask] = useState('(99) 9999-9999');

  const fetchAddress = (cep) => {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        if (response.data.erro) {
          message.error('CEP não encontrado!');
          return;
        }

        const { logradouro, bairro, localidade, uf } = response.data;
        form.setFieldsValue({
          address: logradouro,
          district: bairro,
          city: localidade,
          state: uf,
        });
      })
      .catch(error => {
        message.error('Erro ao buscar CEP!');
        console.error('Erro ao buscar CEP:', error);
      });
  };

  const onCpfCnpjChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
      setCpfCnpjMask('99.999.999/9999-99');
    } else {
      setCpfCnpjMask('999.999.999-99');
    }
  };

  const onPhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
      setPhoneMask('(99) 99999-9999');
    } else {
      setPhoneMask('(99) 9999-9999');
    }
  };

  const onFinish = (values) => {
    console.log('Form values:', values);

    const apiData = {
      nome: values.name || null,
      email: values.email || null,
      contato: values.phone.replace(/\D/g, '') || null,
      documento: values.cpf_cnpj.replace(/\D/g, '') || null,
      cep: values.cep.replace(/\D/g, '') || null,
      endereco: values.address || null,
      numero: parseInt(values.number, 10) || null,
      bairro: values.district || null,
      cidade: values.city || null,
      estado: values.state || null,
      ativo: true,
      dataDeCriacao: new Date().toISOString(),
      dataDeAlteracao: new Date().toISOString(),
    };

    if (values.complement) {
      apiData.complemento = values.complement;
    }

    axios.post('https://localhost:7183/api/Cliente', apiData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Resposta da API:', response.data);
        message.success('Dados enviados com sucesso!');
        form.resetFields(); // Limpa o formulário após sucesso
        if (onClose) {
          onClose(); // Fecha o modal se a função onClose for fornecida
        }
        // Redireciona ou recarrega a página após o sucesso
        window.location.reload();
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
    <div className="customer-form-container">
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="customer-form"
      >
        <Row gutter={16}>
          <Col span={14}>
            <Item
              label="Nome"
              name="name"
              rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={10}>
            <Item
              label="CPF/CNPJ"
              name="cpf_cnpj"
              rules={[{ required: true, message: 'Por favor, insira seu CPF ou CNPJ!' }]}
            >
              <InputMask
                mask={cpfCnpjMask}
                onChange={onCpfCnpjChange}
              >
                {(inputProps) => <Input {...inputProps} />}
              </InputMask>
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={14}>
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
          <Col span={10}>
            <Item
              label="Telefone"
              name="phone"
              rules={[{ required: true, message: 'Por favor, insira seu telefone!' }]}
            >
              <InputMask
                mask={phoneMask}
                onChange={onPhoneChange}
              >
                {(inputProps) => <Input {...inputProps} />}
              </InputMask>
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Item
              label="CEP"
              name="cep"
              rules={[{ required: true, message: 'Por favor, insira seu CEP!' }]}
            >
              <InputMask
                mask="99999-999"
                onBlur={(e) => fetchAddress(e.target.value)}
              >
                {(inputProps) => <Input {...inputProps} />}
              </InputMask>
            </Item>
          </Col>
          <Col span={16}>
            <Item
              label="Endereço"
              name="address"
              rules={[{ required: true, message: 'Por favor, insira seu endereço!' }]}
            >
              <Input />
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Item
              label="Número"
              name="number"
              rules={[{ required: true, message: 'Por favor, insira o número!' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={18}>
            <Item
              label="Complemento"
              name="complement"
            >
              <Input />
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="Bairro"
              name="district"
              rules={[{ required: true, message: 'Por favor, insira seu bairro!' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Cidade"
              name="city"
              rules={[{ required: true, message: 'Por favor, insira sua cidade!' }]}
            >
              <Input />
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={4}>
            <Item
              label="Estado"
              name="state"
              rules={[{ required: true, message: 'Por favor, insira seu estado!' }]}
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

export default CustomerForm;

import React from 'react';
import { Form, Input, InputNumber, Button, message, Row, Col } from 'antd';
import axios from 'axios';


const { Item } = Form;

const ProductForm = ({ onClose }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);

    const apiData = {
      codigo: values.code || null,
      descricao: values.description || null,
      quantidade: values.quantity || null,
      precoVenda: values.salePrice || null,
      precoCusto: values.costPrice || null,
      ativo: true,
      dataDeCriacao: new Date().toISOString(),
      dataDeAlteracao: new Date().toISOString(),
    };

    axios.post('https://localhost:7183/api/Produto', apiData, {
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
    <div className="product-form-container">
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="product-form"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="Código"
              name="code"
              rules={[{ required: false, message: 'Por favor, insira o código do produto!' }]}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Descrição"
              name="description"
              rules={[{ required: true, message: 'Por favor, insira a descrição do produto!' }]}
            >
              <Input />
            </Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Item
              label="Quantidade"
              name="quantity"
              rules={[{ required: true, message: 'Por favor, insira a quantidade do produto!' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Item>
          </Col>
          <Col span={8}>
            <Item
              label="Preço de Venda"
              name="salePrice"
              rules={[{ required: true, message: 'Por favor, insira o preço de venda do produto!' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                formatter={value => `R$ ${value}`}
                parser={value => value.replace('R$ ', '')}
              />
            </Item>
          </Col>
          <Col span={8}>
            <Item
              label="Preço de Custo"
              name="costPrice"
              rules={[{ required: true, message: 'Por favor, insira o preço de custo do produto!' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                formatter={value => `R$ ${value}`}
                parser={value => value.replace('R$ ', '')}
              />
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

export default ProductForm;

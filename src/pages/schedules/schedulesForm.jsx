import React from 'react';
import { Form, Input, DatePicker, Button, message, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Item } = Form;

const AgendamentoForm = ({ onClose }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);

    const apiData = {
      title: values.title || null,
      start: values.start ? values.start.toISOString() : null,
      end: values.end ? values.end.toISOString() : null,
      description: values.description || null,
    };

    axios.post('https://localhost:7183/api/Agendamento', apiData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Resposta da API:', response.data);
        message.success('Agendamento criado com sucesso!');
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
    <div className="agendamento-form-container">
      <Form
        form={form}
        name="agendamento"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="agendamento-form"
      >
        <Item
          label="Título"
          name="title"
          rules={[{ required: true, message: 'Por favor, insira o título do agendamento!' }]}
        >
          <Input />
        </Item>

        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="Horário de Início"
              name="start"
              rules={[{ required: true, message: 'Por favor, insira o horário de início!' }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Horário Final"
              name="end"
              rules={[{ required: true, message: 'Por favor, insira o horário final!' }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            </Item>
          </Col>
        </Row>

        <Item
          label="Descrição"
          name="description"
          rules={[{ required: false, message: 'Por favor, insira uma descrição opcional!' }]}
        >
          <Input.TextArea rows={4} />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default AgendamentoForm;

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Row, Col, Select, Tabs } from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

const OrderForm = ({ onClose, onOrderSaved }) => {
  const [form] = Form.useForm();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);

  const [descricao, setDescricao] = useState('');
  const [defeito, setDefeito] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [laudo, setLaudo] = useState('');

  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  const fetchData = () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
  };

  const removeHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const onFinish = (values) => {
    if (!clienteSelecionado) {
      message.error('Por favor, selecione um cliente.');
      return;
    }
  
    const ordemServicoData = {
      id_Ordem: 0,
      id_Cliente: clienteSelecionado.id,
      cliente: clienteSelecionado.nome,
      tecnico: values.tecnico || null,
      status: values.status || null,
      dataInicio: formatDate(values.dataInicio) || null,
      dataFinal: formatDate(values.dataFinal) || null,
      garantia: values.garantia ? parseInt(values.garantia, 10) : 0,
      termoGarantia: values.termoGarantia || null,
      descricao: removeHtmlTags(descricao) || null,
      defeito: removeHtmlTags(defeito) || null,
      observacoes: removeHtmlTags(observacoes) || null,
      laudo: removeHtmlTags(laudo) || null,
    };
  
    console.log("Dados da ordem de serviço:", ordemServicoData);
  
    let ordemId; 
  
    axios.post('https://localhost:7183/api/OrdemServico/create', ordemServicoData)
      .then(response => {
        console.log('Resposta da criação da ordem:', response);
        ordemId = response.data.dados[0]?.id_Ordem; 
        if (!ordemId) {
          message.error('Erro ao obter o ID da ordem de serviço.');
          return;
        }
  
        if (!produtoSelecionado) {
          message.error('Por favor, selecione um produto.');
          return;
        }
  
        const produtoData = {
          id: 0,
          iD_Ordem: ordemId,
          iD_Produto: produtoSelecionado,
          produto: produtos.find(produto => produto.id === produtoSelecionado)?.descricao || '',
          precoProduto: values.precoProduto ? parseFloat(values.precoProduto) : 0.0,
          quantidadeProduto: values.quantidadeProduto ? parseInt(values.quantidadeProduto, 10) : 0,
        };
  
        console.log('Dados do produto da ordem de serviço:', produtoData);
        return axios.post('https://localhost:7183/api/OrdemServicoProduto', produtoData);
      })
      .then(() => {
        console.log('Produto criado com sucesso.');
        if (!servicoSelecionado) {
          message.error('Por favor, selecione um serviço.');
          return;
        }
  
        const servicoData = {
          id: 0,
          id_Ordem: ordemId, 
          id_Servico: servicoSelecionado,
          servico: servicos.find(servico => servico.id === servicoSelecionado)?.descricao || '', 
          precoServico: values.precoServico ? parseFloat(values.precoServico) : 0.0,
          quantidadeServico: values.quantidadeServico ? parseInt(values.quantidadeServico, 10) : 0,
        };
  
        console.log('Preparando dados do serviço:', servicoData);
        return axios.post('https://localhost:7183/api/OrdemServicoServico', servicoData);
      })
      .then(() => {
        message.success('Dados enviados com sucesso!');
        form.resetFields();
        setDescricao('');
        setDefeito('');
        setObservacoes('');
        setLaudo('');
        setClienteSelecionado(null);
        setProdutoSelecionado(null);
        setServicoSelecionado(null);
        
        fetchData();
  
        if (onClose) {
          onClose();
        }
        if (onOrderSaved) {
          onOrderSaved();
        }
      })
      .catch(error => {
        if (error.response) {
          console.error("Erro de resposta:", error.response.data);
          message.error(`Erro ${error.response.status}: ${error.response.data.message || 'Erro desconhecido'}`);
        } else {
          console.error('Erro ao processar a requisição:', error);
          message.error('Erro ao processar a requisição.');
        }
      });
  };

  const handleClienteChange = (value) => {
    const cliente = clientes.find(cliente => cliente.id === value);
    setClienteSelecionado(cliente);
  };

  const handleProdutoChange = (value) => {
    setProdutoSelecionado(value);
  };

  const handleServicoChange = (value) => {
    setServicoSelecionado(value);
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
                  <Select placeholder="Selecione um cliente" onChange={handleClienteChange}>
                    {clientes.map(cliente => (
                      <Option key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </Option>
                    ))}
                  </Select>
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Técnico"
                  name="tecnico"
                  rules={[{ required: true, message: 'Por favor, insira o nome do técnico!' }]}
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
              <Col span={24}>
              <Item label="Descrição">
                  <ReactQuill value={descricao} onChange={setDescricao} />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Item label="Defeito">
                  <ReactQuill value={defeito} onChange={setDefeito} />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Item label="Observações">
                  <ReactQuill value={observacoes} onChange={setObservacoes} />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Item label="Laudo">
                  <ReactQuill value={laudo} onChange={setLaudo} />
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
                  rules={[{ required: true, message: 'Por favor, selecione um produto!' }]}
                >
                  <Select onChange={handleProdutoChange}>
                    {produtos.map(produto => (
                      <Option key={produto.id} value={produto.id}>
                        {produto.descricao}
                      </Option>
                    ))}
                  </Select>
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Preço"
                  name="precoProduto"
                  rules={[{ required: true, message: 'Por favor, insira o preço!' }]}
                >
                  <Input type="number" />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Quantidade"
                  name="quantidadeProduto"
                  rules={[{ required: true, message: 'Por favor, insira a quantidade!' }]}
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
                  rules={[{ required: true, message: 'Por favor, selecione um serviço!' }]}
                >
                  <Select onChange={handleServicoChange}>
                    {servicos.map(servico => (
                      <Option key={servico.id} value={servico.id}>
                        {servico.nome}
                      </Option>
                    ))}
                  </Select>
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  label="Preço"
                  name="precoServico"
                  rules={[{ required: true, message: 'Por favor, insira o preço!' }]}
                >
                  <Input type="number" />
                </Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Item
                  label="Quantidade"
                  name="quantidadeServico"
                  rules={[{ required: true, message: 'Por favor, insira a quantidade!' }]}
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

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Row, Col, Select, Tabs, List } from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';

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

  const [produtosAdicionados, setProdutosAdicionados] = useState([]);
  const [servicosAdicionados, setServicosAdicionados] = useState([]);

  // Função para buscar dados de clientes, produtos e serviços
  const fetchData = async () => {
    try {
      const [clientesResponse, produtosResponse, servicosResponse] = await Promise.all([
        axios.get('https://localhost:7183/api/Cliente'),
        axios.get('https://localhost:7183/api/Produto'),
        axios.get('https://localhost:7183/api/Servico'),
      ]);

      setClientes(clientesResponse.data.dados || []);
      setProdutos(produtosResponse.data.dados || []);
      setServicos(servicosResponse.data.dados || []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      message.error('Erro ao carregar dados.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (date) => (date ? new Date(date).toISOString() : null);

  const removeHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const onFinish = async (values) => {
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
      dataInicio: formatDate(values.dataInicio),
      dataFinal: formatDate(values.dataFinal),
      garantia: values.garantia ? parseInt(values.garantia, 10) : 0,
      termoGarantia: values.termoGarantia || null,
      descricao: removeHtmlTags(descricao) || null,
      defeito: removeHtmlTags(defeito) || null,
      observacoes: removeHtmlTags(observacoes) || null,
      laudo: removeHtmlTags(laudo) || null,
    };

    console.log("Dados da ordem de serviço:", ordemServicoData);

    try {
      const { data } = await axios.post('https://localhost:7183/api/OrdemServico/create', ordemServicoData);
      const ordemId = data.dados[0]?.id_Ordem;

      if (!ordemId) {
        message.error('Erro ao obter o ID da ordem de serviço.');
        return;
      }

      for (const produto of produtosAdicionados) {
        const produtoData = {
          id: 0,
          iD_Ordem: ordemId,
          iD_Produto: produto.id,
          produto: produto.descricao,
          precoProduto: produto.preco,
          quantidadeProduto: produto.quantidade,
        };

        await axios.post('https://localhost:7183/api/OrdemServicoProduto', produtoData);
      }

      for (const servico of servicosAdicionados) {
        const servicoData = {
          id: 0,
          id_Ordem: ordemId,
          id_Servico: servico.id,
          servico: servico.descricao,
          precoServico: servico.preco,
          quantidadeServico: servico.quantidade,
        };

        await axios.post('https://localhost:7183/api/OrdemServicoServico', servicoData);
      }
      
      message.success('Dados enviados com sucesso!');
      form.resetFields();
      setDescricao('');
      setDefeito('');
      setObservacoes('');
      setLaudo('');
      setClienteSelecionado(null);
      setProdutoSelecionado(null);
      setServicoSelecionado(null);
      setProdutosAdicionados([]);
      setServicosAdicionados([]);

      if (onClose) {
        onClose();
      }
      if (onOrderSaved) {
        onOrderSaved();
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      message.error('Erro ao processar a requisição.');
    }
  };

  const handleClienteChange = (value) => {
    const cliente = clientes.find(cliente => cliente.id === value);
    setClienteSelecionado(cliente);
  };

  const handleProdutoChange = (value) => setProdutoSelecionado(value);
  const handleServicoChange = (value) => setServicoSelecionado(value);

  const adicionarProduto = () => {
    const produto = produtos.find(produto => produto.id === produtoSelecionado);
    if (produto) {
      const novoProduto = {
        id: produto.id,
        descricao: produto.descricao,
        preco: form.getFieldValue('precoProduto'),
        quantidade: form.getFieldValue('quantidadeProduto'),
      };
      setProdutosAdicionados([...produtosAdicionados, novoProduto]);
      form.resetFields(['produto', 'precoProduto', 'quantidadeProduto']);
    }
  };

  const adicionarServico = () => {
    const servico = servicos.find(servico => servico.id === servicoSelecionado);
    if (servico) {
      const novoServico = {
        id: servico.id,
        descricao: servico.descricao,
        preco: form.getFieldValue('precoServico'),
        quantidade: form.getFieldValue('quantidadeServico'),
      };
      setServicosAdicionados([...servicosAdicionados, novoServico]);
      form.resetFields(['servico', 'precoServico', 'quantidadeServico']);
    }
  };

  return (
    <Sidebar>
      <Content>
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
                    <Item label="Termo de Garantia" name="termoGarantia">
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
                    <Item label="Produto" name="produto" rules={[{ required: false, message: 'Por favor, selecione um produto!' }]}>
                      <Select placeholder="Selecione um produto" onChange={handleProdutoChange}>
                        {produtos.map(produto => (
                          <Option key={produto.id} value={produto.id}>
                            {produto.descricao}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                  <Col span={6}>
                    <Item label="Preço" name="precoProduto">
                      <Input type="number" />
                    </Item>
                  </Col>
                  <Col span={6}>
                    <Item label="Quantidade" name="quantidadeProduto">
                      <Input type="number" />
                    </Item>
                  </Col>
                  <Col span={24}>
                    <Button type="primary" onClick={adicionarProduto}>
                      Adicionar Produto
                    </Button>
                  </Col>
                </Row>
                <List
                  header="Produtos Adicionados"
                  bordered
                  dataSource={produtosAdicionados}
                  renderItem={item => (
                    <List.Item>
                      {item.descricao} - Preço: {item.preco} - Quantidade: {item.quantidade}
                    </List.Item>
                  )}
                />
              </TabPane>

              <TabPane tab="Serviços" key="3">
                <Row gutter={16}>
                  <Col span={12}>
                  <Item label="Serviço" name="servico" rules={[{ required: false, message: 'Por favor, selecione um serviço!' }]}>
                      <Select placeholder="Selecione um serviço" onChange={handleServicoChange}>
                        {servicos.map(servico => (
                          <Option key={servico.id} value={servico.id}>
                            {servico.nome}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                  <Col span={6}>
                    <Item label="Preço" name="precoServico">
                      <Input type="number" />
                    </Item>
                  </Col>
                  <Col span={6}>
                    <Item label="Quantidade" name="quantidadeServico">
                      <Input type="number" />
                    </Item>
                  </Col>
                  <Col span={24}>
                    <Button type="primary" onClick={adicionarServico}>
                      Adicionar Serviço
                    </Button>
                  </Col>
                </Row>
                <List
                  header="Serviços Adicionados"
                  bordered
                  dataSource={servicosAdicionados}
                  renderItem={item => (
                    <List.Item>
                      {item.nome} - Preço: {item.preco} - Quantidade: {item.quantidade}
                    </List.Item>
                  )}
                
                />
              </TabPane>
            </Tabs>

            <Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Item>
          </Form>
        </div>
      </Content>
    </Sidebar>
  );
};

export default OrderForm;

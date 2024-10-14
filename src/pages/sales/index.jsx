import React, { useState } from 'react';
import { Layout, Typography, Button, Table, Input, Tabs, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar/Sidebar';



const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const PontoDeVenda = () => {
  const [produto, setProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');
  const [valorUnitarioProduto, setValorUnitarioProduto] = useState('');
  const [servico, setServico] = useState('');
  const [quantidadeServico, setQuantidadeServico] = useState('');
  const [valorUnitarioServico, setValorUnitarioServico] = useState('');
  const [produtosAdicionados, setProdutosAdicionados] = useState([]);
  const [servicosAdicionados, setServicosAdicionados] = useState([]);

  const adicionarProduto = () => {
    const valorTotal = parseFloat(quantidadeProduto) * parseFloat(valorUnitarioProduto);
    const novoProduto = {
      key: produtosAdicionados.length + 1,
      produto,
      quantidade: quantidadeProduto,
      valorUnitario: valorUnitarioProduto,
      valorTotal,
    };
    
    setProdutosAdicionados([...produtosAdicionados, novoProduto]);
    setProduto('');
    setQuantidadeProduto('');
    setValorUnitarioProduto('');
  };

  const adicionarServico = () => {
    const valorTotal = parseFloat(quantidadeServico) * parseFloat(valorUnitarioServico);
    const novoServico = {
      key: servicosAdicionados.length + 1,
      servico,
      quantidade: quantidadeServico,
      valorUnitario: valorUnitarioServico,
      valorTotal,
    };
    
    setServicosAdicionados([...servicosAdicionados, novoServico]);
    setServico('');
    setQuantidadeServico('');
    setValorUnitarioServico('');
  };

  const columnsProdutos = [
    {
      title: 'Produto',
      dataIndex: 'produto',
      key: 'produto',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
    {
      title: 'Valor Unitário',
      dataIndex: 'valorUnitario',
      key: 'valorUnitario',
      render: (text) => formatarNumero(text),
    },
    {
      title: 'Valor Total',
      dataIndex: 'valorTotal',
      key: 'valorTotal',
      render: (text) => formatarNumero(text),
    },
  ];

  const columnsServicos = [
    {
      title: 'Serviço',
      dataIndex: 'servico',
      key: 'servico',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
    {
      title: 'Valor Unitário',
      dataIndex: 'valorUnitario',
      key: 'valorUnitario',
      render: (text) => formatarNumero(text),
    },
    {
      title: 'Valor Total',
      dataIndex: 'valorTotal',
      key: 'valorTotal',
      render: (text) => formatarNumero(text),
    },
  ];

  const formatarNumero = (numero) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numero);
  };

  return (
    <Sidebar>
      <Content>
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001980', color: '#fff' }}>
        <Title level={3} style={{ color: '#fff' }}>Ponto de Venda</Title>
        <div>
          <UserOutlined /> Nome do Usuário
        </div>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Produtos" key="1">
            <Row gutter={16}>
              <Col span={8}>
                <Input
                  placeholder="Produto"
                  value={produto}
                  onChange={(e) => setProduto(e.target.value)}
                />
                <Input
                  placeholder="Quantidade"
                  type="number"
                  value={quantidadeProduto}
                  onChange={(e) => setQuantidadeProduto(e.target.value)}
                />
               
                <Button type="primary" onClick={adicionarProduto}>Adicionar Produto</Button>
              </Col>
              <Col span={16}>
                <Table
                  columns={columnsProdutos}
                  dataSource={produtosAdicionados}
                  pagination={false}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Serviços" key="2">
            <Row gutter={16}>
              <Col span={8}>
                <Input
                  placeholder="Serviço"
                  value={servico}
                  onChange={(e) => setServico(e.target.value)}
                />
                <Input
                  placeholder="Quantidade"
                  type="number"
                  value={quantidadeServico}
                  onChange={(e) => setQuantidadeServico(e.target.value)}
                />
                
                <Button type="primary" onClick={adicionarServico}>Adicionar Serviço</Button>
              </Col>
              <Col span={16}>
                <Table
                  columns={columnsServicos}
                  dataSource={servicosAdicionados}
                  pagination={false}
                />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {new Date().toLocaleString()}
      </Footer>
    </Layout>
    </Content>
    </Sidebar>
  );
};

export default PontoDeVenda;

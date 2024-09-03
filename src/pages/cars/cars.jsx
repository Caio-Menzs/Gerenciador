import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Table, Button, Input, Row, Col, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined, TeamOutlined, FormOutlined } from '@ant-design/icons';
import api from '../../services/api';
import StyledContainer from '../../components/Container/StyledContainer';
import Content from '../../components/Content/Content';
import VehicleForm from './carsForm';
import CustomButton from '../../components/CustomButton/CustomButton';

const { Search } = Input;

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isVehicleModalVisible, setIsVehicleModalVisible] = useState(false);
  const [isClientModalVisible, setIsClientModalVisible] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await api.get("/api/Veiculo");
        console.log("Dados recebidos:", response.data);
        const data = response.data.dados.map(vehicle => ({
          ...vehicle,
          key: vehicle.id,
        }));
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };

    getVehicles();  
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = vehicles.filter(vehicle => 
      vehicle.placa.toLowerCase().includes(value.toLowerCase()) ||
      vehicle.marca.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredVehicles(filteredData);
  };

  const columns = [
    {
      title: 'N°',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Placa',
      dataIndex: 'placa',
      key: 'placa',
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca',
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo',
      key: 'modelo',
    },
    {
      title: 'Cor',
      dataIndex: 'cor',
      key: 'cor',
    },
    {
      title: 'Ano',
      key: 'ano',
      render: (text, record) => `${record.anoFabricacao} / ${record.anoModelo}`,
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <>
          <Button icon={<FormOutlined />} onClick={() => handleEdit(record.id)} style={{ marginRight: 8 }}>Editar</Button>
          <Button 
            icon={<TeamOutlined />} 
            onClick={() => handleViewClients(record.id)}
          >
            Clientes
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`/cars/form/${id}`);
  };

  const showVehicleModal = () => {
    setIsVehicleModalVisible(true);
  };

  const handleCancelVehicleModal = () => {
    setIsVehicleModalVisible(false);
  };

  const handleViewClients = async (id) => {
    // Encontre o veículo correspondente para obter o idCliente
    const selectedVehicle = vehicles.find(vehicle => vehicle.id === id);

    if (!selectedVehicle) {
      console.error('Veículo não encontrado');
      return;
    }

    const clientId = selectedVehicle.idCliente;

    try {
      const response = await api.get(`api/Cliente/${clientId}`);
      console.log('Dados dos clientes:', response.data);
      const clientData = response.data.dados;

      if (clientData) {
        setSelectedClient(Array.isArray(clientData) ? clientData : [clientData]);
      } else {
        setSelectedClient([]);
      }

      setIsClientModalVisible(true);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setSelectedClient([]);
      setIsClientModalVisible(true);
    }
  };

  const handleCancelClientModal = () => {
    setIsClientModalVisible(false);
    setSelectedClient(null);
  };

  return (
    <Sidebar>
      <Content>
        <Row justify="space-between" align="middle" wrap="wrap">
          <Col>
            <CustomButton icon={<PlusCircleOutlined />} label="Veículo" onClick={showVehicleModal} />
          </Col>
          
          <Col>
            <Search
              placeholder="Buscar por placa ou marca"
              value={searchText}
              onChange={e => handleSearch(e.target.value)}
              style={{ width: 300, marginRight: 20 }} 
            />
          </Col>
        </Row>
        <StyledContainer>
          <h3 style={{ marginTop: '20px' }}> Veículos</h3>
          <Table columns={columns} dataSource={filteredVehicles} />
        </StyledContainer>
        <Modal 
          title="Novo Veículo" 
          visible={isVehicleModalVisible} 
          onCancel={handleCancelVehicleModal} 
          footer={null}
        >
          <VehicleForm onClose={handleCancelVehicleModal} />
        </Modal>
        <Modal 
          title="Informações do Cliente" 
          visible={isClientModalVisible} 
          onCancel={handleCancelClientModal} 
          footer={null}
        >
          
          {selectedClient && selectedClient.length > 0 ? (
            selectedClient.map(client => (
              <div key={client.id}>
                <p><strong>Nome:</strong> {client.nome}</p>
                <p><strong>CPF:</strong> {client.documento}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Telefone:</strong> {client.contato}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </Modal>
      </Content>
    </Sidebar>
  );
}

export default Vehicles;

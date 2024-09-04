import React, { useState } from 'react';
import { DollarOutlined, PlusCircleOutlined, ShoppingCartOutlined, ToolOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import CustomButton from '../../components/CustomButton/CustomButton';
import StyledContainer from '../../components/Container/StyledContainer';
import Calendario from '../../components/Calendar/Calendario';
import { Button, Modal } from 'antd';
import AgendamentoForm from './schedulesForm';
const Schedules = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Sidebar>
      <Content>
        <div style={{ marginBottom: '20px' }}>
          <CustomButton icon={<PlusCircleOutlined />} label="Agendamento" onClick={showModal} />
        </div>
        <StyledContainer>
          <h3 style={{ marginTop: '20px' }}>Agendamentos</h3>
          <Calendario />
        </StyledContainer>

        <Modal
          title="Novo Agendamento"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <AgendamentoForm onClose={handleCancel} />
        </Modal>
      </Content>
    </Sidebar>
  );
};

export default Schedules;

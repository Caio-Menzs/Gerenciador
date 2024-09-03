import React from 'react';
import { DollarOutlined, PlusCircleOutlined, ShoppingCartOutlined, ToolOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Content from '../../components/Content/Content';
import CustomButton from '../../components/CustomButton/CustomButton';
import events from '../../components/Events/events';
import { Button } from 'antd';
import Space from '../../components/Space/Space';
import StyledContainer from '../../components/Container/StyledContainer'
import Calendario from '../../components/Calendar/Calendario';

const localizer = momentLocalizer(moment);

const Schedules = () => {
  

  return (
    <Sidebar> 
      <Content>
      <div style={{ marginBottom: '20px' }}>
          <CustomButton icon={<PlusCircleOutlined />} label = "agendamento"  />
        </div>
        <StyledContainer>
        
        <h3 style={{ marginTop: '20px' }}>Agendamentos</h3>
         <Calendario />
        </StyledContainer>
      </Content>
    </Sidebar>
  );
};

export default Schedules;
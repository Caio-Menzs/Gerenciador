import React from 'react';
import { DollarOutlined, PlusCircleOutlined, ShoppingCartOutlined, ToolOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Content from '../../components/Content/Content';
import CustomButton from '../../components/CustomButton/CustomButton';

import { Button } from 'antd';
import Space from '../../components/Space/Space';
import StyledContainer from '../../components/Container/StyledContainer'

const localizer = momentLocalizer(moment);

const Schedules = () => {
  const events = [
    // Eventos 08/04/2024
    {
      title: "Evento 1",
      start: moment().set({ hour: 9, minute: 0 }).toDate(),
      end: moment().set({ hour: 10, minute: 0 }).toDate(),
    },
    {
      title: "Evento 2",
      start: moment().set({ hour: 10, minute: 0 }).toDate(),
      end: moment().set({ hour: 11, minute: 0 }).toDate(),
    },
    {
      title: "Evento 3",
      start: moment().set({ hour: 11, minute: 30 }).toDate(),
      end: moment().set({ hour: 12, minute: 30 }).toDate(),
    },
    {
      title: "Evento 4",
      start: moment().set({ hour: 15, minute: 0 }).toDate(),
      end: moment().set({ hour: 16, minute: 0 }).toDate(),
    },
    {
      title: "Evento 5",
      start: moment().set({ hour: 16, minute: 0 }).toDate(),
      end: moment().set({ hour: 17, minute: 0 }).toDate(),
    },
   
  ];

   // Função para personalizar a cor dos eventos
   const eventPropGetter = () => {
    return {
      style: {
        backgroundColor: 'black', // Define a cor cinza para os eventos
        borderColor: 'black',
        color: 'white', // Cor do texto dentro do evento
      },
    };
  };

  return (
    <Sidebar> 
      <Content>
      <div style={{ marginBottom: '20px' }}>
          <CustomButton icon={<PlusCircleOutlined />} label = "agendamento"  />
        </div>
        <StyledContainer>
        
        <h3 style={{ marginTop: '20px' }}>Agendamentos</h3>
       
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="week"
          selectable
          popup
          style={{ height: 500 }}
          min={new Date(moment().set({ hour: 8, minute: 0 }))}
          max={new Date(moment().set({ hour: 18, minute: 0 }))}
          eventPropGetter={eventPropGetter}
        />
        </StyledContainer>
      </Content>
    </Sidebar>
  );
};

export default Schedules;

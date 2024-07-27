import React from 'react';
import { DollarOutlined, PlusCircleOutlined, ShoppingCartOutlined, ToolOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Content from '../../components/Content/Content';
import Cards from '../../components/Cards/Cards';
import { Button } from 'antd';
import Space from '../../components/Space/Space';

const localizer = momentLocalizer(moment);

const Index = () => {
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
    // Eventos dos próximos dias
    {
      title: "Evento 6",
      start: moment('2024-04-09').set({ hour: 8, minute: 30 }).toDate(),
      end: moment('2024-04-09').set({ hour: 9, minute: 30 }).toDate(),
    },
    {
      title: "Evento 7",
      start: moment('2024-04-09').set({ hour: 10, minute: 0 }).toDate(),
      end: moment('2024-04-09').set({ hour: 11, minute: 0 }).toDate(),
    },
    {
      title: "Evento 8",
      start: moment('2024-04-09').set({ hour: 11, minute: 30 }).toDate(),
      end: moment('2024-04-09').set({ hour: 12, minute: 30 }).toDate(),
    },
    {
      title: "Evento 9",
      start: moment('2024-04-09').set({ hour: 15, minute: 0 }).toDate(),
      end: moment('2024-04-09').set({ hour: 16, minute: 0 }).toDate(),
    },
    {
      title: "Evento 10",
      start: moment('2024-04-09').set({ hour: 16, minute: 0 }).toDate(),
      end: moment('2024-04-09').set({ hour: 17, minute: 0 }).toDate(),
    },
    {
      title: "Evento 11",
      start: moment('2024-04-10').set({ hour: 9, minute: 0 }).toDate(),
      end: moment('2024-04-10').set({ hour: 10, minute: 0 }).toDate(),
    },
    {
      title: "Evento 12",
      start: moment('2024-04-10').set({ hour: 10, minute: 0 }).toDate(),
      end: moment('2024-04-10').set({ hour: 11, minute: 0 }).toDate(),
    },
    {
      title: "Evento 13",
      start: moment('2024-04-10').set({ hour: 11, minute: 30 }).toDate(),
      end: moment('2024-04-10').set({ hour: 12, minute: 30 }).toDate(),
    },
    {
      title: "Evento 14",
      start: moment('2024-04-10').set({ hour: 15, minute: 0 }).toDate(),
      end: moment('2024-04-10').set({ hour: 16, minute: 0 }).toDate(),
    },
    {
      title: "Evento 15",
      start: moment('2024-04-10').set({ hour: 16, minute: 0 }).toDate(),
      end: moment('2024-04-10').set({ hour: 17, minute: 0 }).toDate(),
    },
    {
      title: "Evento 16",
      start: moment('2024-04-11').set({ hour: 9, minute: 0 }).toDate(),
      end: moment('2024-04-11').set({ hour: 10, minute: 0 }).toDate(),
    },
    {
      title: "Evento 17",
      start: moment('2024-04-11').set({ hour: 10, minute: 0 }).toDate(),
      end: moment('2024-04-11').set({ hour: 11, minute: 0 }).toDate(),
    },
    {
      title: "Evento 18",
      start: moment('2024-04-11').set({ hour: 11, minute: 30 }).toDate(),
      end: moment('2024-04-11').set({ hour: 12, minute: 30 }).toDate(),
    },
    {
      title: "Evento 19",
      start: moment('2024-04-11').set({ hour: 15, minute: 0 }).toDate(),
      end: moment('2024-04-11').set({ hour: 16, minute: 0 }).toDate(),
    },
    {
      title: "Evento 20",
      start: moment('2024-04-11').set({ hour: 16, minute: 0 }).toDate(),
      end: moment('2024-04-11').set({ hour: 17, minute: 0 }).toDate(),
    },
    {
      title: "Evento 21",
      start: moment('2024-04-12').set({ hour: 9, minute: 0 }).toDate(),
      end: moment('2024-04-12').set({ hour: 10, minute: 0 }).toDate(),
    },
    {
      title: "Evento 22",
      start: moment('2024-04-12').set({ hour: 10, minute: 0 }).toDate(),
      end: moment('2024-04-12').set({ hour: 11, minute: 0 }).toDate(),
    },
    {
      title: "Evento 23",
      start: moment('2024-04-12').set({ hour: 11, minute: 30 }).toDate(),
      end: moment('2024-04-12').set({ hour: 12, minute: 30 }).toDate(),
    },
    {
      title: "Evento 24",
      start: moment('2024-04-12').set({ hour: 15, minute: 0 }).toDate(),
      end: moment('2024-04-12').set({ hour: 16, minute: 0 }).toDate(),
    },
    {
      title: "Evento 25",
      start: moment('2024-04-12').set({ hour: 16, minute: 0 }).toDate(),
      end: moment('2024-04-12').set({ hour: 17, minute: 0 }).toDate(),
    },
  ];

  return (
    <Sidebar> 
      <Content>
        <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
          <Cards title="Faturamento Total" content={<><DollarOutlined style={{ color: '#52c41a', backgroundColor: 'rgba(82, 196, 26, 0.25)', borderRadius: 20, fontSize: 24, padding: '8px' }} /> R$ 1000,00</>} />
          <div style={{ width: 60 }}></div> 
          <Cards title="Produtos Vendidos" content={<><ShoppingCartOutlined style={{ color: '#1890ff', backgroundColor: 'rgba(24, 144, 255, 0.25)', borderRadius: 20, fontSize: 24, padding: '8px' }} /> 50</>} />
          <div style={{ width: 60 }}></div> 
          <Cards title="Ordens de Serviços Geradas" content={<><ToolOutlined style={{ color: '#fa541c', backgroundColor: 'rgba(250, 84, 28, 0.25)', borderRadius: 20, fontSize: 24, padding: '8px' }} /> 10</>} />
        </div>
        <h3 style={{ marginTop: '20px' }}>Fluxo da Oficina</h3>
        <div style={{ marginBottom: '20px' }}>
          <Button type="primary" icon={<PlusCircleOutlined />}>Adicionar Evento</Button>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="week"
          selectable
          popup
          style={{ height: 500 }}
          min={new Date(moment().set({ hour: 8, minute: 0 }))}
          max={new Date(moment().set({ hour: 18, minute: 0 }))}
        />
      </Content>
    </Sidebar>
  );
};

export default Index;

import React from 'react';
import { DollarOutlined, PlusCircleOutlined, ShoppingCartOutlined, ToolOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Content from '../../components/Content/Content';
import CustomButton from '../../components/CustomButton/CustomButton';



const localizer = momentLocalizer(moment);

const Index = () => {


  return (
    <Sidebar> 
      <Content>
         <CustomButton label="Cliente" />
      </Content>
    </Sidebar>
  );
};

export default Index;
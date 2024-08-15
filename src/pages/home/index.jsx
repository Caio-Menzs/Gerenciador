import React from 'react';
import { DollarOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';
import CustomCard from '../../components/Card/card';

const Index = () => {
  return (
    <Sidebar>
      <Content>
        <CustomCard icon={<DollarOutlined />} title={"teste"} />
      </Content>
    </Sidebar>
  );
};

export default Index;

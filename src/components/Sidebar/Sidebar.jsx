import { Button, Layout, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, FireFilled } from '@ant-design/icons';
import MenuList from '../MenuList/MenuList';
import { useState } from 'react';
import './index.css';
import logo from '../../images/logoessa.png'

const Sidebar = ({ children }) => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Sider 
          width={250}
          collapsed={collapsed} 
          collapsible 
          trigger={null}
          theme='light' // Altere para 'light' para tema claro
          className='sidebar'
        >
          <div className="logo" >
            <div className="logo-icon">
          <FireFilled/>
             </div>
          </div>
          <MenuList darkTheme={false}/> {/* Passar false para não usar tema escuro */}
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button 
              type="text"
              className='toggle'
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Header>
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Sidebar;

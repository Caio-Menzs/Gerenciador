import { Button, Layout, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import MenuList from '../components/MenuList/MenuList';
import { useState } from 'react';
import './index.css';
import logo from '../images/logoessa.png'; // Importe a logo

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
          collapsed={collapsed} 
          collapsible 
          trigger={null}
          theme={'dark'} 
          className='sidebar'
        >
          <div className="logo" style={{ padding: '16px', textAlign: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '180%', height: 'auto' }} />
          </div>
          <MenuList darkTheme/>
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

import { Button, Layout, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, FireFilled, UserOutlined } from '@ant-design/icons';
import MenuList from '../MenuList/MenuList';
import { useSidebar } from '../../context/SidebarContext';
import './index.css';
import { Avatar } from 'antd';

const Sidebar = ({ children }) => {
  const { Header, Sider, Content } = Layout;
  const { collapsed, setCollapsed } = useSidebar();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider 
        width={250}
        collapsed={collapsed} 
        collapsible 
        trigger={null}
        theme='light'
        className='sidebar'
      >
        <div className="logo">
          <div className="logo-icon">
            <FireFilled />
          </div>
        </div>
        <MenuList darkTheme={false} />  
      </Sider>    
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            type="text"
            className='toggle'
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <Avatar icon={<UserOutlined />} />
        </Header>
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;

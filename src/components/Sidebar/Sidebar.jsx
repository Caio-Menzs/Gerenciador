import { Button, Layout, theme, Avatar } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import MenuList from '../MenuList/MenuList';
import { useSidebar } from '../../context/SidebarContext';
import './index.css';
import Logo from '../../images/logoessa.png';

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
        theme='dark'
        className='sidebar'
      >
        <div className="logo">
          <div className="logo-icon">
            <img src={Logo} alt="Logo" title='Logo' />
          </div>
        </div>
        <MenuList darkTheme={true} />  
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

import PropTypes from "prop-types";
import { Menu } from "antd";
import { HomeOutlined, TeamOutlined, ShoppingCartOutlined, CarOutlined, ToolOutlined, CodeSandboxOutlined, BarChartOutlined, CalendarOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from '../../context/SidebarContext'

const MenuList = ({ darkTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed } = useSidebar();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    const pathToKey = {
      "/": "home",
      "/schedules": "schedules",
      "/customers": "clients",
      "/cars": "veiculos",
      "/products": "products",
      "/services": "services",
      "/sales": "sales",
      "/reports": "reports",
      "/orders": "orders"
    };
    setSelectedKey(pathToKey[location.pathname] || "home");
  }, [location.pathname]);

  const handleClick = (key, path) => {
    setSelectedKey(key);
    navigate(path);
  };

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      mode="inline"
      className="menu-bar"
      selectedKeys={[selectedKey]}
    >
      <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => handleClick("home", "/")}>
        Página Inicial
      </Menu.Item>
      <Menu.Item key="schedules" icon={<CalendarOutlined />} onClick={() => handleClick("schedules", "/schedules")}>
        Agendamentos
      </Menu.Item>
      <Menu.Item key="orders" icon={<CalendarOutlined />} onClick={() => handleClick("orders", "/orders")}>
        Ordens de Serviços
      </Menu.Item>
      <Menu.Item key="clients" icon={<TeamOutlined />} onClick={() => handleClick("clients", "/customers")}>
        Clientes
      </Menu.Item>
      <Menu.Item key="veiculos" icon={<CarOutlined />} onClick={() => handleClick("veiculos", "/cars")}>
        Veículos
      </Menu.Item>
      <Menu.Item key="products" icon={<CodeSandboxOutlined />} onClick={() => handleClick("products", "/products")}>
        Produtos
      </Menu.Item>
      <Menu.Item key="services" icon={<ToolOutlined />} onClick={() => handleClick("services", "/services")}>
        Serviços
      </Menu.Item>
      <Menu.Item key="sales" icon={<ShoppingCartOutlined />} onClick={() => handleClick("sales", "/sales")}>
        Vendas
      </Menu.Item>
      <Menu.Item key="reports" icon={<BarChartOutlined />} onClick={() => handleClick("reports", "/reports")}>
        Relatórios
      </Menu.Item>
    </Menu>
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired 
};

export default MenuList;

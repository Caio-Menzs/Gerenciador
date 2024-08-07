import PropTypes from "prop-types"; // Importe PropTypes
import { Menu } from "antd";
import { HomeOutlined, TeamOutlined, ShoppingCartOutlined, CarOutlined, ToolOutlined, CodeSandboxOutlined, BarChartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MenuList = ({ darkTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    // Atualiza o estado do item selecionado com base na URL atual
    const pathToKey = {
      "/": "home",
      "/customers": "clients",
      "/cars": "veiculos",
      "/products": "products",
      "/services": "services",
      "/sales": "sales",
      "/reports": "reports"
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
      selectedKeys={[selectedKey]} // Define o item selecionado
    >
      <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => handleClick("home", "/")}>
        Página Inicial
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

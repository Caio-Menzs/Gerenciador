//import React from "react";
import PropTypes from "prop-types"; // Importe PropTypes
import { Menu } from "antd";
import { HomeOutlined, TeamOutlined, ShoppingCartOutlined, CarOutlined, ToolOutlined, CodeSandboxOutlined, BarChartOutlined } from "@ant-design/icons";
import {  Navigate, useNavigate } from "react-router-dom"

const MenuList = ({ darkTheme }) => {
  const navigate = useNavigate ();
  return (
    <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar">
      <Menu.Item key="home" icon={<HomeOutlined />}onClick={() => navigate("/")}>
        Página Inicial 
      </Menu.Item>
      <Menu.Item key="clients" icon={<TeamOutlined />} onClick={() => navigate("/customers")}>
      Clientes
      </Menu.Item>
      <Menu.Item key="veiculos" icon={<CarOutlined />} onClick={() => navigate("/cars")}>   
      Veículos
      </Menu.Item>
      <Menu.Item key="products" icon={<CodeSandboxOutlined />}onClick={() => navigate("/products")}>
      Produtos 
      </Menu.Item>
      <Menu.Item key="services" icon={<ToolOutlined />}onClick={() => navigate("/services")}>
        Serviços
      </Menu.Item>
      <Menu.Item key="sales" icon={<ShoppingCartOutlined />}onClick={() => navigate("/sales")}>
      Vendas 
      </Menu.Item>
      <Menu.Item key="reports" icon={<BarChartOutlined />}>
        Relatórios
      </Menu.Item>
    </Menu>
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired 
};

export default MenuList;

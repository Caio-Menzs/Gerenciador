import { Routes, Route } from "react-router-dom";
import Login from '../pages/login/index';
import Home from "../pages/home";
import Sales from "../pages/sales";
import Products from "../pages/products/products";
import Customer from "../pages/customer/customer";
import CustomerForm from "../pages/customer/customerForm";
import Services from "../pages/services/services";
import Vehicles from "../pages/cars/cars";
import VehicleForm from "../pages/cars/carsForm";
import ProductForm from "../pages/products/productsForm";
import Schedules from "../pages/schedules/schedules";
import Orders from "../pages/Orders/orders"
import OrderForm from "../pages/Orders/ordersForm";

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/form" element={<ProductForm />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/customers/form" element={<CustomerForm />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cars" element={<Vehicles />} />
            <Route path="/cars/form" element={<VehicleForm/>}/>
            <Route path="/schedules" element={<Schedules/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/orders-form" element={<OrderForm/>}/>
           
        </Routes>
    );
};

export default RoutesComponent;

import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Sales from "../pages/sales";
import Products from "../pages/products/products";
import Customer from "../pages/customer/customer";
import CustomerForm from "../pages/customer/customerForm";
import Services from "../pages/services/services";
import Vehicles from "../pages/cars/cars";

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/customers/form" element={<CustomerForm />} />
            <Route path="/services" element={<Services />} />
            <Route path="/cars" element={<Vehicles />} />
        </Routes>
    );
};

export default RoutesComponent;

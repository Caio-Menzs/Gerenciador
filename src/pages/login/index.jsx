import { Main, Body, Logo, Spacing, CreateAcc } from "./style"; 
import { Input,  ErrorMessage, Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import axios from "axios";
//import api from "../../services/api";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const schema = yup.object({
        email: yup.string().required("Campo obrigatório").email("Email inválido"),
        password: yup.string().required("Campo obrigatório").min(6, "Mínimo 6 caracteres")
    });

    const { handleSubmit, register, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const login = async (data) => {
        setLoading(true);
        console.log('Iniciando login...');
        try {
            const response = await axios.post("http://localhost:3001/login", data);
            console.log('Resposta do servidor:', response);
            const token = { token: response?.data?.token}; 
            console.log('Token recebido:', token);
            localStorage.setItem("gerenciador", JSON.stringify(token));          
            setLoading(false);
            console.log('Login bem-sucedido! Redirecionando para a página inicial...');
            navigate("/");
        } catch (e) {
            console.error('Erro durante o login:', e);
            alert("Erro, tente novamente");
            setLoading(false);
        }
    };
    

    return (
        <Main>
            <Body>
                {loading && <Loading />}
                {!loading && (<form onSubmit={handleSubmit(login)}>
                    <Logo>Gerenciador de Oficina</Logo>
                    <Input label= "Email" placeholder="Digite o email" {...register("email")} />
                    {errors?.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    <Spacing />
                    <Input label="Senha" placeholder="Digite a senha" type="password" {...register("password")} />
                    {errors?.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    <Spacing />
                    <Button label="Entrar" variant="btn-primary" type="submit" />
                    <Spacing />
                    <CreateAcc onClick={() => navigate("/register")}>Criar Conta</CreateAcc>
                </form>)}       
            </Body>
        </Main>
    );
};

export default Login;
import { Main, Body, Logo, Spacing, CreateAcc } from "./style"; 
import { Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

const Register = () => {
    const [data, setData] = useState({
       name: "",
       email: "",
       password: "" 
    })
    const navigate = useNavigate();

    const save = async (ev) => {
        ev.preventDefault();
        await api.post("/user", data)
        alert("Usuario criado com sucesso")
    }

    return (
        <Main>
            <Body>
                <form onSubmit={save}>
                    <Logo>Gerenciador de Oficina</Logo>
                    <Input 
                       label= "Nome" 
                       placeholder="Digite o nome" 
                       required={true}
                       value={data.name}
                       onChange={ev => setData({ ...data, name: ev.target.value })}
                    />
                    <Spacing />
                    <Input 
                       label= "Email" 
                       placeholder="Digite o email" 
                       required={true} 
                       type="email"
                       value={data.email}
                       onChange={ev => setData({ ...data, email: ev.target.value })}
                    />
                    <Spacing />
                    <Input 
                       label="Senha" 
                       placeholder="Digite a senha" 
                       type="password" 
                       required={true}
                       value={data.password}
                       onChange={ev => setData({ ...data, password: ev.target.value })} 
                    />
                    <Spacing />
                    <Button 
                       label="Criar Conta" 
                       variant="btn-primary"  
                       type="submit" 
                    />
                    <Spacing />
                    <CreateAcc onClick={() => navigate( "/login")}>Fazer Login</CreateAcc>
                </form>
            </Body>
        </Main>
    );
};

export default Register;
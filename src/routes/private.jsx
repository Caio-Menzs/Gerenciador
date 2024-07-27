import { Navigate } from "react-router-dom";

const Private = ({ Component }) => {
    const session = JSON.parse(localStorage.getItem("gerenciador"));

    return session?.token ? <Component /> : <Navigate to={"/"}/>;
};

export default Private;
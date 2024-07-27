import { Body } from "./styles"
import ReactLoading from "react-loading";

const LoadingComponent = () => {
    return (
        <Body>
            <ReactLoading type="spin" color="#000" />
        </Body>
    );
};

export default LoadingComponent;
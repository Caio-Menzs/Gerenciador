import PropTypes from 'prop-types';

const ErrorMessageComponent = ({ children }) => {
    return <p style={{ color: "red"}}>{children}</p>;       
};

ErrorMessageComponent.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorMessageComponent;

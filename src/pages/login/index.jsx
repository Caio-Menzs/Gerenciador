import React from 'react';
import { Form, Input, Button, Layout, Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import login from '../../images/login.jpg'

const { Content } = Layout;
const { Title } = Typography;

const LoginContainer = styled(Layout)`
  height: 100vh;
`;

const ImageContainer = styled.div`
  background-image: url(${login});
  background-size: cover;
  background-position: center;
  height: 100%;
`;

const FormContainer = styled(Row)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled(Form)`
  width: 300px;
`;

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <LoginContainer>
      <Row style={{ height: '100%', width: '100%' }}>
        <Col span={12}>
          <ImageContainer />
        </Col>
        <Col span={12}>
          <FormContainer>
            <LoginForm
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Title level={2}>Login</Title>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Log in
                </Button>
              </Form.Item>
            </LoginForm>
          </FormContainer>
        </Col>
      </Row>
    </LoginContainer>
  );
};

export default Login;

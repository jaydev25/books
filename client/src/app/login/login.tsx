import { Form, Input, Button, Checkbox, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from './../../services/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  
  const onFinish = async (values: any) => {
    try {
        const resp = await login(values);
        console.log("resp", resp);
        localStorage.setItem('token', `Bearer ${resp.data.token}`);
        
        navigate('/');
        window.location.reload();
      } catch (error: any) {
        console.log("error", error);
        
        alert(error.response.data.error);
      }
  };

  return (
    <Flex style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/signup">register now!</a>
        </Form.Item>
      </Form>
    </Flex>
  );
};

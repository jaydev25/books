import { Form, Input, Button, Checkbox, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signup } from './../../services/auth';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const resp = await signup(values);
      navigate('/');
    } catch (error: any) {
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

        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your First Name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your Last Name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last Name"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

import { Form, Input, Button, message, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { publishBook } from './../../services/book';

export const CreateBook = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = (text: any) => {
    messageApi.info(text);
  };

  const errorMessage = (error: any) => {
    messageApi.error(error);
  };

  const onFinish = async (values: any) => {
    try {
      const resp = await publishBook(values);
      if (resp.data.token) {
        localStorage.setItem('token', `Bearer ${resp.data.token}`);
      }

      successMessage('Book Created Successfully!');
    } catch (error: any) {
      errorMessage(error);
    }
  };

  return (
    <Flex style={{ margin: 'auto', flexDirection: 'column' }}>
      {contextHolder}
      <div>
        <h1>Publish a book</h1>
      </div>
      <div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your Title!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Title"
            />
          </Form.Item>

          <Form.Item
            name="desc"
            rules={[
              {
                required: true,
                message: 'Please input your Desription!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Description"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Create Book
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Flex>
  );
};

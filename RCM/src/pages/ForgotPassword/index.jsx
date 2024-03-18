import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Title } = Typography;


const Forget = () => {
//   const onFinish = (values) => {
//     console.log('Received values:', values);
//   };

  return (
    <div className='  flex justify-center items-center'>
      <div className=" bg-gray-50 rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700 p-10">


        <Form
          name="normal_login"
          className="login-form "
          initialValues={{ remember: true }}
          // onFinish={onFinish}
        >
          <Title level={2}>Forgot Password</Title>
          <Form.Item
            name="Email"
            rules={[{ required: true, message: 'Please input your recovery email!' }]}
          >
            <Input prefix={<MailFilled className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>


          <Form.Item>
            <Button

              type="primary" htmlType="submit"
              className="login-form-button w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Log in
            </Button>
            <div className='mt-5 flex justify-center'>
              Or
            </div>
            <div className='mt-1 flex justify-end '>
              <Link to="/">Back to login </Link>
            </div>
          </Form.Item>
        </Form>
      </div >
    </div >
  );
};

export default Forget;

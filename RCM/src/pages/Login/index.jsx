import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { SetLoading } from '../../store/loaderSlice.jsx';

// const { Title } = Typography;

const Login = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const onFinish = (values) => {
  //   console.log('Received values:', values);
  //   // Hard-coded condition for username and password
  //   if (values.email === 'demo@idsil.com' && values.password === '123456') {
  //     // Redirect to '/home'
  //     message.success('Login SuccessFull!')
  //     navigate('/home')
  //   } else {
  //     message.error('Invalid email or password')
  //   }
  // };

  return (
    <section  className="  flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 ">
        <div className="p-6 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
            Sign in to your account
          </h1>
          <Form
            className="login-form space-y-10 md:space-y-6 p-4 mt-4"
            // onFinish={onFinish}
          >
            <div>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please Enter Your Email!' }]}
              >
                <Input
                  size='large'
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Enter Your Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please Enter Your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Enter Your Password"
                  size='large'
                />
              </Form.Item>
            </div>
            <div className="flex items-center justify-end">
              <Link to="/forget" >
                Forgot password?
              </Link>
            </div>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                // className="w-full font-medium rounded-lg text-sm text-center"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </Button>
            </div>
            <div className="flex justify-between">
              <span className='text-sm font-light text-gray-500 dark:text-gray-400'>Don’t have an account yet?</span>
              <span><Link to="/register">Register!</Link></span>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;

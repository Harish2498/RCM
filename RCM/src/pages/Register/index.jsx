import React from 'react';
import { Form, Input, Button, Typography, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import { useFormik } from 'formik';
// import { RegisterSchema } from '../../schemas/RegisterSchema/RegisterSchema';

const { Title } = Typography;

const SignUp = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //     check: false,
  //   },
  //   validationSchema: RegisterSchema,
  //   onSubmit: values => {
  //     const userDetailString = JSON.stringify(values);
  //     localStorage.setItem('UserDetail', userDetailString);
  //     console.log(values, '---Values');
  //     console.log(userDetailString, 'userDetailString');
  //   },
  // });

  // const {
  //   handleChange,
  //   handleSubmit,
  //   values,
  //   errors,
  //   touched,
  //   setFieldValue,
  // } = formik;

  return (
    <div className='flex justify-center items-center'>

      <div style={{ maxWidth: 400, marginTop: '5rem' }} className='bg-gray-50 rounded-lg shadow dark:border  dark:bg-gray-800 dark:border-gray-700  p-10'>
        <Title level={2}>Sign up</Title>
        <Form >
          <Form.Item
            name="firstName"
          // help={touched.firstName && errors.firstName ? errors.firstName : null}
          // validateStatus={touched.firstName && errors.firstName ? 'error' : ''}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="First Name"
              // value={values.firstName}
              // onChange={handleChange}
              size='large'
            />
          </Form.Item>
          <Form.Item
            name="lastName"
          // help={touched.lastName && errors.lastName ? errors.lastName : null}
          // validateStatus={touched.lastName && errors.lastName ? 'error' : ''}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Last Name"
              // value={values.lastName}
              // onChange={handleChange}
              size='large'

            />
          </Form.Item>
          <Form.Item
            name="email"
          // help={touched.email && errors.email ? errors.email : null}
          // validateStatus={touched.email && errors.email ? 'error' : ''}

          >
            <Input
              prefix={<UserOutlined />}
              type="email"
              placeholder="Email"
              // value={values.email}
              // onChange={handleChange}
              size='large'

            />
          </Form.Item>
          <Form.Item
            name="password"
          // help={touched.password && errors.password ? errors.password : null}
          // validateStatus={touched.password && errors.password ? 'error' : ''}
          >
            <Input.Password
              prefix={<UserOutlined />}
              placeholder="Password"
              // value={values.password}
              // onChange={handleChange}
              size='large'
            // iconRender={visible =>
            //   visible ? <LockOutlined /> : <LockOutlined />

            // }
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            // help={
            //   touched.confirmPassword && errors.confirmPassword
            //     ? errors.confirmPassword
            //     : null
            // }
            // validateStatus={
            //   touched.confirmPassword && errors.confirmPassword
            //     ? 'error'
            //     : ''
            // }
          >
            <Input.Password
              prefix={<UserOutlined />}
              placeholder="Confirm Password"
              // value={values.confirmPassword}
              // onChange={handleChange}
              size='large'
              // iconRender={visible =>
              //   visible ? <LockOutlined /> : <LockOutlined />
              // }
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              // checked={values.check}
              // onChange={() => setFieldValue('check', !values.check)}
            >
              I agree to the Terms and Conditions
            </Checkbox>
            {/* {touched.check && errors.check ? (
              <div style={{ color: 'red' }}>{errors.check}</div>
            ) : null} */}
          </Form.Item>
          <Form.Item>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
            {/* <Button type="primary" htmlType="submit">
            Sign Up
          </Button> */}
            <br />
            <div className='mt-10'>

              Already have an account? <Link to="/">Sign In</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;

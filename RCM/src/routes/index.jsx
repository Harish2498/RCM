import React from 'react'
import { createBrowserRouter, } from 'react-router-dom';
// import UserInfoForm from '../components/form'
import Auth from '../pages/Layout/AuthLayout/index.jsx';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';


// const navigate = useNavigate();
const router = createBrowserRouter([


    //AUTHENTICATE
    {
        path: '/',
        element: <Auth />,
        children: [

            {
                path: '',
                element: <Login />,
            },

            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'forget',
                element: <ForgotPassword />
            }
        ]
    },



])


export default router
import React from "react";
import { Outlet } from "react-router-dom";
import LoginImage from '../../../assets/Checklist.jpg';
import Logo from '../../../assets/IDS2.png'
import { Layout, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";

const AuthLayout = () => {
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
  };
  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
  };


  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
  };

  return (
    <div className="">
      <div className="flex ">
        <img src={Logo} style={{ width: "9%", padding: '.5rem' }} />
        <div style={{ width: "100%", textAlign: "center" }} >
          <h2 style={{ fontSize: '3rem', fontFamily: 'sans-serif', marginRight: "4rem" }}>
            RCM
          </h2>
        </div>
      </div>

      <section className="flex flex-col md:flex-row items-center bg-gray-50">
        <div className=" hidden lg:block w-2/3 ">
          <img
            src={LoginImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ width: "90%" }}
          />
        </div>

        <div
          className="bg-white hidden lg:block w-1/3  h-90vh "
        >
          <Outlet />
        </div>
      </section>
    </div>


  );
};

export default AuthLayout;

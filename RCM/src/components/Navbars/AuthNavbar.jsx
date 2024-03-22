import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IDSLogo from "../../assets/IDS2.png"
import { Avatar, Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";



export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = React.useState(false);


  //this is for profile
  const items = [
    // {
    //   label: (
    //     <div>
    //       {/* <i class="ri-profile-fill "></i> {user?.empType.toUpperCase()} */}
    //       <i className="ri-profile-fill "></i> Employee
    //     </div>
    //   ),
    //   key: "0",
    // },
    {
      label: (
        <div
          style={{
            // height: "23vh",
            width: "20vw",
            backgroundColor: "rgb(0,33,64)",
            color: "white",
            textAlign: "center",
          }}
        >
          <div style={{ paddingTop: "1rem" }}>
            {/* {user?.profileImage ? (
              <img
                src={user?.profileImage}
                height="90px"
                width="90px"
                alt="Profile"
                className="profile-image rounded-full"
              />
            ) : ( */}
            <Avatar size={60} icon={<UserOutlined />} />
            {/* )} */}
          </div>
          <h2 className="uppercase mt-2">
            {/* {user?.firstName} {user?.lastName} */}
            Anubhav Rana
          </h2>
          {/* <p style={{ marginBottom: "1rem" }}>{user?.email}</p> */}
          <p style={{ marginBottom: "1rem" }}>anubhav.r@idsil.com</p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          // onClick={() => navigate("/userProfile")}
          className="mt-2 uppercase"
        >
          <i className="ri-user-fill"></i> My Profile
        </div>
      ),
      key: "3",
    },
    // {
    //   label: (
    //     <div
    //       onClick={() => navigate("/changePassword")}
    //       className="mt-2 uppercase"
    //     >
    //       <i className="ri-lock-2-fill"></i> Change Password
    //     </div>
    //   ),
    //   key: "4",
    // },
    {
      type: "divider",
    },
    {
      label: (
        <div
          onClick={() => navigate("/")}
          className="mt-2 uppercase  text-center"
        >
          <i className="ri-logout-circle-line"></i> Logout
        </div >
      ),
      key: "5",
    },
  ];

  return (
    <>
      <nav className="top-0 z-50 bg-white flex w-full items-center justify-between px-2 py-3 navbar-expand-lg " style={{ boxShadow: '0 4px 6px rgba(0, 0, 255, 0.1)', position: 'fixed' }}>
        <div className="container   flex  flex-wrap items-center  ">
          {/* for logo */}
          <div>
            <img src={IDSLogo} width={120} className="mr-10" />
          </div>

          {/* for links */}
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="   font-semibold text-md text-gray-500 leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/home"
              style={location.pathname.includes('home') ? { textDecoration: 'underline', color: 'black' } : {}}
            >
              Home
            </Link>
            <Link
              className="   font-semibold text-md text-gray-500 leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/search-by-service"
              style={location.pathname.includes('search-by-service') ? { textDecoration: 'underline', color: 'black' } : {}}
            >
              Search by Service
            </Link>
            <Link
              className=" font-semibold text-md text-gray-500 leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/analytical-comparison"
              style={location.pathname.includes('analytical-comparison') ? { textDecoration: 'underline', color: 'black' } : {}}
            >
              Analytical Comparison
            </Link>
            <Link
              className="   font-semibold text-md text-gray-500 leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/about-us"
              style={location.pathname.includes('about-us') ? { textDecoration: 'underline', color: 'black' } : {}}
            >
              About Us
            </Link>
            <Link
              className="   font-semibold text-md text-gray-500 leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/contact-us"
              style={location.pathname.includes('contact-us') ? { textDecoration: 'underline', color: 'black' } : {}}
            >
              Contact Us
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className=" fas fa-bars"></i>
            </button>
          </div>

        </div>
        {/* --------------------- FOR PROFILE----------------------- */}
        <div style={{ borderleft: "1px solid grey" }}>
          <Dropdown
            placement="bottomRight"
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a >
              <Space className="hover:bg-gray-200 cursor-pointer p-2 uppercase ">
                {/* {user?.profileImage ? (
                      <img
                        // src={`./profileImages/${user.profileImage}`}
                        // src={user.profileImage}
                        height="30px"
                        width="30px"
                        alt="Profile"
                        className="profile-image rounded-full"
                      />
                    ) : ( */}
                <Avatar size={30} icon={<UserOutlined />} />
                {/* )} */}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </nav>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbars/AuthNavbar.jsx";
import Footer from "../../components/Footers/Footer.jsx";
import { Calendar, Typography } from "antd"
import { FallOutlined, HistoryOutlined, LineChartOutlined, RiseOutlined, TeamOutlined } from "@ant-design/icons"
import Clock from "../../assets/clock.png"
import Monitor from "../../assets/monitor.png"
import Shuttle from "../../assets/shuttle.png"
import Location from "../../assets/location.png"
import Medicine from "../../assets/medicine.png"
import Service from "../../assets/service.png"
import { GetCardData } from "../../api-calls/home.jsx";
import CounterUpAnimation from "../../utils/counterUpAnimation.jsx";

const { Title } = Typography



export default function Homepage() {
  const [cardData, setCardData] = useState({})

  const getData = async () => {

    try {
      const response = await GetCardData();
      setCardData(response.data)

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <>
      <Navbar />
      <main className=" z-10 mt-5">
        {/* Top Statistics Heading Section */}
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <h1 className=" text-5xl font-bold">
            Top Statistics
          </h1>
        </div>

        {/* 1st  Section (CARDs) */}
        <section className="pb-20 bg-blueGray-200 -mt-24"  >
          <div className="container mx-auto px-4  " >
            <div className="flex flex-wrap ">

              {/* 1st card (TOTAL PROVIDER) */}
              <div className=" pt-6 w-full md:w-3/12 min-w-3/12 px-4 text-center">
                <div className=" relative h-45 flex flex-col  break-words  min-w-0  bg-white w-full  shadow-lg rounded-lg " style={{ border: '2px solid gray' }}>
                  <div className="px-4 py-5 flex flex-col gap-10">
                    <div className="flex justify-between ">
                      <div className="flex flex-col gap-10 text-left">
                        <h6 className="text-xl font-semibold text-gray-500">Total Providers</h6>
                        <h2 className="text-4xl font-semibold text-gray-500">{CounterUpAnimation(cardData.total_unique_providers) || 0}</h2>
                      </div>
                      <div className="flex items-center">
                        <div className=" p-3 text-center inline-flex items-center text-purple-600 text-3xl justify-center w-16 h-16 mb-5 shadow-lg rounded-3xl bg-purple-200">
                          <TeamOutlined />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <span className=" text-green-300"> <RiseOutlined /> 8.3% </span>
                      <span>Up from Yesterday</span>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* 2nd card (TOTAL SERVICES)*/}
              <div className="w-full pt-6 md:w-3/12 min-w-3/12  px-4 text-center">
                <div className=" relative h-45 flex flex-col  break-words  min-w-0  bg-white w-full  shadow-lg rounded-lg " style={{ border: '2px solid gray' }}>
                  <div className="px-4 py-5 flex flex-col gap-10">
                    <div className="flex justify-between ">
                      <div className="flex flex-col gap-10 text-left">
                        <h6 className="text-xl font-semibold text-gray-500">Total Services</h6>
                        <h2 className="text-4xl font-semibold text-gray-500">{CounterUpAnimation(cardData.total_unique_services) || 0}</h2>
                      </div>
                      <div className="flex items-center">
                        <div className="text-white p-3 text-center inline-flex text-3xl items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-3xl bg-red-200">
                          {/* <LineChartOutlined /> */}
                          <img src={Service} />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <span className=" text-red-300"> <FallOutlined /> 8.3% </span>
                      <span>Down from Yesterday</span>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* 3rd card (TOTAL LOCATIONS) */}
              <div className="pt-6 w-full md:w-3/12 min-w-3/12  px-4 text-center">
                <div className=" relative h-45 flex flex-col  break-words  min-w-0  bg-white w-full  shadow-lg rounded-lg " style={{ border: '2px solid gray' }}>
                  <div className="px-4 py-5 flex flex-col gap-10">
                    <div className="flex justify-between ">
                      <div className="flex flex-col gap-10 text-left">
                        <h6 className="text-xl font-semibold text-gray-500">Total Locations</h6>
                        <h2 className="text-4xl font-semibold text-gray-500">{CounterUpAnimation(cardData.total_unique_cities) || 0}</h2>
                      </div>
                      <div className="flex items-center">
                        <div className=" p-3 text-center inline-flex text-3xl items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-3xl bg-orange-200">
                          {/* <HistoryOutlined /> */}
                          <img src={Location} />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <span className=" text-green-300"> <RiseOutlined /> 8.3% </span>
                      <span>Up from Yesterday</span>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* 4th card  (TOTAL DRUGS SERVICES)*/}
              <div className="pt-6 w-full md:w-3/12 min-w-3/12  px-4 text-center">
                <div className=" relative h-45 flex flex-col  break-words  min-w-0  bg-white w-full  shadow-lg rounded-lg " style={{ border: '2px solid gray' }}>
                  <div className="px-4 py-5 flex flex-col gap-10">
                    <div className="flex justify-between ">
                      <div className="flex flex-col gap-10 text-left">
                        <h6 className="text-xl font-semibold text-gray-500"> Drugs Services</h6>
                        <h2 className="text-4xl font-semibold text-gray-500">{CounterUpAnimation(cardData.total_services_with_drug) || 0}</h2>
                      </div>
                      <div className="flex items-center">
                        <div className="text-white p-3 text-center inline-flex text-3xl items-center justify-center w-16 h-16 mb-5 shadow-lg rounded-3xl bg-red-200">
                          {/* <LineChartOutlined /> */}
                          <img src={Medicine} />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <span className=" text-green-300"> <RiseOutlined /> 8.3% </span>
                      <span>Up from Yesterday</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2nd Section (MAIN-FEATURES) */}
        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-10/12 px-4">
                <h1 className=" text-5xl font-bold">
                  Main Features
                </h1>
                <p className="text-lg leading-relaxed text-center m-4 text-blueGray-500">
                  This product aims to conduct a comprehensive analysis of service costs and reimbursements within the healthcare industry.
                  The focus is on comparing average submitted charges, Medicare allowed amounts, and Medicare payment amounts to identify potential discrepancies and optimize cost-effectiveness.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={Clock}
                    className="w-20 mx-auto max-w-120-px"
                  />




                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Data Collection and Integration</h5>
                    <p className="mt-1 text-sm text-blueGray-400  font-semibold">
                      Extract relevant data from the CMS Medicare database.
                      Collect provider and service data for integration.
                      Cleanse and preprocess the data for consistency.
                    </p>

                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={Monitor}
                    className=" w-20 mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Security and Privacy Measures</h5>
                    <p className="mt-1 text-sm text-blueGray-400  font-semibold">
                      Implement privacy measures for sensitive healthcare data.
                      Ensure compliance with healthcare data privacy regulations.

                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={Shuttle}
                    className=" w-20 mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Deliverables</h5>
                    <p className="mt-1 text-sm text-blueGray-400  font-semibold">
                      Integrated and cleansed healthcare dataset.
                      Documentation on data collection and integration processes
                    </p>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3rd Section (AUTOMATED REPORTS) */}
        {/* <section className=" px-60 relative py-10">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">

              <h3 className="text-5xl mb-2 font-bold leading-normal">
                Automated Reports & Widget Alerts
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed sint officia non alias, quo dicta reiciendis veritatis ducimus, a tempora nostrum quam blanditiis quaerat dolorem ipsam laborum explicabo earum consectetur!
              </p>

            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
              </div>
            </div>
          </div>
        </section> */}

        {/* 4th Section  (FULLY CUSTOMISABLE) */}
        {/* <section className=" px-60 relative py-10">
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
              </div>
            </div>
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">

              <h3 className="text-5xl mb-2 font-bold leading-normal">
                Fully customisable to address your need
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed sint officia non alias, quo dicta reiciendis veritatis ducimus, a tempora nostrum quam blanditiis quaerat dolorem ipsam laborum explicabo earum consectetur!
              </p>

            </div>


          </div>
        </section> */}

        {/* 5th Section  (PROMPT BASED)*/}
        {/* <section className=" px-60 relative py-10">
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <h3 className="text-5xl mb-2 font-bold leading-normal">
                Prompt Based Engineering
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed sint officia non alias, quo dicta reiciendis veritatis ducimus, a tempora nostrum quam blanditiis quaerat dolorem ipsam laborum explicabo earum consectetur!
              </p>

            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <Calendar fullscreen={false} />

              </div>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}
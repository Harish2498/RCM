import React from "react";
import PropTypes from "prop-types";
import { Table, Dropdown, Menu } from "antd";
import TableDropdown from "../Dropdowns/TableDropdown.jsx";

const { Column } = Table;

const CardTable = ({ color, tableData, tableName }) => {
  

  const renderDropdown = (items) => (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={`relative flex flex-col min-w-0 w-full mb-6 shadow-lg rounded border border-gray-300 p-2 `}>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-white " : "text-blueGray-700")
              }
            >
              {tableName}
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <Table dataSource={tableData} bordered={false} showHeader={true}>
          <Column title="Provider Name" dataIndex="rndrng_prvdr_last_org_name" key="providerName" />
          <Column
            title="Provider Cities"
            dataIndex="rndrng_prvdr_city"
            key="providerCities"
            render={(cities) => (
              <Dropdown   overlay={renderDropdown(cities)}>
                <a className="ant-dropdown-link " onClick={(e) => e.preventDefault()}>
                  {cities.length} cities
                </a>
              </Dropdown>
            )}
          />
          <Column
            title="Services"
            dataIndex="hcpcs_desc"
            key="services"
            render={(services) => (
              <Dropdown overlay={renderDropdown(services)}>
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  {services.length} services
                </a>
              </Dropdown>
            )}
          />
          <Column title="Medicare Payout($)" dataIndex="total_revenue" key="amount" />
        </Table>
      </div>
    </div>
  );
};

export default CardTable;

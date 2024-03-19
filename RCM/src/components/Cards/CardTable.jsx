import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import TableDropdown from "../Dropdowns/TableDropdown.jsx";

const { Column } = Table;

const CardTable = ({ color }) => {
  const data = [
    {
      key: 1,
      project: "iTest Factory",
      budget: "Branded T-Shirts",
      status: "Bags and Wallets",
      users: 8744,
      completion: '$65740',
      completion1: 67,
    },
    {
      key: 1,
      project: "iTest Factory",
      budget: "Branded T-Shirts",
      status: "Bags and Wallets",
      users: 8744,
      completion: '$65740',
      completion1: 57,
    },
    {
      key: 1,
      project: "iTest Factory",
      budget: "Branded T-Shirts",
      status: "Bags and Wallets",
      users: 8744,
      completion: '$65740',
      completion1: 27,
    },
    {
      key: 1,
      project: "iTest Factory",
      budget: "Branded T-Shirts",
      status: "Bags and Wallets",
      users: 8744,
      completion: '$65740',
      completion1: 97,
    },
    {
      key: 1,
      project: "iTest Factory",
      budget: "Branded T-Shirts",
      status: "Bags and Wallets",
      users: 8744,
      completion: '$65740',
      completion1: 17,
    },
    {
      key: 1,
      project: "iTest Factory",
      budget: "Branded T-Shirts",
      status: "Bags and Wallets",
      users: 8744,
      completion: '$65740',
      completion1: 87,
    },

  ];

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
                Top Providers
              </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <Table dataSource={data} bordered={false} showHeader={false}>
          <Column title="Project" dataIndex="project" key="project" />
          <Column title="Budget" dataIndex="budget" key="budget" />
          <Column title="Status" dataIndex="status" key="status" />
          <Column title="Users" dataIndex="users" key="users" />
          <Column title="Completion" dataIndex="completion" key="completion" />
          <Column
            title="Completion 1"
            dataIndex="completion1"
            key="completion1"
            render={(completion) => (
              <div className="flex items-center">
                <span className="mr-2">{completion}%</span>
                <div className="relative w-full">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                    <div
                      style={{ width: `${completion}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                    ></div>
                  </div>
                </div>
              </div>
            )}
          />
          <Column
            title=""
            key="action"
            render={() => <TableDropdown />}
          />
        </Table>
      </div>
    </div>
  );
};


export default CardTable;

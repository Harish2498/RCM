
import React, { useState } from 'react';
import { Button, Input, Space, Table } from 'antd';
import CardTable from '../../components/Cards/CardTable.jsx';
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';



const columns = [
    {
        title: 'Clinic/Hospital',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: '15%',
    },
    {
        title: 'Provider',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
        width: '12%',
    },
    {
        title: 'Email',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
        width: '17%',
    },
    {
        title: 'Phone',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
        width: '12%',
    },
    {
        title: 'Date',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: '12%',
    },
    {
        title: 'Tag',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: '12%',
    },
    {
        title: 'Location',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: '12%',
    },
];


const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];





const SearchByService = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onChange = (pagination, filters, sorter, extra, newSelectedRowKeys) => {
        console.log('params', pagination, filters, sorter, extra);
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };



    // const onSelectChange = (newSelectedRowKeys) => {
    //     console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    //     setSelectedRowKeys(newSelectedRowKeys);
    // };

    const rowSelection = {
        selectedRowKeys,
        onChange: onChange,
        selections: [
            Table.SELECTION_ALL,
            // Table.SELECTION_INVERT,
            // Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    return (
        <>
            <div className='bg-gray-100 p-10'>
                <div className=' m-10 p-5'>
                    <h1 style={{ fontSize: "3rem" }}>
                        Search
                    </h1>
                    <p style={{ color: "rgb(136,148,166)", width: "60%" }}>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>

                {/* Search input */}
                <div className='flex justify-center p-2'>
                    <div className='p-4 flex  ' style={{ border: "1px solid grey ", borderRadius: "4px", width: "58%" }}>
                        <div>
                            <Space.Compact size="large">
                                <Input addonBefore={<SearchOutlined />} placeholder="Services" />
                            </Space.Compact>
                        </div>
                        <div>
                            <Space.Compact size="large">
                                <Input addonBefore={<EnvironmentOutlined />} placeholder="Locations" />
                            </Space.Compact>
                        </div>
                        <div>
                            <Space.Compact size="large" style={{ border: "none" }}>
                                <Input style={{ border: "none" }} addonBefore={<EnvironmentOutlined />} placeholder="City" />
                            </Space.Compact>
                        </div>
                        <div>
                            <Space.Compact size="large">
                                <Input addonBefore={<SearchOutlined />} placeholder="Drugs" />
                            </Space.Compact>
                        </div>
                        <div>
                            <Button style={{ backgroundColor: "rgb(29,78,216)", color: "white", marginLeft: "2px" }} size='large'>Search</Button>
                        </div>
                    </div>
                </div>





                {/* first table */}
                <div className='bg-white m-10 p-5'>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} onChange={onChange} />
                </div>

                {/* for prompt */}
                <div className='p-4 '>
                    <form className=" mx-auto w-full max-w-5xl ">
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Prompt" required />
                            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>

                {/* Card Table  */}
                <div className="w-full mt-10 px-4">
                    <CardTable />
                </div>

            </div>

        </>
    )
}

export default SearchByService


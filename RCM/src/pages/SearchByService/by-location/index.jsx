import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Spin } from 'antd';
import CardTable from '../../../components/Cards/CardTable.jsx';
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { GetSearchServiceData } from '../../../api-calls/service.jsx';
import Location from '../../../assets/map.gif'

const columns = [
    {
        title: 'Provider Name',
        dataIndex: 'provider_last_org_name',
        width: '15%',
    },
    {
        title: 'Provider City',
        dataIndex: 'provider_city',
        width: '12%',
    },
    {
        title: 'Service Code',
        dataIndex: 'hcpcs_cd',
        width: '17%',
    },
    {
        title: 'Services',
        dataIndex: 'hcpcs_desc',
        width: '12%',
    },
    {
        title: 'Avergae Medicare Payment Amount',
        dataIndex: 'avg_mdcr_alowd_amt',
        width: '12%',
    },
    {
        title: 'Average Medicare Standardized Amount',
        dataIndex: 'avg_mdcr_pymt_amt',
        width: '12%',
    }
];


const ByLocation = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [services, setServices] = useState({ "user_req": "" });
    const [locations, setLocations] = useState('');
    const [cities, setCities] = useState('');
    const [drugs, setDrugs] = useState('');
    const [filteredData, setFilteredData] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = (pagination, filters, sorter, extra, newSelectedRowKeys) => {
        console.log('params', pagination, filters, sorter, extra);
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const handleSearch = async () => {
        setLoading(true); // Set loading to true when search is clicked
        try {
            const response = await GetSearchServiceData(services);
            setFilteredData(response);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false); // Set loading back to false after data is fetched
        }
    };


    return (
        <>
            <div className='bg-gray-100 p-10'>
                {/* <div className=' m-10 p-5'>
                    <h1 style={{ fontSize: "3rem" }}>
                        Search
                    </h1>
                    <p style={{ color: "rgb(136,148,166)", width: "60%" }}>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div> */}
                {/* Search input */}
                <div className='flex justify-center p-2'>
                    <div className='p-4 flex  ' style={{ border: "1px solid grey ", borderRadius: "4px", width: "58%" }}>
                        <div>
                            <Space.Compact size="large">
                                <Input addonBefore={<SearchOutlined />} placeholder="Services" onChange={(e) => setServices({ "user_req": e.target.value })} />
                            </Space.Compact>
                        </div>
                        <div>
                            <Space.Compact size="large">
                                <Input addonBefore={<EnvironmentOutlined />} placeholder="Locations" onChange={(e) => setLocations(e.target.value)} />
                            </Space.Compact>
                        </div>
                        <div>
                            <Space.Compact size="large" style={{ border: "none" }}>
                                <Input style={{ border: "none" }} addonBefore={<EnvironmentOutlined />} placeholder="City" onChange={(e) => setCities(e.target.value)} />
                            </Space.Compact>
                        </div>
                        <div>
                            <Space.Compact size="large">
                                <Input addonBefore={<SearchOutlined />} placeholder="Drugs" onChange={(e) => setDrugs(e.target.value)} />
                            </Space.Compact>
                        </div>
                        <div>
                            <Button style={{ backgroundColor: "rgb(29,78,216)", color: "white", marginLeft: "2px" }} size='large' onClick={handleSearch}>Search</Button>
                        </div>
                    </div>
                </div>
                {/* loading check  */}
                {loading && (
                    <div className="flex justify-center items-center  mt-5">
                        <Spin size="large" />
                    </div>
                )}
                {filteredData ? (
                    <div>
                        {/* Table */}
                        <div className='bg-white m-10 p-5'>
                            <Table columns={columns} dataSource={filteredData} onChange={onChange} />
                        </div>
                        {/* for prompt */}
                        {/* <div className='p-4 '>
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
                        </div> */}
                        {/* Card Table  */}
                        {/* <div className="w-full mt-10 px-4">
                            <CardTable />
                        </div> */}
                    </div>
                ) :
                    <div className='flex justify-center mt-4 '>
                        <img src={Location} width={'20%'} />
                    </div>
                }

            </div>
        </>
    )
}

export default ByLocation






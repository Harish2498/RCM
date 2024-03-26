import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Spin, Select, message } from 'antd'; // Import message from Ant Design
import CardTable from '../../../components/Cards/CardTable.jsx';
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { GetSearchServiceData } from '../../../api-calls/service.jsx';
import GlobalSearch from '../../../assets/global.gif';

const columns = [
    {
        title: 'Provider Name',
        dataIndex: 'rndrng_prvdr_last_org_name',
        width: '15%',
    },
    {
        title: 'Provider City',
        dataIndex: 'rndrng_prvdr_city',
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
        title: 'Average Medicare Payment Amount',
        dataIndex: 'avg_mdcr_stdzd_amt',
        width: '12%',
    },
    {
        title: 'Average Medicare Standardized Amount',
        dataIndex: 'avg_mdcr_pymt_amt',
        width: '12%',
    },
];

const ByService = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [services, setServices] = useState({ user_req: '' });
    const [filteredData, setFilteredData] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // State to store error message

    // Select list state
    const [providerNameList, setProviderNameList] = useState(null);
    const [providerCityList, setProviderCityList] = useState(null);
    const [selectedProviderName, setSelectedProviderName] = useState(null);
    const [selectedProviderCity, setSelectedProviderCity] = useState(null);

    const onChange = (pagination, filters, sorter, extra, newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await GetSearchServiceData(services);
            console.log(response);

            if (response.message) {
                setErrorMessage(response.message); // Set error message
                setTableData(null); // Clear table data in case of error
                setFilteredData(null);
            } else {
                setTableData(response);
                setFilteredData(response);

                // Set provider name list and city list
                const nameList = response.map((item) => ({
                    label: item.rndrng_prvdr_last_org_name,
                    value: item.rndrng_prvdr_last_org_name,
                }));
                const cityList = response.map((item) => ({
                    label: item.rndrng_prvdr_city,
                    value: item.rndrng_prvdr_city,
                }));
                setProviderNameList(nameList);
                setProviderCityList(cityList);

                // Clear error message if data is successfully fetched
                setErrorMessage(null);
            }
        } catch (error) {
            console.log('Error:', error);
            message.error('Please Enter the Request ');
            setErrorMessage('Please Enter the Request ');
        } finally {
            setLoading(false);
        }
    };

    const tableDataFilterFunction = () => {
        let filtered = tableData;
        if (selectedProviderName) {
            filtered = filtered.filter((item) => item.rndrng_prvdr_last_org_name === selectedProviderName);
        }
        if (selectedProviderCity) {
            filtered = filtered.filter((item) => item.rndrng_prvdr_city === selectedProviderCity);
        }
        setFilteredData(filtered);
    };

    const onSearch = (value, dataIndex) => {
        const filtered = tableData.filter(
            (item) => item[dataIndex] && item[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const filterOption = (inputValue, option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

    useEffect(() => {
        tableDataFilterFunction();
    }, [selectedProviderName, selectedProviderCity]);

    return (
        <>
            <div className="bg-gray-100 p-10">
                {/* Search input */}
                <div className="flex justify-center p-2">
                    <div className="p-4 flex" style={{ border: '1px solid grey', borderRadius: '4px', width: '58%' }}>
                        <div style={{ width: '100%' }}>
                            <Space.Compact size="large" style={{ width: '100%' }}>
                                <Input
                                    fullWidth
                                    addonBefore={<SearchOutlined />}
                                    placeholder="Services"
                                    onChange={(e) => setServices({ user_req: e.target.value })}
                                />
                            </Space.Compact>
                        </div>
                        <div>
                            <Button
                                style={{ backgroundColor: 'rgb(29,78,216)', color: 'white', marginLeft: '2px' }}
                                size="large"
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Table and other components */}
                {loading && (
                    <div className="flex justify-center items-center mt-5">
                        <Spin size="large" />
                    </div>
                )}
                {errorMessage ? (
                    <div className="flex justify-center mt-4">
                        <div style={{ color: 'red', fontSize: '16px' }}>{errorMessage}</div>
                    </div>
                ) : tableData ? (
                    <div className="bg-white m-10 p-5">
                        <div className="flex gap-3 mb-5">
                            <Select
                                className="w-48"
                                showSearch
                                placeholder="Select a provider Name"
                                optionFilterProp="children"
                                onChange={(value) => setSelectedProviderName(value)}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={providerNameList}
                                variant="filled"
                            />
                            <Select
                                className="w-48"
                                showSearch
                                placeholder="Select provider city"
                                optionFilterProp="children"
                                onChange={(value) => setSelectedProviderCity(value)}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={providerCityList}
                                variant="filled"
                            />
                        </div>
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            onChange={onChange}
                            locale={{
                                emptyText: <div>No Data</div>,
                            }}
                        />
                    </div>
                ) : (
                    <div className="flex justify-center mt-4">
                        <img src={GlobalSearch} width={'30%'} />
                    </div>
                )}
            </div>
        </>
    );
};

export default ByService;

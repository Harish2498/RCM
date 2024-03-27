import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Spin, Select } from 'antd';
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { GetDataByLocation, GetLocationData, GetSearchServiceData } from '../../../api-calls/service.jsx';
import Location from '../../../assets/map.gif';
import './style.css';
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
//state code to name
const stateCodeToName = {
    "CA": "California",
    "NH": "New Hampshire",
    "OR": "Oregon",
    "ND": "North Dakota",
    "TX": "Texas",
    "PR": "Puerto Rico",
    "NV": "Nevada",
    "KY": "Kentucky",
    "OH": "Ohio",
    "GU": "Guam",
    "NY": "New York",
    "HI": "Hawaii",
    "NM": "New Mexico",
    "IN": "Indiana",
    "MS": "Mississippi",
    "DC": "District of Columbia",
    "NE": "Nebraska",
    "WV": "West Virginia",
    "FL": "Florida",
    "MO": "Missouri",
    "AR": "Arkansas",
    "ME": "Maine",
    "NC": "North Carolina",
    "WI": "Wisconsin",
    "CT": "Connecticut",
    "SD": "South Dakota",
    "RI": "Rhode Island",
    "OK": "Oklahoma",
    "ID": "Idaho",
    "GA": "Georgia",
    "MN": "Minnesota",
    "PA": "Pennsylvania",
    "AK": "Alaska",
    "MD": "Maryland",
    "WY": "Wyoming",
    "LA": "Louisiana",
    "MT": "Montana",
    "IL": "Illinois",
    "TN": "Tennessee",
    "MI": "Michigan",
    "WA": "Washington",
    "NJ": "New Jersey",
    "MA": "Massachusetts",
    "AL": "Alabama",
    "UT": "Utah",
    "IA": "Iowa",
    "CO": "Colorado",
    "VT": "Vermont",
    "SC": "South Carolina",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "DE": "Delaware",
    "AZ": "Arizona",
    "KS": "Kansas"
};


const ByLocation = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [services, setServices] = useState({ "user_req": "" });
    const [filteredData, setFilteredData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stateData, setStateData] = useState(null);
    const [cityList, setCityList] = useState([]);
    const [serviceList, setServiceList] = useState([]);



    const onChange = (pagination, filters, sorter, extra, newSelectedRowKeys) => {
        console.log('params', pagination, filters, sorter, extra);
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await GetSearchServiceData(services);
            setFilteredData(response);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleLocationSearch = async () => {
        try {
            const response = await GetLocationData();
            setStateData(response.unique_states);
        } catch (error) {
            console.log("Error:", error);
        }
    }
    useEffect(() => {
        handleLocationSearch();
    }, []);


    const onStateChange = async (value) => {
        setLoading(true);

        try {
            const GetDataByLocationResponse = await GetDataByLocation(value);
            console.log(GetDataByLocationResponse);
            if (GetDataByLocationResponse && GetDataByLocationResponse.cities_services) {
                const citiesList = GetDataByLocationResponse.cities_services.map(cityData => ({
                    label: cityData.city,
                    value: cityData.city,
                    services: cityData.services
                }));


                setCityList(citiesList);
            }
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };


    //onCity Change
    const onCityChange = (option) => {
        console.log(option.services, "seleted city");

        // setSelectedCity(option.value);
        setServiceList(option.services.map((e) => ({
            label: e,
            value: e,
        })))

    };

    // onSearch function
    const onSearch = (value, dataIndex) => {
        const filtered = stateData.filter((item) =>
            item[dataIndex] && item[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        );
        // setFilteredData(filtered);
    };
    // Filter Option function
    const filterOption = (inputValue, option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    return (
        <>
            <div className='bg-gray-100 p-10'>
                <div className='flex justify-center p-2'>
                    <div className='p-4 flex' style={{ border: "1px solid grey", borderRadius: "4px", width: "50%" }}>
                        {/* <div>
                            <Space.Compact size="large">
                                <Input addonBefore={<SearchOutlined />} placeholder="Services" onChange={(e) => setServices({ "user_req": e.target.value })} />
                            </Space.Compact>
                        </div> */}
                        <div className='mr-2'>
                            <Space.Compact size="large">
                                <div className='flex' >
                                    <EnvironmentOutlined
                                        style={{
                                            fontSize: "1rem",
                                            border: "1px solid rgb(217,217,217)",
                                            borderRadius: "5px",
                                            padding: ".7rem",
                                        }}
                                    />
                                    <Select
                                        addonBefore={<EnvironmentOutlined />}
                                        className='w-48'
                                        showSearch
                                        placeholder="Select a State Name"
                                        optionFilterProp="children"
                                        // value={selectedState}
                                        onChange={onStateChange}
                                        onSearch={onSearch}
                                        filterOption={filterOption}
                                        options={stateData && stateData.map(stateCode => ({ label: stateCodeToName[stateCode], value: stateCode }))}
                                        prefixIcon={<EnvironmentOutlined />}
                                        variant='filled'
                                    />
                                </div>
                            </Space.Compact>
                        </div>

                        <div className='mr-2'>
                            <Space.Compact size="large">
                                <div className='flex' >
                                    <EnvironmentOutlined
                                        style={{
                                            fontSize: "1rem",
                                            border: "1px solid rgb(217,217,217)",
                                            borderRadius: "5px",
                                            padding: ".7rem",
                                        }}
                                    />
                                    <Select
                                        addonBefore={<EnvironmentOutlined />}
                                        className='w-48'
                                        showSearch
                                        placeholder="Select a City Name"
                                        optionFilterProp="children"
                                        // value={cityList}
                                        onChange={(e, option) => onCityChange(option)}
                                        onSearch={onSearch}
                                        disabled={!cityList.length ? true : false}
                                        filterOption={filterOption}
                                        options={cityList}
                                        prefixIcon={<EnvironmentOutlined />}
                                        variant='filled'
                                    />
                                </div>
                            </Space.Compact>
                        </div>
                        <div >
                            <Space.Compact size="large">
                                <div className='flex justify-end mr-4' >
                                    <SearchOutlined
                                        style={{
                                            fontSize: "1rem",
                                            border: "1px solid rgb(217,217,217)",
                                            borderRadius: "5px",
                                            padding: ".7rem",
                                        }}
                                    />
                                    <Select
                                        addonBefore={<EnvironmentOutlined />}
                                        className='w-48'
                                        showSearch
                                        placeholder="Select a Service"
                                        optionFilterProp="children"
                                        disabled={!serviceList.length ? true : false}

                                        filterOption={filterOption}
                                        options={serviceList}
                                        prefixIcon={<EnvironmentOutlined />}
                                        variant='filled'
                                    />
                                </div>
                            </Space.Compact>
                        </div>
                        <div>
                            <Button style={{ backgroundColor: "rgb(29,78,216)", color: "white", marginLeft: "2px" }} size='large' onClick={handleSearch}>Search</Button>
                        </div>
                    </div>
                </div>
                {loading && (
                    <div className="flex justify-center items-center mt-5">
                        <Spin size="large" />
                    </div>
                )}
                {filteredData ? (
                    <div className='bg-white m-10 p-5'>
                        <Table columns={columns} dataSource={filteredData} onChange={onChange} />
                    </div>
                ) :
                    <div className='flex justify-center mt-4'>
                        <img src={Location} width={'20%'} alt="Map" />
                    </div>
                }
            </div>
        </>
    )
}
export default ByLocation;






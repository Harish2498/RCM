import React from 'react';
import { Tabs } from 'antd';
import ByService from './by-service';
import ByLocation from './by-location';
const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Search by key word',
        children: <ByService />,
    },
    {
        key: '2',
        label: 'Selective search',
        children: <div className='flex justify-center items-center h-96'><h1 className='text-xl'>Work in progress</h1></div>,
        // children: <ByLocation />,
    }
]
const SearchByService = () =>
    <Tabs
        className='mt-16 p-10 '
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
    />;
export default SearchByService;
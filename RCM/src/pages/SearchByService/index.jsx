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
        label: 'Search by Keyword',
        children: <ByService />,
    },
    {
        key: '2',
        label: 'Personalized search',
        children: <ByLocation />,
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
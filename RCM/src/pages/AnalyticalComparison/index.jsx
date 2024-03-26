
import React, { useEffect, useState } from 'react';
import CardTable from '../../components/Cards/CardTable';
import ComparisonBarGraph from './comparisonBarGraph';
import { Button, Spin } from 'antd';
import { GetComparisionData } from '../../api-calls/comparision';


const AnalyticalComparison = () => {
    const [topEarners, setTopEarners] = useState(null)
    const [bottomEarners, setBottomEarners] = useState(null)
    const [loading, setLoading] = useState(false);
    const [genAiData, setGenAiData] = useState();

    const GetComparisionTableData = async () => {
        try {
            setLoading(true)
            const response = await GetComparisionData();
            setTopEarners(response.top_earners)
            setBottomEarners(response.bottom_earners)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }

    }

    const generateGenAiData = async () => {
        const response = await GetGenAiData();

    }

    // useEffect(() => {
    //     GetComparisionTableData();
    // }, [])

    return (
        <>
            <div>
                <div className='bg-gray-100 p-10'>
                    <div className=' m-5 p-5'>
                        <h1 style={{ fontSize: "3rem" }}>
                            Analytical Comparison
                        </h1>
                        <p style={{ width: "60%" }} className=' text-gray-500 '>
                            Click on below button for generating the detailed comparison between top ten providers and bottom ten providers.
                        </p>
                    </div>

                    <div className='flex justify-center mt-10'>
                        {/* <Button type="primary" onClick={() => window.print()}>Download Report</Button> */}
                        <button type="submit" onClick={GetComparisionTableData} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Click here for comparison</button>
                    </div>

                    {loading && (
                        <div className="flex justify-center items-center  mt-5">
                            <Spin size="large" />
                        </div>
                    )}

                    {(bottomEarners) && <div>

                        {/* Card Table  */}
                        <div className="flex mt-10 px-4">
                            <CardTable tableData={topEarners} tableName={'Top Providers'} className='pr-2' />
                            <div style={{ marginRight: '16px' }} /> {/* Adjust the margin-right value as needed */}
                            <CardTable tableData={bottomEarners} tableName={'Bottom Providers'} />
                        </div>

                        {/* graph div */}
                        <div>
                            <h1 style={{ fontSize: "3rem", marginBottom: '1rem' }}>
                                Graph Comparison
                            </h1>
                            <div className='flex gap-10'>
                                <div className='w-1/2'>
                                    <h1 className=' font-semibold'>Based on top Providers</h1>
                                    <ComparisonBarGraph data={topEarners} />
                                </div>
                                <div className='w-1/2'>
                                    <h1 className=' font-semibold'>Based on bottom Providers</h1>
                                    <ComparisonBarGraph data={bottomEarners} />
                                </div>
                            </div>
                        </div>

                        {/* download buton */}
                        {/* for prompt */}
                        {/* <div className='p-4 mt-10'>
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
                        <div className='flex justify-center mt-10'>
                            {/* <Button type="primary" onClick={() => window.print()}>Download Report</Button> */}
                            <button type="submit" onClick={generateGenAiData} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate Gen AI Report</button>
                        </div>
                    </div>}

                </div>
            </div>
        </>
    )
}

export default AnalyticalComparison
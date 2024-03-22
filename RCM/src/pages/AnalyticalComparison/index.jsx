
import React from 'react';
import CardTable from '../../components/Cards/CardTable';
import ComparisonBarGraph from './comparisonBarGraph';

const AnalyticalComparison = () => {

    return (
        <>
            <div>
                <div className='bg-gray-100 p-10'>
                    <div className=' m-5 p-5'>
                        <h1 style={{ fontSize: "3rem" }}>
                            Analytical Comparison
                        </h1>
                        {/* <p style={{ color: "rgb(136,148,166)", width: "60%" }}>
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p> */}
                    </div>
                    <div>
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
                        <div className="flex mt-10 px-4">
                            <CardTable className='pr-2' />
                            <div style={{ marginRight: '16px' }} /> {/* Adjust the margin-right value as needed */}
                            <CardTable />
                        </div>

                        {/* graph div */}
                        <div>
                            <h1 style={{ fontSize: "3rem", marginBottom: '1rem' }}>
                                Graph Comparison
                            </h1>
                            <div>
                                <ComparisonBarGraph />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default AnalyticalComparison
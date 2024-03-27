
import React, { useEffect, useState } from 'react';
import CardTable from '../../components/Cards/CardTable';
import ComparisonBarGraph from './comparisonBarGraph';
import { Button, Spin, Tooltip } from 'antd';
import { GetComparisionData } from '../../api-calls/comparision';
import { DownloadOutlined } from '@ant-design/icons'


const genAiData = `
**Detailed Report on Rndrng_Prvdr_Last_Org_Name and Revenues**

**Data Analysis:**

The provided data includes information on various medical procedures and services, along with the corresponding revenue generated for each.
The Rndrng_Prvdr_Last_Org_Name column identifies the healthcare provider responsible for administering the service.

**Revenue Breakdown by Provider:**
| Rndrng_Prvdr_Last_Org_Name | Total Revenue | Percentage of Total |
|---|---|---|
| anderson hills pediatrics inc | $472 | 20.9% |
| medical imaging center llc | $409 | 18.1% |
| subhan pharmacy inc | $380 | 16.8% |
| cura vita llc | $259 | 11.5% |
| barbara ann karmanos cancer hospital | $258 | 11.4% |
| mercy health youngstown llc | $244 | 10.8% |
| city of watertown | $227 | 10.0% |
| beaver county memorial hospital | $173 | 7.7% |
| appalachian regional healthcare inc | $163 | 7.2% |

**Key Observations:**

* anderson hills pediatrics inc generated the highest revenue ($472) among all the providers, accounting for over 20% of the total.
* The top 5 providers (anderson hills pediatrics inc, transform km of michigan llc, medical imaging center llc, subhan pharmacy inc, 
 and cura vita llc) generated over 85% of the total revenue.
* The remaining 5 providers contributed to the remaining 15% of the revenue.
* There is a significant difference in revenue generation among the providers, with some generating over $400 while others under $200.

**Interpretation:**

The data suggests that the healthcare providers with larger patient populations or higher patient demand tend to generate higher 
revenues. Factors such as location, reputation, and specialization can also contribute to revenue differences.

**Recommendations:**

Healthcare providers seeking to increase their revenue may consider strategies such as:

* Expanding their patient base through marketing and patient outreach programs
* Offering a wider range of services to meet patient needs
* Partnering with other healthcare providers to offer complementary services
* Improving patient satisfaction and loyalty through enhanced patient experiences
     

"Report on cities given"
- Cincinnati and Marshall are the only cities mentioned with patients receiving the Sarscov2 vaccine.
- New York City is the only city mentioned with a patient receiving a covid-19 vaccine booster.
- Houston and Detroit are the only cities mentioned with patients receiving an influenza virus vaccine.
- Girard is the only city mentioned with a patient receiving a blood test for clotting time.
- Watertown is the only city mentioned with a patient receiving an influenza virus vaccine administered by the city.
- Beaver is the only city mentioned with a patient receiving a pneumococcal vaccine.
- Prestonsburg is the only city mentioned with a patient receiving an influenza virus vaccine administered by Appalachian Regional 
Healthcare Inc.


**Comparision based on medicare payout:**

| provider_name | procedure_description | location | medicare_payout |
|---|---|---|---|
| city of watertown | Administration of influenza virus vaccine | Watertown | 227 |
| beaver county memorial hospital | Administration of pneumococcal vaccine | Beaver | 173 |
| appalachian regional healthcare inc | Administration of influenza virus vaccine | Prestonsburg | 163 |
| subhan pharmacy inc | Fee covid-19 vac 2 booster | Brooklyn | 380 |
| cura vita llc | Administration of influenza virus vaccine | Houston | 259 |
| barabara ann karmanos cancer hospital | Administration of influenza virus vaccine | Detroit | 258 |
| mercy health youngstown llc | Blood test, clotting time | Girard | 244 |
| medical imaging center llc | Ultrasound behind abdominal cavity | Lumberton | 409 |
| transform km of michigan llc | Adm sarscov2 100mcg/0.5ml1st | Marshall | 416 |
| anderson hills pediatrics inc | Adm sarscov2 100mcg/0.5ml1st, Adm sarscov2 100mcg/0.5ml2nd, Sarscov2 vac 100mcg/0.5ml im | 
Cincinnati | 472 |



| provider_name | procedure_description | location | medicare_payout |
|---|---|---|---|
| anderson hills pediatrics inc | Adm sarscov2 100mcg/0.5ml1st, Adm sarscov2 100mcg/0.5ml2nd, Sarscov2 vac 100mcg/0.5ml im | 
Cincinnati | 472 |
| transform km of michigan llc | Adm sarscov2 100mcg/0.5ml1st | Marshall | 416 |
| medical imaging center llc | Ultrasound behind abdominal cavity | Lumberton | 409 |
| subhan pharmacy inc | Fee covid-19 vac 2 booster | Brooklyn | 380 |
| cura vita llc | Administration of influenza virus vaccine | Houston | 259 |
| barabara ann karmanos cancer hospital | Administration of influenza virus vaccine | Detroit | 258 |
| mercy health youngstown llc | Blood test, clotting time | Girard | 244 |
| city of watertown | Administration of influenza virus vaccine | Watertown | 227 |
| beaver county memorial hospital | Administration of pneumococcal vaccine | Beaver | 173 |
| appalachian regional healthcare inc | Administration of influenza virus vaccine | Prestonsburg | 163 |

**Comparison:**

The top 10 providers have a total revenue that is significantly higher than the bottom 10 providers. The top provider, anderson hills 
pediatrics inc, has a total revenue of 472, which is more than double the total revenue of the bottom provider, appalachian 
regional healthcare inc.
`

const AnalyticalComparison = () => {
    const [topEarners, setTopEarners] = useState(null)
    const [bottomEarners, setBottomEarners] = useState(null)
    const [loading, setLoading] = useState(false);
    const [viewGenAiData, setViewGenAiData] = useState(false);

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
        setLoading(true)
        setTimeout(() => {
            setViewGenAiData(true)
            setLoading(false)
        }, 20000);
    }

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([genAiData], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "genAiData.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };



    return (
        <>
            <div>
                <div className='bg-gray-100 p-10'>
                    <div className=' m-5 p-5'>
                        <h1 style={{ fontSize: "3rem" }}>
                            Analytical Comparison
                        </h1>
                        <p style={{ width: "60%" }} className=' text-gray-500 '>
                            Click on below button for generating the detailed service wise average payout comparison between top ten providers and bottom ten providers.
                        </p>
                    </div>

                    <div className='flex justify-center mt-10'>
                        {/* <Button type="primary" onClick={() => window.print()}>Download Report</Button> */}
                        <button type="submit" onClick={GetComparisionTableData} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Medicare payout details</button>
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
                                Visual Insights
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
                            <button type="submit" onClick={generateGenAiData} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Gen AI Recommendation Report</button>
                        </div>
                        {loading && (
                            <div className="flex justify-center flex-col items-center  mt-5">
                                <Spin size="large" />
                                <span>Generating response please wait..</span>
                            </div>
                        )}
                        {
                            viewGenAiData &&
                            <div className='border border-solid border-slate-200 p-5 rounded-md shadow-lg mt-10'>
                                <div className='flex justify-between'>
                                    <h1 className=' text-2xl font-semibold mb-5 underline underline-offset-4'>Generated Report</h1>
                                    <div className='flex gap-2'>
                                        <Tooltip title='Download text file'>
                                            <Button onClick={handleDownload}><DownloadOutlined /></Button>
                                        </Tooltip>
                                        <Tooltip title='Download PDF file'>
                                            <Button onClick={() => window.print()}>PDF</Button>
                                        </Tooltip>
                                    </div>
                                </div>
                                <pre>{genAiData}</pre>
                            </div>
                        }
                    </div>
                    }

                </div>
            </div>
        </>
    )
}

export default AnalyticalComparison
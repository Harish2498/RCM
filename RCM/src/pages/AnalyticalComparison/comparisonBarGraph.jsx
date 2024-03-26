// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const ComparisonBarGraph = ({ topEarners, bottomEarners }) => {
//     const [chartData, setChartData] = useState({
//         series: [{
//             name: 'Top Providers ',
//             data: topEarners.total_revenue
//         }, {
//             name: 'Bottom Providers',
//             data: bottomEarners.total_revenue

//         },
//         ],
//         options: {
//             chart: {
//                 type: 'bar',
//                 height: 350
//             },
//             plotOptions: {
//                 bar: {
//                     horizontal: false,
//                     columnWidth: '55%',
//                     endingShape: 'rounded',
//                     colors: {
//                         ranges: [{
//                             // from: 0,
//                             // to: 50,
//                             color: '#FF0000' // Red color for values below 50
//                         }, {
//                             // from: 51,
//                             // to: 100,
//                             color: '#00FF00' // Green color for values above 50
//                         }]
//                     }
//                 },
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             stroke: {
//                 show: true,
//                 width: 2,
//                 colors: ['transparent']
//             },
//             xaxis: {
//                 categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
//             },
//             yaxis: {
//                 title: {
//                     text: '$ (thousands)'
//                 }
//             },
//             fill: {
//                 opacity: 1
//             },
//             tooltip: {
//                 y: {
//                     formatter: function (val) {
//                         return "$ " + val + " thousands"
//                     }
//                 }
//             }
//         }
//     });

//     return (
//         <div>
//             <div id="chart">
//                 <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
//             </div>
//             <div id="html-dist"></div>
//         </div>
//     );
// }

// export default ComparisonBarGraph;

import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Graph = ({ data }) => {
    // Prepare data for the chart
    const chartData = data.map(item => ({
        x: item.rndrng_prvdr_last_org_name,
        y: item.total_revenue,
        cities: item.rndrng_prvdr_city.length,
        services: item.hcpcs_desc.length
    }));

    // Options for the chart
    const options = {
        chart: {
            type: 'bar',
            height: 600,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            title:'Providers name',
            categories: chartData.map(item => item.x),
            // labels: {
            //     formatter: function (val) {
            //         return val.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            //     }
            // }
        },
        yaxis: {
            title: {
                text: 'Medicare Payout($)'
            }
        },
        tooltip: {
            y: {
              formatter: function(val) {
                return `$${val}`;
              }
            },
            custom: function({ seriesIndex, dataPointIndex, w }) {
              const provider = w.globals.seriesX[0][dataPointIndex];
              const revenue = w.globals.series[0][dataPointIndex];
              const cities = w.config.series[0].data[dataPointIndex].cities;
              const services = w.config.series[0].data[dataPointIndex].services;
        
              return `
                <div class="apexcharts-tooltip">
                  <div>Provider: ${provider}</div>
                  <div>Revenue: $${revenue}</div>
                  <div>Cities: ${cities}</div>
                  <div>Services: ${services}</div>
                </div>
              `;
            }
          }
    };

    // Series for the chart
    const series = [{
        data: chartData.map(item => item.y)
    }];

    return (
        <ReactApexChart options={options} series={series} type="bar" height={350} />
    );
};

export default Graph;


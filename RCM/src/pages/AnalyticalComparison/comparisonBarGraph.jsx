import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ComparisonBarGraph = () => {
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Table-1 ',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Table-2',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                    colors: {
                        ranges: [{
                            // from: 0,
                            // to: 50,
                            color: '#FF0000' // Red color for values below 50
                        }, {
                            // from: 51,
                            // to: 100,
                            color: '#00FF00' // Green color for values above 50
                        }]
                    }
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
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        }
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default ComparisonBarGraph;

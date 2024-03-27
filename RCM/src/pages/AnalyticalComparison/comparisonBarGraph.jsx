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
            title: 'Providers name',
            categories: chartData.map(item => item.x),
            labels: {
                rotate: 270,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Arial, sans-serif'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Medicare Payout($)'
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return `$${val}`;
                }
            },
            custom: function ({ seriesIndex, dataPointIndex }) {
                const provider = chartData[dataPointIndex].x;
                const revenue = chartData[dataPointIndex].y;
                const cities = chartData[dataPointIndex].cities;
                const services = chartData[dataPointIndex].services;

                return `
                    <div class="apexcharts-tooltip">
                        <div>Provider: ${provider}</div>
                        <div>Revenue: $${revenue}</div>
                        <div>Total Cities: ${cities}</div>
                        <div>Total Services: ${services}</div>
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

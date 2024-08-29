// components/TopCategoriesChart.js
"use client"
import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts';

const BarGraph = ({  data, barColors = [] }) => {
    const chartRef = useRef(null);
    
    // Configuration for label options
    const labelOption = {
        show: true,
        position: 'insideBottom',
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        // formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {}
        }
    };
    const options = useMemo(() => {
        
        // Prepare the series data for each yAxis dataset
        const series = data.yAxis.map((yAxis, index) => ({
            name: yAxis.name, // Use the yAxis name for the series name
            type: 'bar', // Specify the chart type as bar
            data: yAxis.data[0].data, // Data for the series
            itemStyle: {
                color: barColors[index] || undefined // Use provided color or default to undefined
            },
            emphasis: {
                focus: 'series'
            }
        }));

        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: series.map(s => s.name) // Use series names for legend
            },
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            grid: {
                containLabel: true // Ensures labels are contained within the chart area
            },
            xAxis: {
                type: 'category',
                axisTick: { show: false },
                data: data.xAxis.data, // Data for the x-axis
                name: data.xAxis.name, // Name of the x-axis
                nameLocation: 'middle', // Position the name in the middle
                nameTextStyle: {
                    fontSize: 16,
                    padding: 20, // Adjust padding to control distance from axis
                }

            },
            yAxis: {
                type: 'value', // Y-axis is a value axis
                name: data.yAxis.name, // Name of the x-axis
              
            },
            series // Series data for the chart
        };
    }, [ data, barColors]);

    useEffect(() => {
        // Initialize the chart instance
        const chartInstance = echarts.init(chartRef.current);
        // Set the options for the chart instance
        chartInstance.setOption(options);

        // Handle window resize to make the chart responsive
        const handleResize = () => {
            chartInstance.resize();
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to dispose the chart instance and remove event listener
        return () => {
            chartInstance.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, [options]); // Effect dependencies

    return (
        // Render the div that will hold the chart
        <div ref={chartRef} className=' bg-white' style={{ width: 'auto', height: '500px' }}></div>
    );
};

// PropTypes for type checking the props
BarGraph.propTypes = {
    title: PropTypes.string.isRequired, // Title of the chart
    data: PropTypes.shape({
        xAxis: PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.string).isRequired, // Data for x-axis labels
            name: PropTypes.string // Name of the x-axis
        }).isRequired,
        yAxis: PropTypes.arrayOf(PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.number).isRequired, // Data for y-axis values
            name: PropTypes.string // Name of the y-axis
        })).isRequired
    }).isRequired,
    barColors: PropTypes.arrayOf(PropTypes.string) // Optional array of colors for the bars
};

export default BarGraph;

import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleOrdinal, format, extent, timeFormat } from 'd3';
import { useData } from './useData';
import ReactDropdown from 'react-dropdown';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { Dropdown } from './Dropdown';
import { Colorlegend } from './Colorlegend';
import 'react-dropdown/style.css';
import './App.css';

const width = 960;
const menuHeight = 50
const height = 500 - menuHeight;
const margin = { top: 10, right: 130, bottom: 80, left: 110 };
const xAxisLabelOffset = 65;
const yAxisLabelOffset = 60;

const attributes = [
  { value: 'Capacity', label: '수용 인원(명)' },
  { value: 'Cost', label: '건설 비용 (백만$)' },
  { value: 'Opened', label: '개장 연도' }
];
const colorAttributes = [
  { value: 'RoofType', label: '지붕 유형' },
  { value: 'Used', label: '사용 여부' }
];


const getLabel = value => {
  for(let i = 0; i < attributes.length; i++){
    if(attributes[i].value === value){
      return attributes[i].label;
    }
  }
};

const App = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null); 

  const initialYAttribute = 'Capacity'
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);
  const fadeOpacity = 0.2;

  if (!data) {
    return <pre>Loading...</pre>;
  }

  console.log(data.columns);
  
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  const xValue = d => d.Opened;
  const xAxisLabel = '개장 연도'


  const legendCircleRadius = 7;

  const colorValue = d => d.Rooftype;
  const colorLegendLabel = '지붕 종류';
  
  const filteredData = data.filter(d => hoveredValue === colorValue(d));
  
  const xAxisTickFormat = timeFormat("%Y");

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  
  const yScale = scaleLinear()
    .domain(extent(data, yValue))  
    .range([innerHeight, 0])
    .nice();

    const colorScale = scaleOrdinal()
  	.domain(data.map(colorValue))
    .range(['#8E6C8A', '#42A5B3', '#E6842A']);

  return (
     <>
      <div width={width} height={height/5}>
        <h2 className="title-label"> MLB 홈구장의 변화 </h2>
      </div>
      <div className = 'menus-container'>
        <span className="dropdown-label">Y</span>
        <ReactDropdown
            options={attributes}
            id="y-select"
            Value={yAttribute}
            onChange={({value}) => setYAttribute(value)}
        />
        <span className="dropdown-label">색상</span>
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={8}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},
            ${innerHeight /2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft 
            yScale={yScale} 
            innerWidth={innerWidth} 
            tickOffset={5} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <g className = "tick" transform={`translate(${innerWidth +20}, ${menuHeight})`}>
            <text
              className="legend-label"
              x={42}
              y={-20}
              textAnchor="middle">
              {colorLegendLabel}
            </text>  
          	<Colorlegend 
              tickSpacing={22}
              tickSize={10}
              tickTextOffset={12}
              colorScale={colorScale}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
          <g opacity={hoveredValue ? fadeOpacity : 1}>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={5}
          />
          </g>
          <Marks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={5}
          />
        </g>
      </svg>
    </>
  );
  <svg width={width} height={height}>

  </svg>
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
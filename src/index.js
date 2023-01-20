import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleOrdinal, format, extent, timeFormat } from 'd3';
import { useData } from './useData';
import { landMarks } from './landMarks';
import ReactDropdown from 'react-dropdown';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { Dropdown } from './Dropdown';
import { Colorlegend } from './Colorlegend';
import { useUsAtlas } from './useUsAtlas.js';
import { PointMap } from './PointMap.js';
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
  { value: 'km', label: '도심과의 거리(km)' }
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
  const usAtlas = useUsAtlas();

  const [hoveredValue, setHoveredValue] = useState(null); 

  const initialYAttribute = 'Capacity'
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);
  const fadeOpacity = 0.2;

  if (!usAtlas || !data) {
    return <pre className='dropdown-label'>Loading...</pre>;
  }
  
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  const xValue = d => d.Opened;
  const xAxisLabel = '개장 연도'
  const xAxisTickFormat = timeFormat("%Y");
  const legendCircleRadius = 7;
  const colorValue = d => d.Rooftype;
  const colorLegendLabel = '지붕 종류';
  
  const filteredData = data.filter(d => hoveredValue === colorValue(d));

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

  const pointColorValue = d => d.Team;

  return (
     <>
      <div className='title-box' width={width} height={height/5}>
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
      <div className='footnote-box' width={width} height={height}>
        <pre className="footnote-label">
          제작: 윤준식 | <a href="https://github.com/ArubaKLM" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=FFFFFF"/></a>
          <br/>원데이터: <a href={'https://github.com/ArubaKLM/MLB_ballparks_viz/blob/main/mlb_stadium.csv'}>csv 파일로 이동</a>
        </pre>
      </div>
    </>
  );
  <svg width={width} height={height}>

  </svg>
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);


{/* <svg width={width} height={height}>
      <PointMap pointData={pointData} usAtlas={usAtlas}/>
      </svg> */}

{/* <span className="dropdown-label">색상</span> */}
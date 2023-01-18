export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  colorScale,
  colorValue,
  tooltipFormat,
  circleRadius
}) =>
  data.map(d => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      r={circleRadius}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ));


  // className="tick"
  //       transform={`translate(0, ${i * tickSpacing})`}
  //       onMouseEnter= {() =>{ onHover(domainValue); }}

  // export const Marks = ({
  //   data,
  //   xScale,
  //   yScale,
  //   xValue,
  //   yValue,
  //   colorScale,
  //   colorValue,
  //   tooltipFormat,
  //   circleRadius,
  //   onHover,
  //   hoveredValue,
  //   fadeOpacity
  // }) =>
  //   data.map((domainValue) => (
  //     <circle
  //       className="mark"
  //       cx={xScale(xValue(d))}
  //       cy={yScale(yValue(d))}
  //       fill={colorScale(colorValue(d))}
  //       r={circleRadius}
  //       onMouseEnter= {() =>{ onHover(domainValue); }}
  //       opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
  //     >
  //       <title>{tooltipFormat(xValue(d))}</title>
  //     </circle>
  //   ));
export const Colorlegend = ({
  colorScale, 
  tickSpacing = 20, 
  tickTextOffset = 20,
  tickSize = 10,
  onHover,
  hoveredValue,
  fadeOpacity
}) => 
  colorScale.domain().map((domainValue, i) => (
      <g 
        className="tick"
        transform={`translate(0, ${i * tickSpacing})`}
        onMouseEnter= {() =>{ onHover(domainValue); }}
        opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
      >
      <circle fill={colorScale(domainValue)} r={tickSize} />
        <text x={tickTextOffset} dy=".4em">{domainValue}</text>
      </g>
  ));

  // onMouseOut= {() =>{ onHover(null); }}
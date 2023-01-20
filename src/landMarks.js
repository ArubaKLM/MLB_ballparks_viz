// import {geoNaturalEarth1, geoPath,  geoGraticule } from 'd3';

// const projection = geoNaturalEarth1();
// const path = geoPath(projection);
// const graticule = geoGraticule();

// export const landMarks = ({
//     usAtlas: { counties, states },
//     data
//   }) => (
//     <g className="marks">
//     <path className="sphere" d={path({ type: 'Sphere' })} />
//     <path className="graticules" d={path(graticule())} />
//     {land.features.map(counties => (
//       <path className="land" d={path(counties)} />
//     ))}
//     <path className="interiors" d={path(states)} />
//     {data.map(d => {
//          const [x, y] = projection(d.coords);
//          return <circle cx={x} cy={y} />
//     })}
//     </g>
// );
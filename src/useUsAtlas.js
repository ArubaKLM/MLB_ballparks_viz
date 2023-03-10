import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';

 export const useUsAtlas = () => {
  const [usdata, setUsData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const { states, counties } = topology.objects;
      setUsData({
        counties: feature(topology, counties),
        interiors: mesh(topology, states, (a, b) => a !== b)
      });
    });
  }, []);

  return usdata;
};


//       const { states, land } = topology.objects;
//       setData({
//         land: feature(topology, land),
//         interiors: mesh(topology, states, (a, b) => a !== b)
//       });
//     });
//   }, []);

//   console.log(useUsAtlas.map)

//   return data;
// };
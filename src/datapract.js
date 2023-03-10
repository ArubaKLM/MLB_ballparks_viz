import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl = 'https://unpkg.com/us-atlas@2.1.0/package.json';

 export const useUsAtlas = () => {
  const [usdata, setUsData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const { states, counties } = topology.objects;
      setUsData({
        counties: feature(topology, counties),
        interiors: mesh(topology, states, (a, b) => a !== b)
      });
      console.log(jsonUrl);
    });
  }, []);

  return usdata;
};
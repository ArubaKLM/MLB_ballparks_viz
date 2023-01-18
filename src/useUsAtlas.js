import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl = 'https://unpkg.com/us-atlas@2.1.0/package.json';

export const useUsAtlas = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const { states, land } = topology.objects;
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, states, (a, b) => a !== b)
      });
    });
  }, []);

  return data;
};
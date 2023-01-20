import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 
      "https://raw.githubusercontent.com/ArubaKLM/MLB/main/mlb_stadium.csv"

const row = d => {
  d.Opened = new Date(d.Opened);
  d.Capacity = +d.Capacity;
  d.Cost = +d.Cost;
  d.km = +d.km;
  d.coords = d['park_coord'].split(',').map(d =>+d).reverse();
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);
  
  return data;
};

  // useEffect(() => {
  //   const row = d => {
  //     d.Opened = +d['Opened'];
  //     d.Capacity = +d['Capacity'];
  //     d.Cost = +d['Cost'] + '달러';
  //     return d;
  //   };
  // csv(csvUrl).then(setData);
  // }, [
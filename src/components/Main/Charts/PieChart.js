import React, { Component, useState, useMemo } from 'react';
import { Grid } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const PieChart = ({confirmed,recovered,deaths}) => {
     
    const data = useMemo(() => {
        let temp ={
        labels: [
            'Confirmed','Deaths','Recovered',
        ],
        datasets:[{
            data: [confirmed,deaths,recovered],
            backgroundColor: [
                '#e0e0e0',
                '#f44336',
                '#4caf50',
            ],
            hoverBackgroundColor:[
                '#bdbdbd',
                '#e57373',
                '#81c784',
            ],
        }],}
        return temp;
    },[confirmed,recovered,deaths]);

     return (
          <Pie
            data={data}
          />
     );
}

export default PieChart;
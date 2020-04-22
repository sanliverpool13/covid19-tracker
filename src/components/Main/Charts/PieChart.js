import React, { Component, useState, useMemo } from 'react';
import { Grid } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const PieChart = ({active,recovered,deaths}) => {
     
    const data = useMemo(() => {
        let temp ={
        labels: [
            'Active','Deaths','Recovered',
        ],
        datasets:[{
            data: [active,deaths,recovered],
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
    },[active,recovered,deaths]);

     return (
          <Pie
            data={data}
            width={600}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
     );
}

export default PieChart;
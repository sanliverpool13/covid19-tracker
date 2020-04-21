import React, { Component, useState } from 'react';
import { Grid } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const PieChart = ({confirmed,recovered,deaths}) => {
    console.log(confirmed);
     
    const [labels,setLabels] = useState([
        'Deaths','Recovered','Confirmed',
    ]);

    const [datasets, setDataSets] = useState({
        data: [deaths,recovered,confirmed],
        backgroundColor: [
            '#f44336',
            '#4caf50',
            '#e0e0e0',
        ],
        hoverBackgroundColor:[
            '#e57373',
            '#81c784',
            '#bdbdbd'
        ],
    })

    const data = {
        labels: [
            'Deaths','Recovered','Confirmed',
        ],
        datasets:[{
            data: [deaths,recovered,confirmed],
            backgroundColor: [
                '#f44336',
                '#4caf50',
                '#e0e0e0',
            ],
            hoverBackgroundColor:[
                '#e57373',
                '#81c784',
                '#bdbdbd'
            ],
        }],
    };

     return (
          <Pie
            data={data}
          />
     );
}

const ChartRow = (props) => {
     
     return (
          <Grid item md={12} >
              <PieChart {...props}/>
          </Grid>
     );
}

export default ChartRow;
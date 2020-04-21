import React from 'react';
import PieChart from "./PieChart";
import BarChart from './BarChart';
import { Grid } from "@material-ui/core";

const ChartRow = (props) => {
     
    return (
         <Grid item md={12} >
            <PieChart {...props}/>
            <BarChart {...props}/>
         </Grid>
    );
}

export default ChartRow;
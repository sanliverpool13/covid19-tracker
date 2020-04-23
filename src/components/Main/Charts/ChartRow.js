import React from 'react';
import PieChart from "./PieChart";
import BarChart from './BarChart';
import { Grid } from "@material-ui/core";

const ChartRow = (props) => {
     
    

    return (
         <>
             {(props.typeOfChart === 'Pie') 
             ? <PieChart {...props}/>
            : <BarChart {...props}/>}
         </>
    );
}

export default ChartRow;
import React from 'react';
import PieChart from "./PieChart";
import BarChart from './BarChart';
import LineChart from './LineChart';
const ChartRow = (props) => {
     
    

    return (
         <>
             {(props.typeOfChart === 'Pie') 
             ? <PieChart {...props}/>
            : (props.typeOfChart === 'Bar') 
                ? (<BarChart {...props}/>) 
                : (<LineChart {...props}/>)
            }
         </>
    );
}

export default ChartRow;
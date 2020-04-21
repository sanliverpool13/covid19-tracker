import React, {useMemo} from 'react';
import { Bar } from "react-chartjs-2";

const BarChart = ({confirmed,recovered,deaths}) => {
     
    const data = useMemo(() => {
        let temp ={
        labels: [
            'Confirmed','Deaths','Recovered',
        ],
        datasets:[{
            label:'Ratios',
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
          <Bar
            data={data}
            
          />
     );
}

export default BarChart;
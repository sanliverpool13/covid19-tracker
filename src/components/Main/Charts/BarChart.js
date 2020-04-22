import React, {useMemo} from 'react';
import { Bar } from "react-chartjs-2";

const BarChart = ({active,recovered,deaths}) => {

    
     
    const data = useMemo(() => {
        let temp ={
        labels: [
            'Active','Deaths','Recovered',
        ],
        datasets:[{
            label:'Covid-19 Survival Ratio',
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
          <Bar
            data={data}
            width={600}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
     );
}

export default BarChart;
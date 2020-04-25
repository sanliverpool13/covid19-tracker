import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { filterDailyCanada } from "../../api/index";

const LineChart = () => {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        filterDailyCanada('South Korea')
            .then(res => setDailyData(res))
            .catch(err => console.log(err));
    },[filterDailyCanada]);

    const lineChart = useMemo(() => {
        return (<Line
            data={{
                labels: dailyData.map((data) => data.date),
                datasets: [{
                    data: dailyData.map((data) => data.confirmed),
                    label: 'Confirmed',
                    borderColor: '#e0e0e0',
                    fill: true,
                },{
                    data: dailyData.map((data) => data.deaths),
                    label: 'Deaths',
                    borderColor: '#d32f2f',
                    fill: true,
                },{
                    data: dailyData.map((data) => data.recovered),
                    label: 'Recovered',
                    borderColor: '#64dd17',
                    fill: true,
                }],
            }}
            width={600}
            height={300}
            options={{ maintainAspectRatio: false }}
          />);
    },[dailyData])
    
     return (
         <>
            {dailyData[0] ?
            lineChart : null}
         </>
     );
}

export default LineChart;
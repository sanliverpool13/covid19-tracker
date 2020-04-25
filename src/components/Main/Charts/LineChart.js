import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { getDailyDataByCountry, getDailyDataGlobal } from "../../api/index";
import { NavBarContext} from '../../../Context';

const LineChart = ({searchValue}) => {

    const CountryCntxt = useContext(NavBarContext);
    const {country} = CountryCntxt;

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        if(country !== ''){
            getDailyDataByCountry(country)
            .then(res => setDailyData(res))
            .catch(err => console.log(err));
        }else{
            getDailyDataGlobal()
                .then(res => setDailyData(res))
                .catch(err => console.log(err));
        }
        
    },[country]);

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
import axios from 'axios';
import { spain, germany, usa, canada, france, russia, 
    peru, brazil, netherlands, mexico, china, southkorea, japan} from './countrycodes';

// get global cases endpoint
export const getGlobal = () =>  axios.get('https://covid19.mathdro.id/api');

// get cases by country endpoint
export const getCountry = (country) => axios.get(`https://covid19.mathdro.id/api/countries/${country}`);


// get daily report 
export const getDailyCountry = (date) => axios.get(`https://covid19.mathdro.id/api/daily/${date}`)

// Test: get daily report for Canada
export const filterDailyCanada = async () => {
    try {
         
        let res = await getDailyCountry('4-17-2020');
        let canadaData = res.data.filter(element => element["countryRegion"] === "Canada");
        
        
    } catch(err) {
         return err.response.data;
    }
    

}
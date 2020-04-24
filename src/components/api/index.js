import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';



export const getGlobal = async() =>  {
    try {
        const {data:{confirmed,recovered,deaths,lastUpdate}} = await axios.get(url);
        
        return {confirmed,recovered,deaths,lastUpdated:lastUpdate};
    } catch(err) {
        console.log(err);
        return {err}; 
    }
};


export const getCountry = async (country) => {

    try {
        const {data:{confirmed,recovered,deaths,lastUpdate}} = await axios.get(`${url}/countries/${country}`);
        return {confirmed,recovered,deaths,lastUpdated:lastUpdate};
    } catch (err) {
        return{err};
    }
    

}


// get daily report 
export const getDailyCountry = (date) => axios.get(`${url}/daily/${date}`)


const dates = ['2-15-2020','2-25-2020','3-3-2020','3-10-2020','3-20-2020','3-29-2020','4-3-2020',
'4-10-2020','4-15-2020','4-20-2020','4-23-2020']

const initTotals = {'confirmed':0,'deaths':0,'recovered':0};
const addTotals =  (acc, curr, currIndex, arr) => {
    console.log(`The current is ${curr}`);
    // acc = initState at first
    acc.confirmed += parseInt(curr.confirmed);
    acc.deaths += parseInt(curr.deaths);
    acc.recovered += parseInt(curr.recovered);
    return acc;
}

// Test: get daily report for Canada
export const filterDailyCanada = async () => {
    try {
         
        let results = await Promise.all([
            getDailyCountry(dates[0]),
            getDailyCountry(dates[1]),
            getDailyCountry(dates[2]),
            getDailyCountry(dates[3]),
            getDailyCountry(dates[4]),
            getDailyCountry(dates[5]),
            getDailyCountry(dates[6]),
            getDailyCountry(dates[7]),
            getDailyCountry(dates[8]),
            getDailyCountry(dates[9]),
            getDailyCountry(dates[10]),
        ]);
        let filteredResults = [];
        console.log(results);
        results.forEach((result) => {
            filteredResults.push(result.data.filter(element => element["countryRegion"] === "Canada"));
        });
        console.log(filteredResults);
        const totalsCanada = filteredResults.reduce(addTotals,initTotals);
        console.log(totalsCanada);
        
    } catch(err) {
         return err.response.data;
    }
    

}


export const getCountriesArray = async () => {

    try {
        let {data: {countries}} = await axios.get('https://covid19.mathdro.id/api/countries');
        return countries.map((country) => country.name);
    } catch(err) {
         return err;
        
    }
    
}
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


const dates = ['2-15-2020','2-25-2020','3-3-2020','3-6-2020','3-10-2020','3-15-2020','3-17-2020','3-20-2020','3-24-2020','3-26-2020',
'3-29-2020','4-1-2020','4-3-2020','4-5-2020','4-8-2020','4-10-2020','4-13-2020','4-15-2020','4-16-2020','4-20-2020','4-24-2020',]


const addTotals =  (acc, curr) => {
    // acc = initState at first
    acc.confirmed += parseInt(curr.confirmed);
    acc.deaths += parseInt(curr.deaths);
    acc.recovered += parseInt(curr.recovered);
    return acc;
}

// Test: get daily report for Canada
export const filterDailyCanada = async (country) => {
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
            getDailyCountry(dates[11]),
            getDailyCountry(dates[12]),
            getDailyCountry(dates[13]),
            getDailyCountry(dates[14]),
            getDailyCountry(dates[15]),
            getDailyCountry(dates[16]),
            getDailyCountry(dates[17]),
            getDailyCountry(dates[18]),
            getDailyCountry(dates[19]),
            getDailyCountry(dates[20]),

        ]);
        let ConfirmedDeathsRecovered = [];
        results.forEach((result) => {
            const filteredCanada = result.data.filter(element => element["countryRegion"] === country);
            
            const initTotals = {'confirmed':0,'deaths':0,'recovered':0};
            const filterCanadaReduced = filteredCanada.reduce(addTotals,initTotals);
            
            ConfirmedDeathsRecovered.push(filterCanadaReduced);
        });

        ConfirmedDeathsRecovered.forEach((curr,index,arr) => {
            if(index!==0){
                curr.confirmed -= arr[index-1].confirmed;
                curr.deaths -= arr[index-1].deaths;
                curr.recovered -= arr[index-1].recovered;
            }
            curr.date = dates[index];
        });
        console.log(ConfirmedDeathsRecovered);
        
        return ConfirmedDeathsRecovered;// [{confirmed,deaths,recovered},...]
        
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
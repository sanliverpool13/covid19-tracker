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

// Test: get daily report for Canada
export const filterDailyCanada = async () => {
    try {
         
        let res = await getDailyCountry('4-17-2020');
        let canadaData = res.data.filter(element => element["countryRegion"] === "Canada");
        
        
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
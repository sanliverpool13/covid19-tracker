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
const getDailyByDate = (date) => {
    return () => axios.get(`${url}/daily/${date}`);
};

const getDailyGlobal = () => axios.get(`${url}/daily`);

// const dates = ['2-15-2020','2-25-2020','3-3-2020','3-6-2020','3-10-2020','3-15-2020','3-17-2020','3-20-2020','3-24-2020','3-26-2020',
// '3-29-2020','4-1-2020','4-3-2020','4-5-2020','4-8-2020','4-10-2020','4-13-2020','4-15-2020','4-16-2020','4-20-2020','4-24-2020',]

const dates = [];


const addTotals =  (acc, curr) => {
    // acc = initState at first
    acc.confirmed += parseInt(curr.confirmed);
    acc.deaths += parseInt(curr.deaths);
    acc.recovered += parseInt(curr.recovered);
    return acc;
}

// Test: get daily report for Canada
export const getDailyDataByCountry = async (country) => {
    
    const DailyCountryRequests = [];
    try {
        let {data} = await getDailyGlobal();
        data.forEach((el) => {
            dates.push(el.reportDate);
            DailyCountryRequests.push(getDailyByDate(el.reportDate));
        });

        let results = await Promise.all(
            DailyCountryRequests.map((el) => el())
        );

        let DailyTotalData = [];

        results.forEach((result) => {
            const filteredByCountry = result.data.filter(element => element["countryRegion"] === country);
            
            const initTotals = {'confirmed':0,'deaths':0,'recovered':0};
            const filtByCntryReduced = filteredByCountry.reduce(addTotals,initTotals);
            
            DailyTotalData.push(filtByCntryReduced);
        });
        console.log(DailyTotalData);
        const DailySpecificData = [];
        DailyTotalData.forEach((curr,index,arr) => {
            var data = {}
            if(index===0){
                // wrong
                data.confirmed = curr.confirmed;
                data.recovered = curr.recovered;
                data.deaths = curr.deaths;
                
            }else{
                data.confirmed = curr.confirmed-arr[index-1].confirmed;
                data.recovered = curr.recovered-arr[index-1].recovered;
                data.deaths = curr.deaths-arr[index-1].deaths;
            }
            data.date = dates[index];
            DailySpecificData.push(data);

        });
        
        return DailySpecificData;// [{confirmed,deaths,recovered,data},...]
        
    } catch(err) {
         return err.response.data;
    }
    

}


export const getDailyDataGlobal = async () => {
    try {
       
        let {data} = await getDailyGlobal();
        let dailyDataArr = [];
        data.forEach((el) => {
            var temp = {};
            temp.confirmed = el.totalConfirmed;
            temp.recovered = el.recovered.total;
            temp.deaths = el.deaths.total;
            temp.date = el.reportDate;
            dailyDataArr.push(temp);
        });
        return dailyDataArr;
    } catch(err) {
        console.log(err);
        return {err};
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
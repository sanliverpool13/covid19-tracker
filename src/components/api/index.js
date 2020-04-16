import axios from 'axios';
import { spain, germany, usa, canada, france, russia, 
    peru, brazil, netherlands, mexico, china, southkorea, japan} from './countrycodes';

// get global cases endpoint
export const getGlobal = () =>  axios.get('https://covid19.mathdro.id/api');

// get cases by country endpoint
export const getCountry = (country) => axios.get(`https://covid19.mathdro.id/api/countries/${country}`);



import axios from 'axios';

export const getData = async () => {
    try {
        let res = await axios.get('https://covid19.mathdro.id/api/');
        let confirmed = res.data.confirmed.value;
        let recovered = res.data.recovered.value;
        let deaths = res.data.deaths.value;
        return {confirmed,recovered,deaths};
    } catch (error) {
        return {errors:error};
    }
    
};
import React, { useEffect, useReducer, useCallback } from 'react';
import { Grid,} from "@material-ui/core";
import styles from './main.module.css';
// import cx from 'classnames';
import SearchCompRow from './Search/SearchComponentRow';

import TitleRow from "./TitleRow/TitleRow";
import InfoCardsRow from './InformationCards/InfoCardsRow';
import ChartRow from './Charts/ChartRow';

import { getGlobal, getCountry, filterDailyCanada } from "../api/index";

const initialState = {
     category:'Global',
     confirmed:0,
     recovered:0,
     deaths:0,
     lastUpdated: '',
     error:''
};

const convertDateToReadable = (date) => {
     let year = date.substring(0,4);
     let monthDigit = date.substring(5,7);
     let day = date.substring(8,10);

     let hour = date.substring(11,16);

     let digit_to_month = {
          '01': 'January',
          '02': 'February',
          '03': 'March',
          '04': 'April',
          '05': 'May',
          '06': 'June',
          '07': 'July',
          '08': 'August',
          '09': 'September',
          '10': 'October',
          '11': 'November',
          '12': 'December',
      };
      let month = digit_to_month[monthDigit];
      return `${month} ${day}, ${year} ${hour}`;
}

const reducer = (state,action) => {
     const {type,payload} = action;
     switch(type){
          case 'GOT_CASES':
               return{
                    ...state,
                    category: 'Global',
                    confirmed: payload.confirmed.value,
                    recovered: payload.recovered.value,
                    deaths: payload.deaths.value,
                    lastUpdated: convertDateToReadable(payload.lastUpdate),
               };
          case 'Country_Code':
               return{
                    ...state,
                    category: payload.category,
                    confirmed: payload.data.confirmed.value,
                    recovered: payload.data.recovered.value,
                    deaths: payload.data.deaths.value,
                    lastUpdated: convertDateToReadable(payload.data.lastUpdate),
               }
          case 'Error':
               return{
                    ...state,
                    error: payload
               }
          default:
               throw new Error("Error");
     }
}

const MainPage = () => {

     const [state, dispatch] = useReducer(reducer,initialState);

     const getGlobalTotal = useCallback(async () => {
          try {
               let res = await getGlobal();
               dispatch({
                    type:'GOT_CASES',
                    payload: res.data
               });
               
          } catch(err) {
               dispatch({
                    type:'Error',
                    payload: err
               });
          }
          

     },[]);

     useEffect(() => {
          getGlobalTotal();
     },[getGlobalTotal]);

     const countryClick = useCallback( async (e,country) => {
          
          try {
                let res = await getCountry(country);
                dispatch({
                     type: 'Country_Code',
                     payload: {data:res.data,category:country}
                });
               
          } catch(err) {
                dispatch({
                     type:'Error',
                     payload: err
                });
          }
     },[getCountry]);

     return (
          <Grid container className={styles.gridContainer}>
               <TitleRow title={state.category} getGlobalTotal={getGlobalTotal}/>
               <InfoCardsRow state={state}/>
               <SearchCompRow onCountryClick={countryClick} />
               <ChartRow confirmed={state.confirmed} recovered={state.recovered} deaths={state.deaths}/>
          </Grid>
          
     );
}



export default MainPage;
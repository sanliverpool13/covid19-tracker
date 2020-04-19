import React, { useEffect, useState, useReducer, useCallback } from 'react';
import { Grid, Card, CardHeader, CardContent, Paper, InputBase, 
     CardActionArea, Typography, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from './main.module.css';
import cx from 'classnames';
// import useStyles from './main.css';
import DataCard from "../Cards/Card";
import {SearchComponent, SearchDropDown} from "../Search/Search";

import { getGlobal, getCountry, filterDailyCanada } from "../api/index";

const initState = {
     category:'Global',
     confirmed:0,
     recovered:0,
     deaths:0,
     lastUpdate: '',
     error:''
};

const toReadableDate = (date) => {
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
                    lastUpdate: toReadableDate(payload.lastUpdate),
               };
          case 'Country_Code':
               return{
                    ...state,
                    category: payload.category,
                    confirmed: payload.data.confirmed.value,
                    recovered: payload.data.recovered.value,
                    deaths: payload.data.deaths.value,
                    lastUpdate: toReadableDate(payload.data.lastUpdate),
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

const Main = () => {

     const [state, dispatch] = useReducer(reducer,initState);

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

     const countryClick = useCallback( async (e,name,code) => {
          
          try {
                let res = await getCountry(code);
                dispatch({
                     type: 'Country_Code',
                     payload: {data:res.data,category:name}
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
               <Grid item md={12} className={styles.gridItemTitle}>
                    <Typography variant="h2"  >
                         {state.category}
                    </Typography>
                    <a href="#" onClick={getGlobalTotal} className={styles.global}>Global</a>
               </Grid>
               <Grid item md={12} className={styles.gridItem}>
                    <Grid item>
                         <DataCard title="Confirmed" count={state.confirmed} lastUpdate={state.lastUpdate}/>
                    </Grid>
                    <Grid item>
                         <DataCard title="Deaths" count={state.deaths} lastUpdate={state.lastUpdate}/>
                    </Grid>
                    <Grid item>
                         <DataCard title="Recovered" count={state.recovered} lastUpdate={state.lastUpdate}/>
                         
                    </Grid>
                    
               </Grid>
               <Grid item md={12} className={styles.gridItem2} >
                    
                    <SearchComponent >
                         
                         <SearchDropDown onCountryClick={countryClick}/>
                    </SearchComponent>
               </Grid>
               <Grid item md={12}>
                    <div>
                         {state.error}
                    </div>
               </Grid>
          </Grid>
          
     );
}

export default Main;
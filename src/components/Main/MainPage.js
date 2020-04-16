import React, { useEffect, useState, useReducer, useCallback } from 'react';
import { Grid, Card, CardHeader, CardContent, Paper, InputBase, 
     CardActionArea, Typography, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from './main.module.css';
import cx from 'classnames';
// import useStyles from './main.css';
import DataCard from "../Cards/Card";
import SearchItem from "../Search/Search";

import { getGlobal, getCountry } from "../api/index";

const initState = {
     category:'Global',
     confirmed:0,
     recovered:0,
     deaths:0,
     error:''
};

const reducer = (state,action) => {
     const {type,payload} = action;
     switch(type){
          case 'GOT_CASES':
               return{
                    ...state,
                    confirmed: payload.confirmed.value,
                    recovered: payload.recovered.value,
                    deaths: payload.deaths.value,
               };
          case 'Country_Code':
               return{
                    ...state,
                    category: payload.category,
                    confirmed: payload.data.confirmed.value,
                    recovered: payload.data.recovered.value,
                    deaths: payload.data.deaths.value,
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

     useEffect(() => {
          getGlobal()
               .then(res => {
                    dispatch({
                         type:'GOT_CASES',
                         payload: res.data
                    });
                   
               })
               .catch(err => console.log(err));
     },[]);

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
               <Grid item>
                    <Typography variant="h2" style={{margin:"auto"}}>
                         {state.category}
                    </Typography>
               </Grid>
               <Grid item md={12} className={styles.gridItem}>
                    <Grid item>
                         <DataCard title="Confirmed" count={state.confirmed} />
                    </Grid>
                    <Grid item>
                         <DataCard title="Deaths" count={state.deaths} />
                    </Grid>
                    <Grid item>
                         <DataCard title="Recovered" count={state.recovered} />
                         
                    </Grid>
                    
               </Grid>
               <Grid item md={12} className={styles.gridItem2}>
                    <SearchItem onCountryClick={countryClick}/>
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
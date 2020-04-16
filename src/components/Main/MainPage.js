import React, { useEffect, useState, useReducer } from 'react';
import { Grid, Card, CardHeader, CardContent, Paper, InputBase, 
     CardActionArea, Typography, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from './main.module.css';
import cx from 'classnames';
// import useStyles from './main.css';
import DataCard from "../Cards/Card";
import SearchItem from "../Search/Search";

import { getGlobal } from "../api/index";

const initState = {
     confirmed:0,
     recovered:0,
     deaths:0,
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
          default:
               throw new Error("Wrong Dispatch");
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
     },[getGlobal]);

     return (
          <Grid container className={styles.gridContainer}>
               <Grid item xs={12} className={styles.gridItem}>
                    <DataCard title="Confirmed" count={state.confirmed} />
                    <DataCard title="Recovered" count={state.recovered} />
                    <DataCard title="Deaths" count={state.deaths}/>
               </Grid>
               <Grid item xs={12} className={styles.gridItem2}>
                    <SearchItem/>
               </Grid>
          </Grid>
          
     );
}

export default Main;
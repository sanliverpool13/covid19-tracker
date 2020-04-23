import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import styles from './infoCard.module.css';
import InfoCard from './InfoCard';
import { formatNumberWithCommas } from "../MainHelpers";

const InfoCardsRow = ({state}) => {

     
     
     return (
          <Grid item container md={12} className={styles.gridCardsRow} >
              <InfoCard title="Confirmed" countOfCases={formatNumberWithCommas(state.confirmed)} lastUpdated={state.lastUpdated}/>
              <InfoCard title="Deaths" countOfCases={formatNumberWithCommas(state.deaths)} lastUpdated={state.lastUpdated}/>
              <InfoCard title="Recovered" countOfCases={formatNumberWithCommas(state.recovered)} lastUpdated={state.lastUpdated}/>
          </Grid>
     );
}

export default InfoCardsRow;
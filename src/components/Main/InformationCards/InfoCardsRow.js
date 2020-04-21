import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import styles from './infoCard.module.css';
import InfoCard from './InfoCard';

const InfoCardsRow = ({state}) => {
     
     return (
          <Grid item container md={12} className={styles.gridCardsRow}>
              <InfoCard title="Confirmed" countOfCases={state.confirmed} lastUpdated={state.lastUpdated}/>
              <InfoCard title="Deaths" countOfCases={state.deaths} lastUpdated={state.lastUpdated}/>
              <InfoCard title="Recovered" countOfCases={state.recovered} lastUpdated={state.lastUpdated}/>
          </Grid>
     );
}

export default InfoCardsRow;
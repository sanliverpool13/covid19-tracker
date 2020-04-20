import React, { Component } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import styles from "./infoCard.module.css";

const InfoCard = ({title,countOfCases,lastUpdated}) => {
     
     return (
          <Grid item>
               <Card className={styles.infoCard}>
                    <InfoCardHeader title={title}/>
                    <InfoCardContent title={title} countOfCases={countOfCases} lastUpdated={lastUpdated}/>
               </Card>
          </Grid>
     );
}


const InfoCardHeader = ({title}) => {
      
      return (
          <CardHeader
          title={
               <Typography variant="h5" className={styles.infoCardTitle} gutterBottom>
                   {title}
               </Typography>
          }
          className={styles.infoCardHeader}
          />
      );
}

const InfoCardContent = ({title,countOfCases,lastUpdated}) => {
      
      return (
          <CardContent className={styles.infoCardContent}>
               <Typography variant="h4" 
                           className={(title ==='Recovered') ? styles.recoveredText 
                           : `${(title === 'Deaths') ? styles.deathsText : null}`}
               >
                    {countOfCases}
               </Typography>
               <Typography variant="caption">
                    <b>Last Updated: </b>{lastUpdated}
               </Typography>
          </CardContent>
      );
}

export default InfoCard;
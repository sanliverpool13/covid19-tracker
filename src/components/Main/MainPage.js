import React from 'react';
import { Grid, Card, CardHeader, CardContent, CardActionArea, Typography } from "@material-ui/core";
import styles from './main.module.css';
import cx from 'classnames';

const Main = () => {
     
     return (
          <Grid container className={styles.gridContainer}>
               <Grid item xs={12} className={styles.gridItem}>
                    <Typography variant="h2" component="h2">
                         COVID-19 DATA
                    </Typography>
               </Grid>
               <Grid item xs={12} >
                    <Card >
                         <CardHeader>
                              <Typography>
                                   Confirmed
                              </Typography>
                         </CardHeader>
                         
                    </Card>
                    <Card >
                         <Typography>
                              Recovered
                         </Typography>
                    </Card>
                    <Card >
                         <Typography>
                              Deaths
                         </Typography>
                    </Card>
               </Grid>
               <Grid item xs={12} className={styles.gridItem}>

               </Grid>
          </Grid>
          
     );
}

export default Main;
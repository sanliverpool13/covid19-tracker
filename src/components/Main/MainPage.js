import React from 'react';
import { Grid, Card, CardHeader, CardContent, Paper, InputBase, 
     CardActionArea, Typography, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from './main.module.css';
import cx from 'classnames';
// import useStyles from './main.css';

const Main = () => {

     return (
          <Grid container className={styles.gridContainer}>
               <Grid item xs={12} className={styles.gridItem}>
                    <Card className={styles.card} raised>
                         <CardHeader
                              title={
                                   <Typography variant="h5"  className={styles.cardTitle}>
                                        Confirmed
                                   </Typography>
                              }
                              className={styles.cardHeader}
                         />
                         <CardContent className={styles.cardContent}>
                              <Typography variant="h3">
                                   2,000,000
                              </Typography>
                         </CardContent>
                    </Card>
                    <Card className={styles.card} raised>
                         <CardHeader 
                              title={
                                   <Typography variant="h5"  className={styles.cardTitle}>
                                        Recovered
                                   </Typography>
                              }
                              className={styles.cardHeader}
                         />
                    </Card>
                    <Card className={styles.card} raised>
                         <CardHeader 
                              title={
                                   <Typography variant="h5"  className={styles.cardTitle}>
                                        Deaths
                                   </Typography>
                              }
                              className={styles.cardHeader}
                         />
                    </Card>
               </Grid>
               <Grid item xs={12} className={styles.gridItem2}>
                    <Paper component="form" className={styles.searchInput}>
                         <InputBase
                              placeholder="Search Country"
                              inputProps={{'aria-label': 'search countries'}}
                              className={styles.searchInputBase}
                         />
                         <IconButton>
                              <Search/>
                         </IconButton>
                    </Paper>
               </Grid>
          </Grid>
          
     );
}

export default Main;
import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import styles from './infoCard.module.css';

const InfoCardsRow = ({children}) => {
     
     return (
          <Grid item container md={12} className={styles.gridCardsRow}>
              {children}
          </Grid>
     );
}

export default InfoCardsRow;
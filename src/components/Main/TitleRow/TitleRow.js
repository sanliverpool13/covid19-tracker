import React from 'react';
import { Grid } from '@material-ui/core';
import styles from './titleRow.module.css';

const TitleRow = ({title}) => {
     
     return (
          <Grid item md={12} className={styles.gridItemTitle}>
              <h1 className={styles.title}>{title}</h1>
              <a href="#" className={styles.backToGlobalLink}>Global</a>
          </Grid>
     );
}

export default TitleRow;
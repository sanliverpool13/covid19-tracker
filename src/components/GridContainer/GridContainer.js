import React from 'react';
import styles from './GridContainer.module.css';

const GridContainer = ({children}) => {
     
     return (
          <div className={styles.gridContainer}>
              {children}
          </div>
     );
}

export default GridContainer;
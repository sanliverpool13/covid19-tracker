import React from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import styles from './titleRow.module.css';
import { Public } from "@material-ui/icons";

import { useToolTipStyle } from "./title.jss";


const GlobalBStrapTTip = (props) => {

     const classes = useToolTipStyle();
      
      return (
            <Tooltip title="Show Global" arrow classes={classes} {...props}/>
      );
}

const GlobalLink = (props) => {
      
      return (

          <IconButton className={styles.globalLink}>
               <GlobalBStrapTTip  className={styles.globalTooltip}>
                    <Public {...props}/>
               </GlobalBStrapTTip>
          </IconButton>
      );
}


const TitleRow = ({title,getGlobalTotal}) => {
     
     return (
          <div  className={styles.gridItemTitle} >
              <h1 className={styles.title}>{title}</h1>
              <GlobalLink onClick={getGlobalTotal}/>
          </div>
     );
}


export default TitleRow;
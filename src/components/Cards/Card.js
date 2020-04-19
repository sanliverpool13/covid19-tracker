import React from 'react';
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import styles from './card.module.css';



const DataCard = ({title,count,lastUpdate}) => {



    
     
     return (
        <Card className={styles.card} raised>
            <CardHeader
                title={
                    <Typography variant="h5" className={styles.cardTitle} gutterBottom>
                        {title}
                    </Typography>
                }
                className={styles.cardHeader}
            />
            <CardContent className={styles.cardContent}>
                <Typography variant="h4" 
                className={(title==='Recovered') ? styles.recoveredText : `${(title === 'Deaths') ? styles.deathsText : null}`}>
                    {count}
                </Typography>
                <Typography variant="caption"><b>Last Updated: </b>{lastUpdate}</Typography>
            </CardContent>
        </Card>
     );
};


export default DataCard;
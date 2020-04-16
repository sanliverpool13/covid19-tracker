import React from 'react';
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import styles from './card.module.css';



const DataCard = ({title,count}) => {



    
     
     return (
        <Card className={styles.card} raised>
            <CardHeader
                title={
                    <Typography variant="h5"  className={styles.cardTitle}>
                        {title}
                    </Typography>
                }
                className={styles.cardHeader}
            />
            <CardContent className={styles.cardContent}>
                <Typography variant="h3" 
                className={(title==='Recovered') ? styles.recoveredText : `${(title === 'Deaths') ? styles.deathsText : null}`}>
                    {count}
                </Typography>
            </CardContent>
        </Card>
     );
};


export default DataCard;
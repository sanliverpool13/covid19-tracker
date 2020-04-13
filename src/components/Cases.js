import React, { useReducer, useEffect } from 'react';
import { getData } from './api';
import { Grid, Card, CardActionArea, CardHeader, CardContent, Typography } from "@material-ui/core";

import styles from './Cases.module.css';
import cx from 'classnames';

const initState = {
    loading: false,
    confirmed: null,
    recovered: null,
    deaths: null,
    errors: null,
}

const reducer = (state,action) => {
    const { type, payload} = action;
    switch(type){
        case 'S_FETCH_DATA':
            return{
                ...state,
                loading: true,
            };
        case 'GOT_DATA':
            return{
                ...state,
                loading: false,
                ...payload
            }
        case 'ERR':
            return{
                ...state,
                loading: false,
                ...payload
            }
        default:
            throw new Error();
    } 
};

const Cases = () => {

    const [state, dispatch] = useReducer(reducer,initState);

    useEffect(() => {
        getData()
            .then(res => dispatch({
                type: 'GOT_DATA',
                payload: res,
            }))
            .catch(err => dispatch({
                type: 'ERR',
                payload: err,
            }));

    });
     
     return (
          <Grid container>
              <Grid item xs={4} className={styles.grid_card}>
                <Card className={styles.card}>
                    <CardHeader title="Confirmed"/>
                    <CardContent>
                        <Typography variant="body1" component="p">
                            {state.confirmed}
                        </Typography>
                    </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4} className={styles.grid_card}>
                <Card className={styles.card}>
                    <CardHeader title="Recovered"/>
                    <CardContent>
                        <Typography variant="body1" component="p">
                            {state.recovered}
                        </Typography>
                    </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4} className={styles.grid_card}>
                <Card className={styles.card}>
                    <CardHeader title="Deaths"/>
                    <CardContent>
                        <Typography variant="body1" component="p">
                            {state.deaths}
                        </Typography>
                    </CardContent>
                </Card>
              </Grid>
          </Grid>
     );
};


export default Cases;
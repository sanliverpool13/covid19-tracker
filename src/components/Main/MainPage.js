import React, { useEffect, useReducer, useCallback, useMemo, useContext } from 'react';
import { Grid,} from "@material-ui/core";
import styles from './main.module.css';
// import cx from 'classnames';
import SearchCompRow from './Search/SearchComponentRow';

import TitleRow from "./TitleRow/TitleRow";
import InfoCardsRow from './InformationCards/InfoCardsRow';
import ChartRow from './Charts/ChartRow';

import { NavBarContext } from "../../Context";

import { getGlobal, getCountry, filterDailyCanada } from "../api/index";

// Import Helper Functions
import { initialState, reducer } from "./MainHelpers";

import { GridContainer } from "../index";

const MainPage = () => {

     const [state, dispatch] = useReducer(reducer,initialState);
     
     const getGlobalTotal = useCallback(() => {
          getGlobal()
          .then(res =>
               dispatch({
                    type:'GOT_CASES',
                    payload: res
               }))
          .catch(err => 
               dispatch({
                    type:'Error',
                    payload: err
               })
          );
          

     },[]);

     useEffect(() => {
          getGlobalTotal();
          filterDailyCanada();
     },[getGlobalTotal]);

     const countryClick = useCallback( (e,country) => {
          e.preventDefault();
         getCountry(country)
          .then(res => dispatch({
               type: 'Country_Code',
               payload: {res,category:country}
          }))
          .catch(err => dispatch({
               type:'Error',
               payload: err
          }));
     },[getCountry]);

     

     return (
          <GridContainer>
               <TitleRow title={state.category} getGlobalTotal={getGlobalTotal}/>
               <DataRow state={state}/>
               {/* <InfoCardsRow state={state}/> */}
               <SearchCompRow onCountryClick={countryClick} />
               {/* <ChartRow active={activeCases} recovered={state.recovered} deaths={state.deaths}/> */}
          </GridContainer>
     );
};


const DataRow = ({state}) => {
      
     const NavBarCntxt = useContext(NavBarContext);
     const {tabPicked} = NavBarCntxt;
     
     const activeCases = useMemo(() => {
          return state.confirmed-state.recovered-state.deaths;
     });

     
     return(
          <div className={styles.infoItem}>
               {(tabPicked === 'Cards') 
               ? <InfoCardsRow state={state}/>
               : 
               <ChartRow active={activeCases} recovered={state.recovered} deaths={state.deaths} typeOfChart={tabPicked}/>
               }
          </div>
     )
     
}



export default MainPage;
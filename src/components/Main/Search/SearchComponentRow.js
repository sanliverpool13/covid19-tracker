import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import styles from "./Search.module.css";
import { SearchCompAndResults, SearchDropDown } from "./Search";

const SearchCompRow = ({onCountryClick}) => {
     
     return (
          <Grid item md={12} className={styles.searchGridItem} >
              <SearchCompAndResults>
                  <SearchDropDown onCountryClick={onCountryClick}/>
              </SearchCompAndResults>
          </Grid>
     );
}

export default SearchCompRow;
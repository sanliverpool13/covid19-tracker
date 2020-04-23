import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import styles from "./Search.module.css";
import { SearchCompAndResults, SearchDropDown } from "./Search";

const SearchCompRow = ({onCountryClick}) => {
     
     return (
          <div className={styles.searchGridItem}>
              <SearchCompAndResults>
                  <SearchDropDown onCountryClick={onCountryClick}/>
              </SearchCompAndResults>
          </div>
     );
}

export default SearchCompRow;
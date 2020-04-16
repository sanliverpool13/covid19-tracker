import React, { useState, useCallback, Fragment, useMemo } from 'react';
import { Paper, InputBase, IconButton, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from "./Search.module.css";
import { countries } from "../api/countrycodes";

const SearchItem = ({onCountryClick}) => {

    const [searchValue, setSearchValue] = useState('');

    const handleChange = useCallback((e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    },[searchValue]);

    let countryNames = useMemo(() => Object.keys(countries).map((country) => 
        <Fragment key={country.toLowerCase()}>
            <ListItem className={styles.listItem} onClick={(e) => onCountryClick(e,country,countries[country])}>
                <ListItemText primary={country}/>
            </ListItem>
            <Divider/>
        </Fragment>
    ),[countries,onCountryClick]);

    let filteredCodes = useMemo(() => 
        countryNames.filter(item => item.key.includes(searchValue.toLowerCase())),
    [searchValue]);
    
    
    return (
        <div>
            <Paper component="form" className={styles.searchInput}>
                <InputBase
                    placeholder="Search Country"
                    inputProps={{'aria-label': 'search countries'}}
                    className={styles.searchInputBase}
                    value={searchValue}
                    onChange={handleChange}
                />
                <IconButton>
                    <Search/>
                </IconButton>
            </Paper>
            {(searchValue.length > 0) 
                ? 
                <Paper className={styles.options}>
                    <List>
                        {filteredCodes}
                    </List>
                </Paper>
                : null
            }
        </div>
    );
};

export default SearchItem;
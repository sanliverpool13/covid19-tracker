import React, { useState, useCallback } from 'react';
import { Paper, InputBase, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from "./Search.module.css";

const SearchItem = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleChange = useCallback((e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    },[searchValue]);
     
    return (
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
    );
};

export default SearchItem;
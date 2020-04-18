import React, { useState, useCallback, Fragment, useMemo, useEffect, useRef } from 'react';
import { Paper, InputBase, IconButton, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from "./Search.module.css";
import { countries } from "../api/countrycodes";

import { CSSTransition } from "react-transition-group";

export const SearchComponent = ({children}) => {

    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);

    const dropDownRef = useRef(null);

    const handleClick = (e) => {
        if(!dropDownRef.current.contains(e.target)){
            setOpen(false);
        }
    }

   useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
             document.removeEventListener("mousedown",handleClick);
        }
   },[])

    const handleChange = useCallback((e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
        if(e.target.value.length > 0) setOpen(true)
        else setOpen(false);
    },[searchValue]);

    
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
            {open && React.cloneElement(children, {
                searchValue: searchValue,
                ref: dropDownRef,
            })}
        </div>
    );
};


export const SearchDropDown = React.forwardRef(({onCountryClick,searchValue,ref}) => {

    const [inProp, setInProp] = useState(true);
    

    let countryNames = useMemo(() => Object.keys(countries).map((country) => 
        <SearchItem key={country} onCountryClick={onCountryClick} country={country}/>
    ),[countries,onCountryClick]);
    console.log(countryNames);

    let filteredCodes = useMemo(() => 

        countryNames.filter(item => item.props.country.toLowerCase().includes(searchValue.toLowerCase()))
    ,
    [searchValue]);
    console.log(filteredCodes);

    return(
        <Paper className={styles.searchDropDown} ref={ref}>
            <CSSTransition
                in={inProp}
                timeout={300}
                classNames="search-menu"
                unmountOnExit
                
            >
                <div className={styles.menu}>
                    {filteredCodes}
                </div>
            </CSSTransition>
        </Paper>
    );
});


const SearchItem = ({onCountryClick,country}) => {

    return(
        
            <a href="#" className={styles.searchItem} onClick={(e) => onCountryClick(e,country,countries[country])}>
                {country}
            </a>
            
        
    );
}

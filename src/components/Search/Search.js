import React, { useState, useCallback, Fragment, useMemo, useEffect, useRef } from 'react';
import { Paper, InputBase, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from "./Search.module.css";
import { countries } from "../api/countrycodes";

import { CSSTransition } from "react-transition-group";



const SearchContext = React.createContext()

export const SearchComponent = ({children}) => {

    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);

    const dropDownRef = useRef(null);

    const handleClick = (e) => {
        if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
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
        <SearchContext.Provider >
            <div ref={dropDownRef} >
                <Paper component="form" className={styles.searchInput}>
                    <InputBase
                        placeholder="Search Country"
                        inputProps={{'aria-label': 'search countries'}}
                        className={styles.searchInputBase}
                        value={searchValue}
                        onChange={handleChange}
                    />
                    <IconButton className={styles.searchButton}>
                        <Search/>
                    </IconButton>
                </Paper>
                {open && React.cloneElement(children, {
                    searchValue: searchValue,
                    setOpen: setOpen,
                })}
            </div>
        </SearchContext.Provider>
    );
};

const emptyString = (Str) => {
    return Str.length > 0;
}

export const SearchDropDown = ({onCountryClick,searchValue, setOpen}) => {

    const [inProp, setInProp] = useState(emptyString(searchValue));


    let countryNames = useMemo(() => Object.keys(countries).map((country) => 
        <SearchItem key={country} onCountryClick={onCountryClick} country={country} setOpen={setOpen}/>
    ),[countries,onCountryClick]);

    let filteredCodes = useMemo(() => 

        countryNames.filter(item => item.props.country.toLowerCase().includes(searchValue.toLowerCase()))
    ,
    [searchValue]);

    return(
            <div >
                {(filteredCodes.length === 0) ? null :
                <CSSTransition
                    in={inProp}
                    timeout={300}
                    classNames="search-menu"
                    unmountOnExit
                >
                    <Paper className={styles.searchDropDown} >
                        <div className={styles.menu} >
                            {filteredCodes}
                        </div>
                    </Paper>
                </CSSTransition>}
            </div>
        
    );
};


const SearchItem = ({onCountryClick,country,setOpen}) => {

    return(
        
            <a href="#" className={styles.searchItem} onClick={(e) => {onCountryClick(e,country,countries[country]);
            setOpen(false);}}>
                {country}
            </a>
            
        
    );
}

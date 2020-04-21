import React, { useState, useCallback, Fragment, useMemo, useEffect, useRef } from 'react';
import { Paper, InputBase, IconButton, Icon } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from "./Search.module.css";
import { getCountriesArray } from "../../api/index";

import { CSSTransition } from "react-transition-group";


// Helper Functions
import { isEmpty } from "./HelperFuctions";


export const SearchCompAndResults = ({children}) => {

    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);

    const searchDropDownRef = useRef(null);

    const handleClick = useCallback ((e) => {
        if(searchDropDownRef.current && !searchDropDownRef.current.contains(e.target)){
            setOpen(false);
        }
    },[searchDropDownRef]);// really should never change since ref is static

   useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
             document.removeEventListener("mousedown",handleClick);
        }
   },[])

    const handleChange = useCallback((e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
        if(e.target.value.length > 0) 
            setOpen(true)
        else 
            setOpen(false);
    },[searchValue]);


    
    return (
        
            <div ref={searchDropDownRef} >
                <SearchComponent searchValue={searchValue} handleChange={handleChange}/>
                <SearchResults open={open} receivedChildren={children} searchValue={searchValue} setOpen={setOpen}/>
            </div>
    );
};

const SearchComponent = (props) => {
     
     return (
          <Paper component="form" className={styles.searchComponent}>
            <SearchInput {...props}/>
            <SearchIcon/>
          </Paper>
     );
}

const SearchInput = ({searchValue,handleChange}) => {
     
     return (
          <InputBase
            placeholder="Search Country"
            inputProps={{'aria-label': 'search countries'}}
            className={styles.searchInput}
            value={searchValue}
            onChange={handleChange}
          />
          
     );
}

const SearchIcon = () => {
     
     return (
          <IconButton className={styles.searchIcon}>
              <Search/>
          </IconButton>
     );
}

const SearchResults = ({open, receivedChildren,searchValue,setOpen}) => {
     
     return (
          <>
            {open && React.cloneElement(receivedChildren, {
                searchValue: searchValue,
                setOpen: setOpen,
            })}
          </>
     );
}



export const SearchDropDown = ({onCountryClick,searchValue, setOpen}) => {

    const [inProp, setInProp] = useState(isEmpty(searchValue));
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountriesArray()
            .then(res => setCountries(res))
            .catch(err => console.log(err));
    },[]);// should run only once

    let searchResults = useMemo(() => countries.map((country) => 
        <SearchItem key={country} onCountryClick={onCountryClick} country={country} setOpen={setOpen}/>
    ),[countries,onCountryClick]);

    let filteredSearchResults = useMemo(() => 
        searchResults.filter(item => item.props.country.toLowerCase().includes(searchValue.toLowerCase())
    ),[searchValue,searchResults]);

    return(
            < >
                {(filteredSearchResults.length === 0) ? null :
                <CSSTransition
                    in={inProp}
                    timeout={300}
                    classNames="search-menu"
                    unmountOnExit
                >
                    <Paper className={styles.searchDropDown} >
                        <div className={styles.menu} >
                            {filteredSearchResults}
                        </div>
                    </Paper>
                </CSSTransition>}
            </>
        
    );
};


const SearchItem = ({onCountryClick,country,setOpen}) => {

    return(
        
            <a href="#" className={styles.searchItem} onClick={(e) => {onCountryClick(e,country);
                setOpen(false);}}>
                {country}
            </a>
            
        
    );
}

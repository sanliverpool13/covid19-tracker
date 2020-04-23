import React, { createContext} from 'react';
import MainPage from './components/Main/MainPage';
import styles from './app.module.css';
import { Container } from "@material-ui/core";
import {NavBarContextProvider} from './Context';
import { GridContainer, NavBar } from "./components/index";


const App = () => {
    return(
        
        <NavBarContextProvider>
            <NavBar/>
            <MainPage/>
        </NavBarContextProvider>
    );
};

export default App;
import React, { createContext} from 'react';
import MainPage from './components/Main/MainPage';
import styles from './app.module.css';
import { Container } from "@material-ui/core";
import NavBar from './components/NavBar/NavBar';
import {NavBarContextProvider} from './Context';


const App = () => {
    return(
        
        <NavBarContextProvider>
            <NavBar/>
            <Container className={styles.containerWidth}>
                <MainPage/>
            </Container>
        </NavBarContextProvider>
    );
};

export default App;
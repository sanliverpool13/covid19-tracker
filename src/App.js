import React from 'react';
import MainPage from './components/Main/MainPage';
import styles from './app.module.css';
import { Container } from "@material-ui/core";
import NavBar from './components/NavBar/NavBar';

const App = () => {
    return(
        
        <>
            <NavBar/>
            <Container className={styles.containerWidth}>
                <MainPage/>
            </Container>
        </>
    );
};

export default App;
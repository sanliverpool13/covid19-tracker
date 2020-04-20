import React from 'react';
import MainPage from './components/Main/MainPage';
import styles from './app.module.css';
import { Container } from "@material-ui/core";

const App = () => {
    return(
        <Container className={styles.containerWidth}>
            <MainPage/>
        </Container>
    );
};

export default App;
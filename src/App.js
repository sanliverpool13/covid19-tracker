import React from 'react';
import Main from './components/Main/MainPage';
import styles from './app.module.css';
import { Container } from "@material-ui/core";

const App = () => {
    return(
        <Container className={styles.containerWidth}>
            <Main/>
        </Container>
    );
};

export default App;
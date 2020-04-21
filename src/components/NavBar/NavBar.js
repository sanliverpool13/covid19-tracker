import React from 'react';
import styles from './Navbar.module.css';
import { PieChart, Assessment } from "@material-ui/icons";

const NavBar = (props) => {
     
     return (
          <nav className={styles.navBar}>
              
              <ul className={styles.navbarUl}>
                <li className={styles.navItem}>
                    <a className={styles.navLink}>
                        <span className={styles.linkText}>Pie</span>
                        <PieChart className={styles.linkIcon}/>
                    </a>
                </li>
                <li className={styles.navItem}>
                    <a className={styles.navLink}>
                    <span className={styles.linkText}>Charts</span>
                    </a>
                </li>
              </ul>
          </nav>
     );
};

export default NavBar;
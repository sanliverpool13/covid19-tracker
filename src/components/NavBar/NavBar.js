import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import { PieChart, List, BarChart, FeaturedPlayList, Timeline } from "@material-ui/icons";
import { NavBarContext } from "../../Context";

const NavBar = () => {

    
     
     return (
          <nav className={styles.navBar}>
              
              <ul className={styles.navbarUl}>
                <NavItem IconElement={FeaturedPlayList} name="Cards"/>
                <NavItem IconElement={PieChart} name="Pie"/>
                <NavItem IconElement={BarChart} name="Bar"/>
                <NavItem IconElement={Timeline} name="Line"/>
                <NavItem IconElement={List} name=""/>
              </ul>
          </nav>
     );
};


const NavItem = ({IconElement,name}) => {
     
    const NavBarCntxt = useContext(NavBarContext);
    const {tabPicked, selectTab} = NavBarCntxt;
     
     return (
        
        <li className={styles.navItem}>
            <a className={(tabPicked === name) ? styles.navLinkActive : styles.navLink} 
            onClick={(name !== '') ? (e) => selectTab(e,name)
                    : null}>
            <span className={styles.linkText}>{name}</span>
                <IconElement className={styles.linkIcon}/>
            </a>
        </li>
     );
}

export default NavBar;
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={styles.LandingPage}>
           <h1 className={styles.landingH1}>WELCOME TO MY VIDEOGAMES APP</h1>
            <Link to='/home'>
                <button className={styles.homeButton}>INGRESAR</button>
            </Link>
        </div>
    );
}
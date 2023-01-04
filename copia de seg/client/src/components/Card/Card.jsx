import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Card/Card.module.css'
import imagen1 from '../img/imagen.jpg'

export default function Card ({name, image, rating, genres, id }) {
    return(
        <div id={id} key = {id} className = {style.containerCard}>
            <div className ='styles.cards'>
                <img src = {image ? image : imagen1} alt='not found' width='200px' height='250px'/>
                <Link to = {`/detail/${id}`}>
                <h2>{name}</h2>
                </Link>
                <h4>Rating:  {rating}  &#9733; </h4>
                <div>
                {genres && <p> Generos:  {
                genres.map( g => Object.values(g) +(','))}</p>}
                </div>
            </div>
        </div>
    );
}
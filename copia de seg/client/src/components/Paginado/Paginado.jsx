import React from 'react';
import style from './Paginado.module.css'


export default function Paginado ({videogamesPerPage, allVideogames, paginado}) {
    const pageNumbers =  [];
    
    for (let i=1; i<=Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
    <nav className={style.containterPaginado}>
        <ul className={style.numPaginado}>
            { pageNumbers &&
              pageNumbers.map( number =>(
                <li className='number' key={number}>
                <button className={style.buttonPaginado} onClick={()=> paginado(number)}>{number}</button>
                </li>
              )
              )}
        </ul>
    </nav>
    )
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions/index';
import { useEffect } from 'react';
import style from '../Detail/Detail.module.css';

export default function Detail(props){
    
    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const myVideogame = useSelector((state) => state.detail);
    console.log(myVideogame);
    return(
        <div>
            {   Object.entries(myVideogame).length ?
                <div className={style.boxDetail}>
                   <div className={style.wrapper}> 
                    <h1 className={style.glow}>
                     { myVideogame.name }
                    </h1>
                   </div>
                   <div className={style.boxImage}><img src={ myVideogame.image ? myVideogame.image : myVideogame.img } width="300px" height="250px" /></div>
                   <div className={style.boxDescription}><h4>Descripción: { myVideogame.description }</h4> </div>
                    <h4>Fecha de lanzamiento: { myVideogame.released }</h4>
                    <h4>Rating: { myVideogame.rating } &#9733;</h4>
                    <h4>Generos: {myVideogame.genres?.map(e =>(
                        <p>{e.name}</p>
                    ))}</h4>
                </div>   
                : <p> Loading... </p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )
}
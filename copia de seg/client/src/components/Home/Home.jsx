import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterVideogamesByGenres, filterCreated, orderByName, orderByRating, getGenres } from '../../actions/index';
import { Link } from 'react-router-dom';
import style from '../Home/Home.module.css';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado'
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';



export default function Home (){
    

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const allGenres = useSelector ((state)=>state.genres);
    const [loading, setLoading] = useState(true);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ videogamesPerPage, setVideogamesPerPage ] = useState(15);
    const [ /*orden*/, setOrden ] = useState('');
    const indexOfLastGame = currentPage * videogamesPerPage;
    const indexOfFirstGame = indexOfLastGame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstGame,indexOfLastGame)
    

const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
}

    useEffect(()=>{
        dispatch(getVideogames());
        dispatch(getGenres());
    },[dispatch])

    function handlerClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handlerFilterStatus(e){
        dispatch(filterVideogamesByGenres(e.target.value))
    }

    function handlerFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

function handleSortByRating(e){
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
}    

function handlerSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
    
};

    return (
        
        <div className={style.homediv}>
            {allVideogames.length ? 
            <div>
                <div className={style.wrapper}><h1 className={style.glow}>VIDEOGAMES </h1></div>
                 <Link to='/videogame'>Crear Videogame</Link>
                 <br></br>
                 <br></br>
            
            <button onClick ={ e => {handlerClick(e)}}>
                Volver a cargar todos los videogames
            </button>
            <br></br>
            <div>
                <select onChange={ e =>{handlerSort(e)}}>
                    <option value='asc'> A-Z </option>
                    <option value='desc'> Z-A </option>
                </select>
                <select onChange = {e=> handlerFilterStatus(e)}>
                    <option value="" select disable hidden >Generos</option>
                    <option value="all">All</option>
                    {allGenres.map(g=><option value={g.name} key={g.id}>{g.name}</option>)}
                    
                </select>
                <select onChange={ e =>{handleSortByRating(e)}}>
                    <option value='best'> Rating Ascendente</option>
                    <option value='worst'> Rating Descendente</option>
                </select> 
                <select onChange={e => handlerFilterCreated(e)}>
                    <option value="All">Todos</option>
                    <option value="createdInDb">Creados</option>
                    <option value="api">Existentes</option>
                </select>
                <Paginado 
                videogamesPerPage = {videogamesPerPage}
                allVideogames = {allVideogames.length}
                paginado = {paginado}
                />
                <SearchBar className={style.searchBarDiv}/>
                </div>
                <div className ={style.cards}>
                {
                    allVideogames.length ? 
                    currentVideogames?.map( (e) => {
                        return (
                        <>
                        <Link to={'/home/'+ e.id}></Link>
                        <Card className={style.card}
                        key={e.id} 
                        id={e.id}
                        name={e.name} 
                        image={e.img ? e.img : e.image }
                        rating={e.rating}
                        genres={e.genres}
                        />
                        
                        </>
                        );
                    }) : <Loading/>
                }

                </div>
               
            
           </div>
        : <p></p>}
        </div>
    )
}

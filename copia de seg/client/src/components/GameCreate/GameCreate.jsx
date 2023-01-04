import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postVideogames, getGenres, getVideogames } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from '../GameCreate/GameCreate.module.css'

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name='Se requiere completar el campo Nombre.';
    }
    else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
        errors.name = 'Solo se aceptan letras, numeros, guiones medios y parentesis.';
    }
    else if(input.name>40){
        errors.name="El nombre es demasiado largo.";
    }
    else if (!input.description){
        errors.description = 'Se requiere completar el campo Descripción.'
    }
    else if(input.description.length > 750){
        errors.description = 'La descripcion es muy larga. (Max = 750 caracteres).';
    }
    else if(!input.released){
        errors.released='Se requiere completar el campo Fecha de Lanzamiento.'
    }
    else if(input.rating > 5.0) {
        errors.rating = 'El rating no puede ser mayor a 5.0';
      } else if(input.rating < 1.0) {
        errors.rating = 'El rating no puede ser menor que 1.0';
      }
      else if (!input.genres.length) {
        errors.genres = "Debe seleccionar uno o mas Géneros.";
      }
      else if (!input.platforms.length) {
        errors.platforms = "Debe seleccionar una o mas Plataformas.";
      }
    return errors;
};

export default function GameCreate(){
const dispatch = useDispatch();
const platforms = useSelector((state)=>state.platforms);
const genres = useSelector((state)=>state.genres)
const [errors, setErrors] = useState({});

const [ input , setInput ] = useState({
    name:"",
    description:"",
    released:"",
    rating:"",
    background_image:"",
    platforms:[],
    genres:[],
})

function handleSubmit(e){
    e.preventDefault();
    setErrors(validate(input));
    let error = validate(input);
    if (Object.values(error).length !== 0) {
    alert("Error en el formulario")
    } else {
    dispatch(postVideogames(input));
    alert("Se creó el Video Juego");
    setInput({
        name: "",
        description:"",
        released: "",
        rating: "",
        background_image:"",
        genres: [],
        platforms: [],
      });
      
    }
}
function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]:e.target.value
    }));
    console.log(input)
}

function handleSelectPlatforms(e){
    setInput({
        ...input,
         platforms: [...input.platforms, e.target.value]
    })
    }

function handleSelectGenres(e){
setInput({
    ...input,
     genres: [...input.genres, e.target.value]
})
}

function handleDeleteGenres(e){
    setInput({
        ...input,
        genres: input.genres.filter((el) => el !== e),
      });
}

function handleDeletePlatforms(e){
    setInput({
        ...input,
        platforms: input.platforms.filter((el) => el !== e),
      });
}

useEffect(()=>{
    dispatch(getGenres()); 
    dispatch(getVideogames()); 
},[dispatch]);


return(
<div className={style.containerForm}>
<Link to ='/home'><button>Volver</button></Link>
<h1>Crear Videojuego</h1>
<form onSubmit={(e)=>handleSubmit(e)}>
    <div>
        <label>Nombre: </label>
        <input
        id='input'
        type='text'
        value={input.name}
        name='name'
        onChange={handleChange}
        />
        {errors.name && (
        <p className={style.error}>{errors.name}</p>)}
    </div>
    <div>
        <label>Descripción: </label>
        <input
        id='input'
        type='text'
        value={input.description}
        name='description'
        onChange={handleChange}
        />
        {errors.description && (
        <p className={style.error}>{errors.description}</p>)}
    </div>
    <div>
    <label>Fecha de creación: </label>
        <input
        id='input'
        type='date'
        value={input.released}
        name='released'
        onChange={handleChange}
        />
        {errors.released && (
        <p className={style.error}>{errors.released}</p>)}
    </div>
    <div>
    <label>Rating: </label>
        <input
        id='input'
        type='number'
        value={input.rating}
        name='rating'
        onChange={handleChange}
        />
        {errors.rating && (
        <p className={style.error}>{errors.rating}</p>)}
    </div>
    <div>
    <hr></hr>
   <label>Generos: </label>
   <select onChange={(e)=>handleSelectGenres(e)}>
    {genres.map( (g) => (
        <option value={g.name}>{g.name}</option>
    ))}
   </select>
   {errors.genres && (
        <p className={style.error}>{errors.genres}</p>)}
   <ul><p>Géneros seleccionados:</p>
    {input.genres.map((a) =>(
        <li>
            <div>{a+""}</div>
            <button type='button' value={a} onClick={()=>handleDeleteGenres(a)}>x</button>
        </li>
    ))}
   </ul>
   </div>
   <hr></hr>
   <lebel>Plataformas: </lebel>
   <select onChange={(e)=>handleSelectPlatforms(e)}>
    { platforms.map( (g) => (
        <option value={g}>{g}</option>
    ))}
   </select>
   {errors.platforms && (
        <p className={style.error}>{errors.platforms}</p>)}
   <ul><p>Plataformas seleccionadas:</p>
    {input.platforms.map((e) =>(
        <li>
            <div>{e+" "}</div>
            <button type='button' value={e} onClick={()=>handleDeletePlatforms(e)}>x</button>
        </li>
    ))}
   </ul>
   
   <hr></hr>
   <button type='submit'>Crear</button>
</form>

</div>
)
}
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogamesName } from '../../actions';

export default function SearchBar (){
    const dispatch = useDispatch();

    const [ name, setName ] = useState('');

    function handlerInputChange (e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handlerSubmit(e){
        e.preventDefault()
        dispatch(getVideogamesName(name))
    }

    return(
        <div>
            <input
            type='text'
            placeholder='Buscar'
            onChange= {(e)=>handlerInputChange(e)}
            />
        <button type='sumbit' onClick={(e)=>handlerSubmit(e)}>Buscar</button>
        </div>
    )


}
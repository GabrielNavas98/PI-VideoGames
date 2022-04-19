import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import s from './SearchBar.module.css'

import { getGameName } from "../../redux/actions";

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getGameName(name))
    }

    return (
        <div>
            <input
            id={s.inpSearch} 
            type='text'
            placeholder= 'Search...'
            onChange={(e) => handleInputChange(e)}
            />
            <button id={s.btnSearch} type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}
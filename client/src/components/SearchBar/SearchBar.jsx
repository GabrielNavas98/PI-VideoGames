import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import style from './SearchBar.module.css'
import lupa from './lupa3.png'
import { getGameName } from "../../redux/actions";
import { useHistory } from "react-router-dom";

export default function SearchBar () {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        history.push('/home')
        dispatch(getGameName(name))
    }   

    return (
        <div className={style.search}>
            <input
                className={style.inpSearch} 
                type='text'
                placeholder= 'Search...'
                onChange={(e) => handleInputChange(e)}
                onClick={e => handleSubmit(e)} onKeyPress={(e => {
                    if(e.key === 'Enter') dispatch(getGameName(name))  
                })}
            />
            <button className={style.btn} type="submit" ><img src={lupa} alt=''/></button>
            
        </div>
    )
}
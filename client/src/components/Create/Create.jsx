import React from "react";
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useHistory } from "react-router-dom";
import { createGame, getGenres, getPlatforms } from "../../redux/actions";

//import NavBar from "../NavBar/NavBar";

export function validate(input){
    let errors = {};
    if (!input.name){ 
        errors.name = 'Name is required';
    }

    if (!input.description){
        errors.description = 'Description is required'
    }else if(input.description.length < 10){
        errors.description = 'Description must be more than 10 caracters'
    }

    if (!input.platforms) {
        errors.platforms = 'Add even one'
        //console.log(input.platforms.length)
    }

    if(typeof input.rating !== 'number'){
        errors.rating = 'Rating must be number' 
    } else if (input.rating > 5 || input.rating < 0 ){
        errors.rating = 'Rating must be in range 0-5'
    }   

    let exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    let regex = new RegExp(exp)
    if(!input.background_image.match(regex)){
        errors.background_image = 'Add an URL Image'
    }

    return errors
}


export default function Create () {

    const dispatch = useDispatch();
    const history = useHistory(); //redireccion a '/home' luego de crear el juego
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms)

    const[errors, setErrors] = useState({});

    const [input, setInput] = useState({ //guardo el formulario
        name: '',
        description: '',
        released: '',
        rating: 0,
        background_image: '',
        genres: [],
        platforms: []
    })



    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [])

    function handleOnSubmit(e){
        //SUBMIT
        e.preventDefault();
        //console.log(e)
        console.log(input)
        dispatch(createGame(input))
        alert('VideoGame Created')
        setInput({
            name: '',
            description: '',
            released: '',
            rating: 0,
            background_image: '',
            genres: [],
            platforms: []
        })
        history.push('/home')
    }

    function handleChange(e){
        //para inputs
        //e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        //console.log(e.target.value)
    }

    function handleSelectGenres(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        //console.log(input.genres)
    }

    function handleSelectPlatforms(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
        //console.log(input.platforms)
        
    }


    return(
        <div>
            <Link to = '/home'>
              <button>Volver</button>
            </Link>
            <h1>Create Videogame</h1>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input 
                        type='text'
                        name="name"
                        value={input.name}
                        onChange={(e) => handleChange(e)}    
                    />
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                </div>
                <br/>
                <div>
                    <label>Description: </label>
                    <input 
                        type='text'
                        name= 'description'
                        value={input.description}
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.description && (
                            <p>{errors.description}</p>
                        )
                    }
                </div>
                <br/>
                <div>
                    <label>Released: </label>
                    <input
                        type='date'
                        name="released"
                        value={input.released}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <br/>
                <div>
                    <label>Rating: </label>
                    <input 
                        type='text'
                        name="rating"
                        value={input.rating}
                        onChange={(e) => handleChange(e)}
                    />
                    {
                      errors.rating && (
                            <p>{errors.rating}</p>
                        ) 
                    }
                </div>
                <br/>
                <div>
                    <label>Image: </label>
                    <input 
                        type='text'
                        name="background_image"
                        value={input.background_image}
                        onChange={(e) => handleChange(e)}
                    />
                    {
                      errors.background_image && (
                            <p>{errors.background_image}</p>
                        ) 
                    }
                </div>
                <br/>
                <div>
                <label>Genres: </label>
                    <select onChange={(e) => handleSelectGenres(e)}>
                    {
                        genres?.map(gen => {
                            return(
                                <option name='genres' value={gen.name} >{gen.name}</option>
                            )
                        })
                    }
                    </select>
                    <ul><li>{input.genres?.map(gen => gen + ', ')}</li></ul>
                     
                </div>
                <br/>
                <div>
                    <label>Platforms: </label>
                    <select onChange={(e) => handleSelectPlatforms(e)}>
                    {
                        platforms?.map(plat => {
                            return(
                                <option name='platforms' value={plat.name} >{plat.name}</option>
                            )
                        })                    
                    }
                    </select>
                    <ul><li>{input.platforms.map(plat => plat + ', ')}</li></ul>
                    {
                        errors.platforms && (
                            <p>{errors.platforms}</p>
                        ) 
                    }
                    
                </div>
                <br/>
                <button type= 'submit' disabled={errors.name || errors.description || errors.platforms || errors.rating || errors.background_image}>Create</button>
            </form>
        </div>

    )
}
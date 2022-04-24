import React from "react";
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import { createGame, getGenres, getPlatforms } from "../../redux/actions";

// import addImg from './add_Img.png'
import NavBar from "../NavBar/NavBar";
import style from './Create.module.css'

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

    if (!input.platforms.length) {
        errors.platforms = 'Add even one'
        //console.log(input.platforms.length)
    }
    
    if (input.rating > 5 || input.rating < 0 ){
        errors.rating = 'Rating must be in range 0-5'
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
        rating: '',
        background_image: '',
        genres: [],
        platforms: []
    })
    

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    function handleOnSubmit(e){
        //SUBMIT
        e.preventDefault();
        //console.log(e)
        console.log(input)
        //if--------
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
        //console.log(e.target.value)
        let aux = e.target.value
        if(input.genres.includes(e.target.value)){ 
            let filtrados = input.genres.filter(e => e !== aux)
            setInput({
                ...input,
                genres: filtrados
            })
            //console.log('esta')
        }else if(!input.genres.includes(e.target.value)){
            //console.log('no esta')
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        }
        //console.log(input.genres)
    }

    function handleSelectPlatforms(e){
        let aux = e.target.value
        if(input.platforms.includes(e.target.value)){ 
            let filtrados = input.platforms.filter(e => e !== aux)
            setInput({
                ...input,
                platforms: filtrados
            })
            //console.log('esta')
        }else if(!input.platforms.includes(e.target.value)){
            //console.log('no esta')
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
        setErrors(validate({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
        //console.log(input.platforms)
    }

    return(
        <div>
            <NavBar/>
            <form  className={style.box} onSubmit={(e) => handleOnSubmit(e)}>
                <h1>Create your Game</h1>
            <div className={style.subBox}>
                <input 
                    type='text'
                    name="name"
                    value={input.name}
                    placeholder='Name'
                    onChange={(e) => handleChange(e)}    
                />
                {
                    errors.name && (
                        <p>{errors.name}</p>
                    )
                }
                <input 
                    type='text'
                    name= 'description'
                    value={input.description}
                    placeholder='Description'
                    onChange={(e) => handleChange(e)}
                />
                {
                    errors.description && (
                        <p>{errors.description}</p>
                    )
                }
            </div>
            <div className={style.subBox}>
                <input
                    type='date'
                    name="released"
                    value={input.released}
                    placeholder='Released'
                    onChange={(e) => handleChange(e)}
                />
                <input 
                    type='text'
                    name="rating"
                    value={input.rating}
                    placeholder='Rating'
                    onChange={(e) => handleChange(e)}
                />
                {
                    errors.rating && (
                        <p>{errors.rating}</p>
                    ) 
                }
            </div>
            <div className={style.subBox}>
                <input 
                    type='text'
                    name="background_image"
                    value={input.background_image}
                    placeholder='Url Image'
                    onChange={(e) => handleChange(e)}
                />
                    {
                        input.background_image ? 
                            <img src={input.background_image} alt='' className={style.bg_img}/>
                        :   
                            <img src='https://static.thenounproject.com/png/3322766-200.png' alt=''  className={style.bg_img}/>
                    }
            </div>
            <div className={style.subBox}>
                <select onChange={(e) => handleSelectGenres(e)} className= {style.select} placeholder='Genres: ' multiple>
                    {
                        genres?.map(gen => {
                            return(
                                <option name='genres' key={gen.id} value={gen.name}>{gen.name}</option>
                            )
                        })
                    }
                </select>
               <div>
               <ul className={style.bg_img}>
                {
                        input.genres?.map(gen => {
                        return(
                            <li key={gen}>{gen}</li>
                        )
                    })
                }
                </ul>
               </div>
            </div>
            <div className={style.subBox}>
                <select onChange={(e) => handleSelectPlatforms(e)} className= {style.select} multiple>
                    {
                        platforms?.map(plat => {
                            return(
                                <option name='platforms' key={plat.id} value={plat.name} >{plat.name}</option>
                            )
                        })                    
                    }
                </select>
                <div className={style.bg_img}>
                {
                    errors.platforms ? <p>{errors.plataforms}</p>:
                    <ul>
                    {
                        input.platforms?.map(plat => {
                                return (
                                    <li>{plat}</li>
                                )  
                                })
                    }
                    </ul>
                }
                </div>
            </div>
            <button className={style.submit} type= 'submit' disabled={!input.name || !input.description || !input.rating || !input.platforms.length || errors.rating || errors.description || errors.platforms}>Create</button>
            </form>
        </div>
    )
}
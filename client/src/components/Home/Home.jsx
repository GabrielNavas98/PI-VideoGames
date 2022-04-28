import React from "react";
import {useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { getAllVideogames, getGenres, filterByGenres, filterByDbApi, orderByAZ, orderByRating } from "../../redux/actions";

import style from './Home.module.css'

import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import VideogameCard from "../VideogameCard/VideogamesCard";
import Loader from "../Loader/Loader";

export default function Home () {
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videoGames)
    const allGenres = useSelector((state) => state.genres)

    const [order, setOrder] = useState('')
    const [currentPg, setCurrentPg] = useState(1);//seteo la pagina a renderizar
    const [gamesPerPg, setGamesPerPg] = useState(15); //15 videojuegos por pagina
    
    
    
    const lastGame = currentPg * gamesPerPg; //ultimo juego de la pagina renderizada
    const firstGame = lastGame - gamesPerPg;
    const currentGame = allVideogames.slice(firstGame, lastGame)//juegos renderizados por pagina

    const paginado = (pgNumber) => {
        setCurrentPg(pgNumber)
    }

    
    useEffect(() => {
        dispatch(getAllVideogames());
        dispatch(getGenres())
        // console.log(allVideogames)
    }, [dispatch])
    

    function handleFilterGenres(e){
        e.preventDefault();
        setCurrentPg(1)
        dispatch(filterByGenres(e.target.value))
        // console.log(e.target.value)
    }
    
    function handleFilterDbApi(e){
        e.preventDefault();
        setCurrentPg(1)
        dispatch(filterByDbApi(e.target.value))
    }

    function handleOrderAZ(e){
        e.preventDefault();
        dispatch(orderByAZ(e.target.value));
        setCurrentPg(1); //setea la primera pagina
        setOrder(`Ordenado Alfabeticamente ${e.target.value}`)
    }

    function handleOrderRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPg(1); //setea la primera pagina
        setOrder(`Ordenado Rating ${e.target.value}`)
    }

    return(
        <div>
            <NavBar/>
            <div className={style.order}>
                
                <select onChange={e => handleFilterDbApi(e)}>
                    <option value="none" selected disabled hidden>Store</option>
                    <option value='all'>All</option>
                    <option value='db'>DataBase</option>
                    <option value='api'>API</option>
                </select>
                
                <select onChange={e => handleFilterGenres(e)}>
                    <option value="none" selected disabled hidden>Genres</option>
                    <option value='all'>All</option>
                    {
                        allGenres?.map(gen => {
                            return(
                                <option key={gen.id} value={gen.name}>{gen.name}</option>
                            )
                        })
                    }
                </select>

                <select onChange={e => handleOrderAZ(e)}>
                    <option value= 'asc'>A-Z</option>
                    <option value= 'desc'>Z-A</option>
                </select>

                <select onChange={e => handleOrderRating(e)}>
                    <option value="none" selected disabled hidden>Rating</option>
                    <option value= 'asc'>Asc</option>
                    <option value= 'desc'>Desc</option>
                </select>
                <div>
                    <p>{order}</p>
                </div>
            </div>
            <Paginado 
                gamesPerPg = {gamesPerPg}
                allVideogames = {allVideogames.length}
                paginado= {paginado}
                currentPg = {currentPg}
                setCurrentPg= {setCurrentPg}
            />            
            {  
                currentGame && currentGame.length ?
                    <div className={style.cards}>
                        {
                            currentGame.map(game => {
                                return(
                                    <div key={game.id}>
                                        <Link to={`/home/${game.id}`} className={style.links} >  
                                            <VideogameCard
                                                name={game.name}
                                                img={game.background_image}
                                                id={game.id}
                                                genres={game.genres.map(gen => gen.name).join(", ")}
                                                key={game.id}
                                                rating={game.rating}
                                            />                                                           
                                        </Link> 
                                    </div>
                                )
                            })
                        }
                    </div>: 
                <Loader/>
            }
        </div>
    )
}
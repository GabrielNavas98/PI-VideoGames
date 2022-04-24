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
    const allVideogames = useSelector((state) => state.videoGames) //como mapear las props
    const allGenres = useSelector((state) => state.genres)
    
    const [order, setOrder] = useState('')
    const [currentPg, setCurrentPg] = useState(1);
    const [gamesPerPg, setGamesPerPg] = useState(15); //15 videojuegos por pagina
    const lastGame = currentPg * gamesPerPg;
    const firstGame = lastGame - gamesPerPg;
    const currentGame = allVideogames.slice(firstGame, lastGame)

    const paginado = (pgNumber) => {
        setCurrentPg(pgNumber)
    }

    
    useEffect(() => {
        dispatch(getAllVideogames());
        dispatch(getGenres())
        // console.log(allVideogames)
    }, [dispatch])
    
    //---button refresh-----
    // function handleClick(e){
    //     e.preventDefault();
    //     dispatch(getAllVideogames());
    //     dispatch(getGenres())
    // }

    function handleFilterGenres(e){
        e.preventDefault();
        dispatch(filterByGenres(e.target.value))
        // console.log(e.target.value)
    }
    
    function handleFilterDbApi(e){
        e.preventDefault();
        dispatch(filterByDbApi(e.target.value))
    }

    function handleOrderAZ(e){
        e.preventDefault();
        dispatch(orderByAZ(e.target.value));
        setCurrentPg(1); //setea la primera pagina
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleOrderRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPg(1); //setea la primera pagina
        setOrder(`Ordenado ${e.target.value}`)
    }


    return(
        <div>
            <NavBar/>
            <div className={style.order}>
                
                <select onChange={e => handleFilterDbApi(e)}>
                    <option value='all'>All</option>
                    <option value='db'>DataBase</option>
                    <option value='api'>API</option>
                </select>
                
                <select onChange={e => handleFilterGenres(e)}>
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
                    <option value= 'asc'>asc</option>
                    <option value= 'desc'>desc</option>
                </select>

            </div>
            <Paginado 
                gamesPerPg = {gamesPerPg}
                allVideogames = {allVideogames.length}
                paginado= {paginado}
            />            
            {
                currentGame && currentGame.length ?
                    <div className={style.cards}>
                        {
                            currentGame.map(game => {
                                return(
                                    <div key={game.id}>
                                        <Link to={`/home/${game.id}`} >  
                                            <VideogameCard
                                                name={game.name}
                                                img={game.background_image}
                                                id={game.id}
                                                genres={game.genres.map(gen => gen.name).join(", ")}
                                                key={game.id}
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
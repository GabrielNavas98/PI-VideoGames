import React from "react";
import {useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getAllVideogames, getGenres, filterByGenres } from "../../redux/actions";
import { Link } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import VideogameCard from "../VideogameCard/VideogamesCard";

export default function Home () {
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videoGames) //como mapear las props
    const allGenres = useSelector((state) => state.genres)
    
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
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getAllVideogames());
        dispatch(getGenres())
    }

    function handleFilterGenres(e){
        e.preventDefault();
        dispatch(filterByGenres(e.target.value))
        // console.log(e.target.value)
    }

    return(
        <div>
            <NavBar/>
            <Link to='/videogame'>Videogame Create</Link>
            <h1>VideoGames</h1>
            <button onClick={e=> {handleClick(e)}}>
                Refresh
            </button>
            <div>
                <select>
                    <option value='all'>All</option>
                    <option value='db'>DataBase</option>
                    <option value='api'>API</option>
                </select>
                <select onChange={e => handleFilterGenres(e)}>
                    <option value='all'>All</option>
                    {
                        allGenres?.map(gen => {
                            return(
                                <option value={gen.name}>{gen.name}</option>
                            )
                        })
                    }
                </select>
                <select>
                    <option value= 'asc'>A-Z</option>
                    <option value= 'desc'>Z-A</option>
                    <option value= 'rating'>Rating</option>
                </select>
                <div>
                    <Paginado 
                        gamesPerPg = {gamesPerPg}
                        allVideogames = {allVideogames.length}
                        paginado= {paginado}
                    />
                </div>
                {
                    currentGame && currentGame.length && currentGame.map(game => {
                        
                        return(
                            <div>
                            <Link to={'/home'} > 
                                <VideogameCard name={game.name} img={game.background_image} id={game.id} genres={game.genres.map(gen => gen.name).join(", ")}/>
                            </Link>                            
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
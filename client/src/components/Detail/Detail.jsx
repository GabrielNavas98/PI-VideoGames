import React from "react";
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";

import style from './Detail'

import { getGameId } from "../../redux/actions";

export default function Detail (props){
    //console.log(props)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getGameId(props.match.params.id))
    },[dispatch])

    const myGameDetail = useSelector((state) => state.gameDetail)
    
    return(
        
        <div className="card" width= '8rem' key={myGameDetail.id}>
            <img src={myGameDetail.background_image} width='30rem' alt="img not found"/>
                <h5>{myGameDetail.name}</h5>
                <h6>{myGameDetail.released}</h6>
                <h6>{myGameDetail.rating}</h6>
                {
                    myGameDetail.genres ?
                    <div>
                        <ul>
                            Generos: 
                                {myGameDetail.genres.map(gen => {
                                    return (
                                        <li>{gen.name}</li>
                                    )
                                })}
                        </ul>
                    </div> 
                    :
                    <h4>Genres not Found</h4>
                }
                {
                    myGameDetail.platforms ?
                    <div>
                        <ul>
                            Platforms: 
                                {myGameDetail.platforms.map(e => {
                                    return (
                                        <li>{e}</li>
                                    )
                                })}
                        </ul>
                    </div>
                    :
                    <h4>Platforms not Found</h4>
                }
                <p>{myGameDetail.description}</p>
                <Link to='/home'>
                    <button>Volver</button>
                </Link>
        </div>
    )
}
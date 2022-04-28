import React from "react";
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";

import style from './Detail.module.css'

import { getGameId, limpiarDetail } from "../../redux/actions";
import Loader from "../Loader/Loader";


export default function Detail (props){
    //console.log(props)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGameId(props.match.params.id))
        return ()=>{dispatch(limpiarDetail())}
    },[props.match.params.id, dispatch])

    const myGameDetail = useSelector((state) => state.gameDetail)
    //console.log(myGameDetail)

    return(
        <div>
            {
                myGameDetail.length !== 0?
                <div className={style.detail}>
                    <div className={style.card}  key={myGameDetail.id}>
                        <div>
                            <img className={style.container} src={myGameDetail.background_image} alt="img not found"/>
                        </div>
                        <div className={style.info}>
                            <h3>{myGameDetail.name}</h3>
                            <h6>Released:    {myGameDetail.released}</h6>
                            <h6>Rating:   {myGameDetail.rating}</h6>
                            {
                                myGameDetail.genres ?
                                <div>
                                    <ul>
                                        Genres: 
                                            {myGameDetail.genres.map(gen => {
                                                return (
                                                    <li key={gen.id}>{gen.name}</li>
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
                                                    <li key={e}>{e}</li>
                                                )
                                            })}
                                    </ul>
                                </div>
                                :
                                <h4>Platforms not Found</h4>
                            }
                            <p>{myGameDetail.description}</p>
                        </div>
                        <div>
                            <Link to='/home'>
                                <button className={style.btn_back}>Volver</button>
                            </Link>
                        </div>
                    </div>
                </div> : 
                <Loader/>                
            }
        </div> 
    )
}
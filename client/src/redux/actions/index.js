import axios from 'axios';
import { GET_ALL_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRES, FILTER_DB_API, ORDER_BY_AZ, ORDER_BY_RATING, GET_VIDEOGAME_NAME, GET_GAME_BY_ID } from '../Actions_Types/index'



export function getAllVideogames (){
    return async function(dispatch){
        var json = await axios.get (`http://localhost:3001/videogames`);
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: json.data
        })
    }
}

export function getGenres (){
    return async function (dispatch){
        var json = await axios.get(`http://localhost:3001/genres`);
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}

export function getGameName(name) {
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_VIDEOGAME_NAME,
                payload: json.data
            })
        }catch (error) {
            console.log(error)
        }
    } 
}

export function getGameId(id) {
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: GET_GAME_BY_ID,
                payload: json.data
            })
        }catch (error) {
            console.log(error)
        }
    }
}

export function filterByGenres (payload) {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}

export function filterByDbApi (payload) {
    return{
        type: FILTER_DB_API,
        payload
    }
}

export function orderByAZ (payload){
    return {
        type: ORDER_BY_AZ,
        payload
    }
}

export function orderByRating(payload){
    return {
        type: ORDER_BY_RATING,
        payload
    }
}



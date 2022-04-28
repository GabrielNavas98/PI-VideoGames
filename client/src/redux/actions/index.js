import axios from 'axios';
import { GET_ALL_VIDEOGAMES, GET_GENRES, GET_PLATFORMS, FILTER_BY_GENRES, FILTER_DB_API, ORDER_BY_AZ, ORDER_BY_RATING, GET_VIDEOGAME_NAME, GET_GAME_BY_ID, CREATE_GAME, CLEANDETAIL } from '../Actions_Types/index'


export function getAllVideogames (){
    return async function(dispatch){
        var json = await axios.get (`/videogames`);
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: json.data
        })
    }
}

// export const getGenres = () => {
//     return fetch('http://localhost:3000/genres')
//         .then(responsive => responsive.json())
//         .then(json => dispatch({ type: GET_GENRES, payload: json}))
// }

export function getGenres (){
    return async function (dispatch){
        var json = await axios.get(`/genres`);
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}

export function getPlatforms (){
    return async function(dispatch){
        var json = await axios.get(`/platforms`);
        return dispatch({
            type: GET_PLATFORMS,
            payload: json.data
        })
    }
}

export function getGameName(name) {
    return async function(dispatch){
        try{
            var json = await axios.get(`/videogames?name=${name}`)
            return dispatch({
                type: GET_VIDEOGAME_NAME,
                payload: json.data
            })
        }catch (error) {
            alert(`no hay juegos con ${name}`)
        }
    } 
}

export function getGameId(id) {
    return async function(dispatch){
        try{
            var json = await axios.get(`/videogames/${id}`)
            return dispatch({
                type: GET_GAME_BY_ID,
                payload: json.data
            })
        }catch (error) {
            alert(`no hay nada con ${id}`)          
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

export function createGame(payload){
    return async function(dispatch){
        //cambio url para deploy
        const json = await axios.post(`/videogame`, payload)
        //console.log(json)
        return dispatch({
            type: CREATE_GAME,
            payload: json.data
        })
    }
}

export function limpiarDetail(){
    return {
        type: CLEANDETAIL
    }
}



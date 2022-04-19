import axios from 'axios';
import { GET_ALL_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRES } from '../Actions_Types/index'



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

export function filterByGenres (payload) {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}

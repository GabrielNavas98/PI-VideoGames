import { GET_ALL_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRES, FILTER_DB_API, ORDER_BY_AZ, ORDER_BY_RATING, GET_VIDEOGAME_NAME, GET_GAME_BY_ID } from '../Actions_Types/index'

const initialState = {
    videoGames: [],
    allVideoGames: [],
    genres: [],
    gameDetail: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case GET_ALL_VIDEOGAMES:
            return{
                ...state,
                videoGames: action.payload,
                allVideoGames: action.payload //siempre tiene todos
            }
        case GET_GENRES: 
            return{
                ...state,
                genres: action.payload
            }
        case GET_VIDEOGAME_NAME:
            return{
                ...state,
                videoGames: action.payload
            }
        case GET_GAME_BY_ID:
            return{
                ...state,
                gameDetail: action.payload
            }

        case FILTER_BY_GENRES:
            const allVideoGames = state.allVideoGames;
            var genFilter = function(arr) {
                var aux = arr.filter(e => e.name === action.payload)
                if(aux.length > 0){
                    //console.log('algo')
                    return true
                }else{
                    //console.log('nada')
                    return false
                }
            }
            var filtrados = action.payload === 'all' ? allVideoGames : allVideoGames.filter(e => genFilter(e.genres)) //filtro el state que siempre tiene 
            return{
                ...state,
                videoGames: filtrados //renderizo el state pisable
            }
        case FILTER_DB_API:
            const all = state.allVideoGames;
            var filter = all
            if (action.payload === 'db'){
                filter = all.filter(e => e.inBd)
            }else if (action.payload === 'api'){
                filter = all.filter(e => !e.inBd)
            }
            return{
                ...state,
                videoGames: filter
            }


        case ORDER_BY_AZ:
            //const orderGames = state.videoGames //el que se renderiza EN EL MOMENTO
            const orderedByName = action.payload === 'asc' ?
                state.videoGames.sort(function(a, b){
                    if (a.name > b.name) return 1;
                    if(a.name < b.name ) return -1;
                    return 0;
                }) : 
                state.videoGames.sort(function(a, b){
                    if (a.name > b.name) return -1;
                    if(a.name < b.name ) return 1;
                    return 0;
                })
            return{
                ...state,
                videoGames: orderedByName
            }
        case ORDER_BY_RATING:
            // const orderGames = state.videoGames el que se renderiza EN EL MOMENTO
            const orderByRating = action.payload === 'asc' ?
                state.videoGames.sort(function(a, b){
                    if (a.rating > b.rating) return 1;
                    if(a.rating < b.rating ) return -1;
                    return 0;
                }) : 
                state.videoGames.sort(function(a, b){
                    if (a.rating > b.rating) return -1;
                    if(a.rating < b.rating ) return 1;
                    return 0;
                })
            return {
                ...state,
                videoGames: orderByRating
            }
        default:
                return state
    };
};

export default rootReducer;

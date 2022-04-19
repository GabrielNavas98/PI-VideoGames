import { GET_ALL_VIDEOGAMES, GET_GENRES, FILTER_BY_GENRES } from '../Actions_Types/index'

const initialState = {
    videoGames: [],
    allVideoGames: [],
    genres: []
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
        default:
                return state
    };
};

export default rootReducer;

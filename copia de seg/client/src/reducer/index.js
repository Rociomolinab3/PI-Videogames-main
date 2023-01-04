import {GET_VIDEOGAME} from '../actions/index';

const initialState = {
    allVideogames:[],
    videogames: [],
    genres:[],
    platforms:[],
    detail:[]
}

function rootReducer(state = initialState,action){
switch(action.type) {
    case 'GET_VIDEOGAMES':
        let platforms=[];
        action.payload.map((e)=>(platforms = [...platforms,...e.platforms]))
        return{
            ...state,
            allVideogames:action.payload,
            videogames: action.payload,
            platforms: Array.from(new Set(platforms)),
            
        };

    case 'GET_NAME_VIDEOGAMES':
        return {
            ...state,
            videogames: action.payload
        }

    case 'GET_GENRES':
        return{
            ...state,
            genres: action.payload
        }

    case 'FILTER_BY_GENRES':
        const allGenres2 = state.allVideogames;
         //const aux = [];
         //aux = for (var name in allGenres2.genres){
         //   console.log(name);
         //}}
        
        //console.log(allGenres2)
        
        const genresFiltered = action.payload === "all" ? allGenres2 
        : allGenres2.filter(el =>
        { let aux = "";
            for(let i =0; el.genres.length>i ; i++ ){
                aux += el.genres[i].name
            }
            console.log(aux);
            return aux.includes(action.payload)
        });

      return {
        ...state,
        videogames: genresFiltered,
      };

    case 'FILTER_CREATED':
        const allStateVideogames = state.allVideogames
        const createdGame = action.payload === 'createdInDb' ?
         allStateVideogames.filter( e => e.createdInDb) :
         allStateVideogames.filter( e => !e.createdInDb)
        return{
            ...state,
            //allVideogames:action.payload === "All" ? state.videogames: createdGame,
            videogames: action.payload === "All" ? state.allVideogames : createdGame
        };

    case 'ORDER_BY_RATING':    
    const array = action.payload === 'best' 
    ? state.videogames.sort((a,b) =>b.rating-a.rating)
    : state.videogames.sort((a,b) =>a.rating-b.rating);
    return{
     ...state,
     videogames: array
    };


    case 'ORDER_BY_NAME':
        const sortedArr = action.payload === 'asc' ?
        state.videogames.sort(function(a,b) {
        if(a.name > b.name) {
            return 1;
         }
        if(b.name > a.name) {
            return -1;
        } 
        return 0;
    }) :
    state.videogames.sort(function (a,b){
        if(a.name > b.name) {
            return -1;
        }
        if(b.name > a.name) {
            return 1;
        }
        return 0;
    })
     return {
        ...state,
        allVideogames:sortedArr
     }
    
    case 'POST_VIDEOGAME':
        return{
        ...state,
        }
        
    case 'GET_DETAIL':
        return{
            ...state,
            detail: action.payload
        }

     default:
            return state;
}
    
    
}
export default rootReducer;
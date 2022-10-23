import { createReducer } from "@reduxjs/toolkit"

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHero,
    heroCreated,
    heroCreatingError,
    heroCreating,

} from '../../actions/index';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroCreatingStatus: 'idle',
}

const heroes = createReducer( initialState, builder => {
    builder
        .addCase( heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';// here we can see that lib innerJs is working under the hood and do thic action with immutability(but looks like not here)
        } )
        .addCase( heroesFetched, ( state, action ) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        } )
        .addCase( heroesFetchingError, ( state, action ) => {
            state.heroesLoadingStatus = 'Error';
        } )
        .addCase( deleteHero, ( state, action ) => {
            state.heroes.splice( action.payload.id, 1 );
        } )
        .addCase( heroCreating, ( state ) => {
            state.heroCreatingStatus = 'Creating hero...';
        } )
        .addCase( heroCreated, ( state, action ) => {
            console.log(action);
            state.heroes.push( action.payload );
            state.heroCreatingStatus = 'idle';
        } )
        .addCase( heroCreatingError, ( state ) => {
            state.heroCreatingStatus = 'Error';
        } )
        .addDefaultCase( () => { } );
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'DELETE_HERO':
//             return {
//                 ...state,
//                 heroes: state.heroes.splice(action.payload.id,1),
//             }

//         case 'HEROES_CREATING':
//             return {
//                 ...state,
//                 heroCreatingStatus: 'Creating...'
//             }
//         case 'HEROES_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//                 heroCreatingStatus: 'idle',
//             }
//         case 'HEROES_CREATING_ERROR':
//             return {
//                 ...state,
//                 heroCreatingStatus: 'error'
//             }
        
//         default: return state
//     }
// }

export default heroes;
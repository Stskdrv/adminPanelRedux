import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroCreatingStatus: 'idle',
}


const heroSlice = createSlice( {
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {
            state.heroesLoadingStatus = 'loading';
        },
        heroesFetched: ( state, action ) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: ( state, action ) => {
            state.heroesLoadingStatus = 'Error';
        },
        deleteHero: ( state, action ) => {
            state.heroes.splice( action.payload.id, 1 );
        },
        heroCreating: ( state ) => {
            state.heroCreatingStatus = 'Creating hero...';
        },
        heroCreated: ( state, action ) => {
            state.heroes.push( action.payload );
            state.heroCreatingStatus = 'idle';
        },
        heroCreatingError: ( state ) => {
            state.heroCreatingStatus = 'Error';
        },
    },
} );


const { actions, reducer } = heroSlice;

export default reducer;

export const {
    heroesFetching,
    heroesFetched,
    heroCreating,
    heroCreated,
    heroCreatingError,
    heroesFetchingError,
} = actions;
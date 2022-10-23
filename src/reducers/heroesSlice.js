import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../hooks/http.hook';


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    heroCreatingStatus: 'idle',
}


export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        return useHttp().request( "http://localhost:3001/heroes" )
    }
);

const heroSlice = createSlice( {
    name: 'heroes',
    initialState,
    reducers: {
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading';
            } )
            .addCase(fetchHeroes.fulfilled, ( state, action ) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            } )
            .addCase(fetchHeroes.rejected, ( state ) => {
                state.heroCreatingStatus = 'Error';
            } )
            .addDefaultCase('', () => {})
    }
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
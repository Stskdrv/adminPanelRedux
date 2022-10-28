import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';


const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState( {
    heroesLoadingStatus: 'idle',
    heroCreatingStatus: 'idle',
});


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
           heroesAdapter.removeOne(state, action.payload)
        },
        heroCreating: ( state ) => {
            state.heroCreatingStatus = 'Creating hero...';
        },
        heroCreated: ( state, action ) => {
            heroesAdapter.addOne(state, action.payload)
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
                heroesAdapter.setAll( state, action.payload );
            } )
            .addCase(fetchHeroes.rejected, ( state ) => {
                state.heroCreatingStatus = 'Error';
            } )
            .addDefaultCase('', () => {})
    }
} );


const { actions, reducer } = heroSlice;

export default reducer;

export const { selectAll } = heroesAdapter.getSelectors( ( state ) => state.heroes );

export const {
    heroesFetching,
    heroesFetched,
    heroCreating,
    heroCreated,
    heroCreatingError,
    heroesFetchingError,
} = actions;
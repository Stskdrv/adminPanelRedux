import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import filters from '../reducers/filtersSlice';
import heroes from '../reducers/old/heroesSlice';


const stringMiddleWare = () => ( dispatch ) => ( action ) => {

    if ( typeof action === 'string' ) {
        return dispatch( { type: action } );
    }
    return dispatch( action );

};

const store = configureStore( {
    reducer: { heroes, filters, [apiSlice.reducerPath]: apiSlice.reducer },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare, apiSlice.middleware),

})


export default store;
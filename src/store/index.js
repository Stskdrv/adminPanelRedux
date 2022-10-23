import { configureStore } from '@reduxjs/toolkit';
import filters from '../reducers/filtersSlice';
import heroes from '../reducers/heroesSlice';// export default of reducer and rename on heroes

const stringMiddleWare = () => ( dispatch ) => ( action ) => {

    if ( typeof action === 'string' ) {
        return dispatch( { type: action } );
    }
    return dispatch( action );

};

// it's variant with RTK
const store = configureStore( {
    reducer: { heroes, filters },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),

})


export default store;
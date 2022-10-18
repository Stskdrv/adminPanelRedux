//import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
//import ReduxThunk from 'redux-thunk';
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

const stringMiddleWare = () => ( dispatch ) => ( action ) => {

    if ( typeof action === 'string' ) {
        return dispatch( { type: action } );
    }
    return dispatch( action );

};

// const enhancer = ( createStore ) => (...args) => {
//     const store = createStore( ...args );

//     const oldDispatch = store.dispatch;
//     store.dispatch = ( action ) => {
//         if ( typeof action === 'string' ) {
//             return oldDispatch( { type: action } );
//         }
//         return oldDispatch( action );
//     }
//     return store;
// }

// it's variant with RTK
const store = configureStore( {
    reducer: { heroes, filters },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),

})




//it's how we should do using pure redux
// const store = createStore( combineReducers( { heroes, filters } ),
//     compose(
//         applyMiddleware(ReduxThunk, stringMiddleWare ),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     )
//     // compose(
//     // enhancer,
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     // )

// );

export default store;